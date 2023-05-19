import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebarStyles.css";
import { chatSelected } from "../redux/chatSlice";

export default function SideBar({ email , click, setClick, socket, messages, setMessages }) {
    const backend_url = "http://localhost:5000/chat/getChats";
    const current_email = useSelector((state) => state.user.email);
    const dispatch = useDispatch();
    const [chats,setChats] = useState([]);
    const navigate = useNavigate();
    const backend_url2 = "http://localhost:5000/chat/getMessages";
    useEffect(() => {
        fetch(backend_url,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setChats(JSON.parse(data.chats[0].chats)[0].split(","));
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const handleAddChat = (e) => {
        navigate("/addChat");
    }

    const handleChatClick = (e,chat) => {
        e.preventDefault();
        console.log(current_email,chat);
        dispatch(chatSelected({sender: current_email, receiver: chat}));
        const sender = current_email;
        const receiver = chat;
        const temp = {sender,receiver};
        fetch(backend_url2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp)
        }).then((res) => {
            return res.json();
        }).then((response) => {
            setMessages(response.messages);
        }).catch((err) => {
            console.log(err);
        })
        setClick(true);
    }

    return (
        <div className="sidebar">
            <div className="sidebar-chats">
                {chats.map((chat) => (
                    <div className="chat" onClick={(e) => handleChatClick(e,chat)}>{chat}</div>
                ))}
                <Button onClick={(e) => handleAddChat(e)}>Add a Chat</Button>
            </div>
        </div>
    )
}