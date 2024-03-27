import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signin({setUser}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginMessage, setLoginMessage] = React.useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setLoginMessage(`Welcome, ${data.user}!`);
                    setUser(data.user);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                });
            } else {
                setLoginMessage("Invalid email or password");
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} id='login-form' style={{marginTop: "30px"}}>
                <h4>Login with email and password</h4>
                <label htmlFor="email">email </label>
                <input className='login-fields'
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <label htmlFor="password">password </label>
                <input className='login-fields'
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' id='login-btn'>Log in</button>
                {loginMessage && <p>{loginMessage}</p>} 
            </form>
        </>
    );
}

export default Signin;
