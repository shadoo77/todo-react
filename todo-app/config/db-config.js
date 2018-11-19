"use strict";

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shadi',
    password: '',
    database: 'reactdb',
    port: 3306
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
