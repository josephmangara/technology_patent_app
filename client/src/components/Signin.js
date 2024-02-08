import React, { useState } from 'react';

function Signin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginMessage, setLoginMessage] = React.useState("");

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
                });
            } else {
                setLoginMessage("Invalid email or password");
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h5>Login with email and password</h5>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">email </label><br />
                <input
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">password </label><br />
                <button type='submit'>Log in</button>
                <hr />
            </form>
            {loginMessage && <p>{loginMessage}</p>} 
        </>
    );
}

export default Signin;
