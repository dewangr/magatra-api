let mysql = require('mysql');

let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'u767274743_db_magatra'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Successfully connected!');
   }
 })

module.exports = connection;