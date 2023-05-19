import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddChat(props) {    
    const [filtered_emails,setFilteredEmails] = useState([]);
    const [email,setEmail] = useState("?");
    const backend_url = "http://localhost:5000/chat/getEmails";
    const backend_url2 = "http://localhost:5000/chat/addChat";
    const current_email = useSelector((state) => state.user.email);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(backend_url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email})
        }).then((res) => {
            return res.json();
        }).then((emails) => {
            // console.log(emails);
            setFilteredEmails(emails.rows);
        }).catch((err) => {
            console.log(err);
        })
    },[email])

    const handleInitiate = (e,eml) => {
        e.preventDefault();
        fetch(backend_url2,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({current_email,eml})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            navigate("/chats");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Search email:</Form.Label>
                <Form.Control placeholder="search for an email address to begin chatting" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <div>
                {filtered_emails.map((em) => (
                    <div>{em.email}
                        <Button onClick={(e) => handleInitiate(e,em.email)}>Initiate Chat</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}