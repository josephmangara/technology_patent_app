import React, { useState } from  'react';
import { Link } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [formErrors, setFormErrors] = useState([]);
    const [name, setName] = useState("")
    const [affiliation, setAffiliation] = useState("");
    const [accountMessage, setAccountMessage] = React.useState("");

    function handleName(event) {
        setName(event.target.value)
    }

    function handleAffiliation(event) {
        setAffiliation(event.target.value)
    }
        
    function handleEmail(event) {
        setEmail(event.target.value);
    }
  
    function handlePassword(event) {
        setPassword(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      const formData = { email: email, password: password, affiliation:affiliation, name:name };
      fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(formData),
    }).then((r) => {
        if (r.ok) {
            r.json().then((new_user)=>{
                setEmail(new_user.email); 
                setAccountMessage(`Successfully created an account.`);
            });
        } else{
            r.json().then((err) => setFormErrors(err.errors));
        }
    })
    }

    return (
      <div className='login-box' 
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1609579426324-74a8a0206ce1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
      }}>
         <Link to="/login">Click Here to Login</Link><hr />

        <form id='login-form' onSubmit={handleSubmit}>
        <label>Name</label>
            <input type="text" onChange={handleName} value={name} placeholder='name' className='input' /><br />
            <label>Affiliation</label>
                <select onChange={handleAffiliation} value={affiliation} placeholder='affiliation' className='input' >
                    <option value="university">university</option>
                    <option value="organisation">organisation</option>
                    <option value="individual">individual</option>
                </select>
            <label>Email</label>
            <input type="text" onChange={handleEmail} value={email} placeholder='email' className='input' /><br />
            <label>Password</label>
            <input type="text" onChange={handlePassword} value={password} placeholder='password' className='input'/><br />
            <button type="submit" className='input'>Create Account</button>
            {accountMessage && <p>{accountMessage}</p>} 
            {formErrors && <p>{formErrors}</p>}
        </form> 
      </div>
    );
}