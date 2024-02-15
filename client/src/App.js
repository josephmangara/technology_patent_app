import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from  'react';
import Navbar from './components/Navbar';
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
      <Navbar user={user} setUser={setUser} />
      <hr />
      <main>
        <Routes>
          <Route path = '/' element = {<Patent />} />
          <Route path="/" element={<Session />} />
          <Route path = '/patents' element = {<Patent />} />
          <Route path = '/patents/:id'element = {<PatentById />} />
          <Route path = '/classifications' element = {<Classification />} />
          <Route path = '/classifications/:id' element = {<Classification />} />
          <Route path = '/users' element = {<Login setUser={setUser}/>} />
          <Route path = '/login' element = {<Signin setUser={setUser}/>} />
          <Route path = '/users/:id' element = {<Login />} />
          <Route path = '/uploadpatents' element = {<Uploadpatent />} />
          <Route path = '/inventors' element = {<Inventors />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
