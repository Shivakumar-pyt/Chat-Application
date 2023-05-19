// const mysql = require('mysql');
const connection = require('../connect');

// const connection = mysql.createConnection({
//     host: '35.222.117.207',
//     user: 'root',
//     password: '12345',
//     database: 'task_schema'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database...');
// })

const checkCredentials = ((req, res) => {
    const { email, name } = req.body;
    var flag = false;
    var exists = false;
    let sql_query = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(sql_query, (err, rows) => {
        if (err) throw err;

        if (rows.length === 0) {
            let insert_query = `INSERT INTO users VALUES ('${email}','${name}')`;
            connection.query(insert_query, (er, res) => {
                if (er) throw er;
                console.log('1 record inserted...')
            });
        }

    });

    return res.json({'message':'successfully signed in...'});

});

module.exports = { checkCredentials }