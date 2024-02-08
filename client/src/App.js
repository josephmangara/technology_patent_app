import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Patent from './components/Patents';
import Classification from "./components/Classification";
import Login from "./components/Login";
import Inventors from "./components/Inventors";
import Home from "./components/Home";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path = '/' element = {<Patent />} />
          <Route path = '/patents' element = {<Patent />} />
          <Route path = '/patents/<int:id>' element = {<Patent />} />
          <Route path = '/classifications' element = {<Classification />} />
          <Route path = '/classifications/<int:id>' element = {<Classification />} />
          <Route path = '/users' element = {<Login />} />
          <Route path = '/users/<int:id>' element = {<Login />} />
          <Route path = '/inventors' element = {<Inventors />} />
          <Route path = '/' element = {<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
