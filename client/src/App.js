import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from  'react';
import NavigationBar from './components/Navbar';
import Patent from './components/Patents';
import Classification from "./components/Classification";
import Login from "./components/Login";
import Inventors from "./components/Inventors";
import Signin from "./components/Signin";
import PatentById from "./components/PatentById";
import Session from "./components/Session";
import Uploadpatent from "./components/Uploadpatent";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <NavigationBar user={user} setUser={setUser} />
      
      <main>
        <Routes>
          <Route path = '/' element = {<Patent />} />
          <Route path="/" element={<Session />} />
          <Route path = '/patents-list' element = {<Patent />} />
          <Route path = '/in-patents/:id'element = {<PatentById />} />
          <Route path = '/patent-classifications' element = {<Classification />} />
          <Route path = '/patent-classifications/:id' element = {<Classification />} />
          <Route path = '/users-auth' element = {<Login setUser={setUser}/>} />
          <Route path = '/login-auth' element = {<Signin setUser={setUser}/>} />
          <Route path = '/users-auth/:id' element = {<Login />} />
          <Route path = '/uploadpatents-post' element = {<Uploadpatent />} />
          <Route path = '/inventors-list' element = {<Inventors />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
