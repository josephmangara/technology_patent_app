import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }){

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

    return(
        <div id='navbar'>
          <h1 className='heading'>Tech Patent Searching App</h1>
          <div>
            <Link to="/users">Log in</Link> | <Link to="/patents">patents</Link> | <Link to="/classifications">Classifications</Link> | <Link to="/inventors">Group inventors</Link> 
            {user && (
            <button onClick={handleLogoutClick}>Logout</button>
          )}
          </div>
        </div>  
    )
}