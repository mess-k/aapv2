const mysql = require('mysql');


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'aap2'
});

module.exports = db;