import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Patent from './components/Patents';
import Classification from "./components/Classification";
import Login from "./components/Login";
import Inventors from "./components/Inventors";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
        <Route exact path="/patents">
            <Patent />
          </Route>
          <Route exact path="/patents/<int:id>">
            <Patent />
          </Route>
          <Route exact path="/classifications">
            <Classification />
          </Route>
          <Route exact path="/classifications/<int:id>">
            <Classification />
          </Route>
          <Route exact path="/users">
            <Login />
          </Route>
          <Route exact path="/users/<int:id>">
            <Login />
          </Route>
          <Route exact path="/inventors">
            <Inventors />
          </Route>
          <Route exact path="/"><Home /></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
