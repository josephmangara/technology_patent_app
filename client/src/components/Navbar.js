import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }){

  function handleLogoutClick() {
    fetch("/logout", { 
      method: "DELETE",
     }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

    return(
        <div id='navbar'>
          <h1 className='heading'>Technology Patent Searching App</h1>
          <div>
            <Link to="/users">Log in</Link> | <Link to="/patents">patents</Link> | <Link to="/classifications">Classifications</Link> | <Link to="/inventors">Group inventors</Link> | <Link to="/uploadpatents">Upload patent</Link><br /><br /> 
            {user && (
            <button onClick={handleLogoutClick} id='logout-button'>Logout</button>
          )}
          </div>
        </div>  
    )
}