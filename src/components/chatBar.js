import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chatbarStyles.css";

export default function ChatBar({ click, socket }) {
    const [message, setMessage] = useState("");
    const sender = useSelector((state) => state.chat.sender);
    const receiver = useSelector((state) => state.chat.receiver);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message',{
            text: message,
            send: sender,
            recv: receiver,
        });
        setMessage("");
    }

    return (
        <div>
            {click &&
                <Form.Group className="form-group">
                    <Form.Control onChange={(e) => { setMessage(e.target.value) }} placeholder="Enter a message" />
                    <Button onClick={(e) => sendMessage(e)}>Send</Button>
                </Form.Group>}
        </div>
    )
}