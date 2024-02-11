import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from  'react';
import Navbar from './components/Navbar';
import Patent from './components/Patents';
import Classification from "./components/Classification";
import Login from "./components/Login";
import Inventors from "./components/Inventors";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import PatentById from "./components/PatentById";

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
          <Route path = '/patents' element = {<Patent />} />
          <Route path = '/patents/<int:id>' element = {<PatentById />} />
          <Route path = '/classifications' element = {<Classification />} />
          <Route path = '/classifications/<int:id>' element = {<Classification />} />
          <Route path = '/users' element = {<Login />} />
          <Route path = '/login' element = {<Signin />} />
          <Route path = '/users/<int:id>' element = {<Login />} />
          <Route path = '/inventors' element = {<Inventors />} />
        </Routes>
      </main>
      <hr />
      <Footer />
    </div>
  );
}

export default App;
