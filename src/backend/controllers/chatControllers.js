const connection = require('../connect');

const getChats = ((req, res) => {
    let sql_query = `SELECT * FROM userChats WHERE sender = '${req.body.email}'`;
    connection.query(sql_query, (err, rows) => {
        if (err) throw err;
        return res.json({ 'chats': JSON.parse(JSON.stringify(rows)) });
    })
})

const getEmails = ((req, res) => {
    const { email } = req.body;
    let sql_query = `SELECT * FROM users WHERE (SELECT LOCATE ( '${email}', email ) != 0)`;
    connection.query(sql_query, (err, rows) => {
        if (err) throw err;
        return res.json({ 'rows': JSON.parse(JSON.stringify(rows)) });
    })
});

const addChat = ((req, res) => {
    const { current_email, eml } = req.body;
    let sql_query = `SELECT chats FROM userChats WHERE sender = '${current_email}'`;
    connection.query(sql_query, (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
            let insert_query = `INSERT INTO userChats VALUES ('${current_email}','["${eml}"]')`;
            connection.query(insert_query, (err, response) => {
                if (err) throw err;
                console.log('Chat Added...');
            })
        }
        else {
            var chat_array = JSON.parse((JSON.parse(JSON.stringify(rows))[0].chats));
            chat_array = chat_array[0].split(",");
            console.log(chat_array);
            if (current_email != eml && !chat_array.includes(eml)) {
                chat_array.push(eml);
                let update_query = `UPDATE userChats SET chats = '["${chat_array}"]' WHERE sender = "${current_email}"`;
                connection.query(update_query, (err, response) => {
                    if (err) throw err;
                    return res.json({ 'chats': chat_array });
                })
            }
            else {
                return res.json({ 'chats': chat_array });
            }
        }
    })
})

const addMessage = ((req, res) => {
    const { message, sender, receiver, date } = req.body;
    const message_id = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    console.log(date);
    // let select_query = `SELECT * FROM message WHERE message_sender = "${sender}" AND message_receiver = "${receiver}" AND message_body = "${message}"`;
    let select_query = `SELECT * FROM message WHERE message_sender = "${sender}" AND message_receiver = "${receiver}" AND message_body = "${message}" AND createdAt = "${date}"`;
    connection.query(select_query, (err, rows) => {
        if (err) throw err;
        console.log(rows.length);
        if (rows.length === 0) {
            let sql_query = `INSERT INTO message VALUES (${message_id}, "${sender}","${receiver}","${message}","${date}")`;
            connection.query(sql_query, (err, response) => {
                if (err) throw err;
            })

            let remove_duplicate_query = "DELETE m1 FROM message m1 INNER JOIN message m2 WHERE m1.message_id < m2.message_id AND m1.message_sender = m2.message_sender AND m1.message_receiver = m2.message_receiver AND m1.message_body = m2.message_body AND m1.createdAt = m2.createdAt";
            connection.query(remove_duplicate_query, (err, response) => {
                if (err) throw err;
                let get_query = `SELECT * FROM message WHERE (message_sender = "${sender}" AND message_receiver = "${receiver}") OR (message_sender = "${receiver}" AND message_receiver = "${sender}")`;
                connection.query(get_query,(err,data) => {
                    if(err) throw err;
                    return res.json({'messages':JSON.parse(JSON.stringify(data))});
                })
            })
        }
    })
})

const getMessages = ((req, res) => {
    const { sender, receiver } = req.body;
    console.log('sender: ',sender);
    console.log('receiver: ',receiver);
    let get_query = `SELECT * FROM message WHERE (message_sender = "${sender}" AND message_receiver = "${receiver}") OR (message_sender = "${receiver}" AND message_receiver = "${sender}")`;
    connection.query(get_query,(err,response) => {
        if(err) throw err;
        return res.json({'messages':JSON.parse(JSON.stringify(response))});
    })
})

module.exports = { getChats, getEmails, addChat, addMessage, getMessages };