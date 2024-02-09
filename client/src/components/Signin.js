import React from 'react';

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
            <form onSubmit={handleSubmit} id='login-form'>
                <h4>Login with email and password</h4>
                <input className='login-fields'
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">email </label><br />
                <input className='login-fields'
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">password </label><br />
                <button type='submit' id='login-btn'>Log in</button>
                <hr />
                {loginMessage && <p>{loginMessage}</p>} 
            </form>
        </>
    );
}

export default Signin;
