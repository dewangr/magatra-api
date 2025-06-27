const express = require('express')
const app = express()
const port = 3000

const API_URL = 'api.magatra.top'
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const rsvpRouter = require('./routes/rsvp')
app.use('/api/rsvp', rsvpRouter);

app.listen(port, () => {
  console.log(`app running at ${API_URL}`)
})