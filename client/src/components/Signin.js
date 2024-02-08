
import React, { useState } from  'react';


function Signin(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")

    function handleLogin(email) {
        setEmail(email);
      }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => handleLogin(user));
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
            /><label htmlFor="email">email </label><br />
            <input
                type="text"
                id="username"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><label htmlFor="password">password </label><br />
            <button type='login'>Log in</button><hr />
        </form>
    </>
)
}

export default Signin;