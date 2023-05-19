import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";
import SideBar from "./sidebar";
import ChatWindow from "./chatWindow";
import "../styles/chatStyles.css";
import ChatBar from "./chatBar";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import socket from "../socket";
import { currentMessage } from "../redux/messageSlice";

export default function Chats(props) {
    const email = useSelector((state) => state.user.email);
    const name = useSelector((state) => state.user.name);
    const [click, setClick] = useState(false);
    const backend_url = "http://localhost:5000/chat/addMessage";
    const backend_url2 = "http://localhost:5000/chat/getMessages";
    const dispatch = useDispatch();
    const [messages,setMessages] = useState([]);
    // const sender = useSelector((state) => state.chat.sender);
    // const receiver = useSelector((state) => state.chat.receiver);

    // useEffect(() => {
    //     const temp = {sender,receiver};
    //     fetch(backend_url2, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(temp)
    //     }).then((res) => {
    //         return res.json();
    //     }).then((response) => {
    //         console.log(response.messages);
    //         setMessages(response.messages);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // },[])

    socket.emit('join', email);

    socket.on('incoming_messages', (data) => {

        const today = new Date();
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        data.date = date;
        dispatch(currentMessage({message: data.message, sender: data.sender, receiver: data.receiver,time: date}))

        fetch(backend_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((response) => {
            console.log(response.messages);
            setMessages(response.messages);
        }).catch((err) => {
            console.log(err);
        })
    })


    return (
        <div className="container">
            <SideBar email={email} click={click} setClick={setClick} socket={socket} messages={messages} setMessages={setMessages}/>
            <div className="chat-container">
                <ChatWindow click={click} setClick={setClick} name={name} socket={socket} messages={messages}/>
                <ChatBar click={click} socket={socket} />
            </div>
        </div>
    )
}