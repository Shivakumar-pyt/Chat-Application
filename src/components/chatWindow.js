import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/chatWindowStyles.css';

export default function ChatWindow({ click, setClick, name, socket, messages }) {
    const sender = useSelector((state) => state.chat.sender);
    const receiver = useSelector((state) => state.chat.receiver);

    const current_message = useSelector((state) => state.message.message);
    const current_time = useSelector((state) => state.message.current_time);
    const current_sender = useSelector((state) => state.message.sender);
    const current_receiver = useSelector((state) => state.message.receiver);


    return (
        <div>
            {click &&
                <div className="chat-window">
                    {name}<br></br>
                    {receiver}

                    <br></br><br></br>
                    <div>

                        {messages.map((msg) => (
                            <div>
                                {msg.message_sender === sender ?
                                    <div>
                                        <div>You:</div>
                                        <div>{msg.message_body}</div>
                                    </div> :
                                    <div>
                                        <div>
                                            Message From: {msg.message_sender}
                                        </div>
                                        <div>
                                            {msg.message_body}
                                        </div>
                                    </div>
                                }
                                <br></br>
                            </div>
                        ))}
                    </div>


                    {/* <div>
                    Message from: {current_sender} <br></br>
                    {current_message}<br></br>
                </div> */}

                </div>}
        </div>
    )
}