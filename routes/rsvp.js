const express = require('express');
const router = express.Router();

const {body, validationResult} = require('express-validator');

const connection = require('../config/database.js');

router.get('/', function(req, res){
    connection.query('SELECT * FROM `rsvp` ORDER BY rsvp_id desc', function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Error fetching RSVPs',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'RSVPs fetched successfully',
                data: rows
            });
        }
    });
})

router.post('/store', [
    body('nama_tamu').notEmpty().withMessage('Nama tamu is required'),
    body('ucapan').notEmpty().withMessage('Ucapan is required'),
], (req, res) => {
    const errors = validationResult(req);

if(!errors.isEmpty()){
    return res.status(422).json({
        errors: errors.array(),
    });
}

let formData = {
    nama_tamu: req.body.nama_tamu,
    ucapan: req.body.ucapan
};

connection.query('INSERT INTO `rsvp` SET ?', formData, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Error saving RSVP',
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'RSVP saved successfully',
                data: rows[0]
            });
        }
    })
});

router.get('/:id', function(req, res) {
    let rsvpId = req.params.id;

    connection.query(`SELECT * FROM rsvp WHERE rsvp_id = ?`, [rsvpId], function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } 
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'RSVP not found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Detail RSVP fetched',
                data: rows[0]
            });
        }
    });
});

module.exports = router;