const express = require('express');
const env = require('dotenv');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'config.env'});
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');
const Server = require('socket.io').Server;

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',userRouter);
app.use('/chat',chatRouter);

const io = new Server(4000,{
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected...`)
    socket.on('join', (email) => {
        socket.join(email);
    })
    socket.on('message',(data) => {
        const { text, send, recv } = data;
        io.sockets.in(recv).emit('incoming_messages',{message: text,sender: send,receiver: recv});
    })
})


app.listen(process.env.PORT,function(err){
    if(err) console.log(err);
    console.log("server listening on port",process.env.PORT);
})


