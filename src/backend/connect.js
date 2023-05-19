const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '35.222.117.207',
    user: 'root',
    password: '12345',
    database: 'task_schema'
});

module.exports = connection;