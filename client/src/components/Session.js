import { useState, useEffect } from "react";

function Session() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch("https://technology-patent-app.onrender.com/check_session").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);
  
    if (user) {
      return <h2>Welcome, {user.name}!</h2>;
    } 
  }

  export default Session;