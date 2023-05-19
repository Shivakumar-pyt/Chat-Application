import { useState, useEffect } from "react";
import '../styles/homepageStyles.css';
import Typewriter from "typewriter-effect";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "../redux/userSlice";
import { auth, provider } from '../config';
import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";

export default function HomePage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backend_url = "http://localhost:5000/user/checkCredentials";
    const [info, setInfo] = useState({});

    const handleClick = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).then((data) => {
            dispatch(loggedIn({ email: data.user.email, name: data.user.displayName }));
            setInfo(data.user);
        })
    }

    useEffect(() => {
        if (Object.keys(info).length > 0) {
            console.log(info);
            const email = info.email;
            const name = info.displayName;
            const data = { email, name };
            fetch(backend_url,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((response) => {
                navigate("/chats");
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [info])

    return (
        <div className="main-container">
            <div className="typewriter">
                <Typewriter
                    options={{
                        strings: ['Welcome to...', 'The Chat Application'],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>

            <div>
                <Button onClick={(e) => {handleClick(e)}}>Sign in with Google</Button>
            </div>

        </div>
    )
}