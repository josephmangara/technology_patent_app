
import { Link } from 'react-router-dom';

export default function Navbar(){

    return(
        <div id='navbar'>
        <h1 className='heading'>Tech Patent Searching App</h1>
        <Link to="/home">Home</Link> | <Link to="/users">Login</Link> | <Link to="/patents">patents</Link> | <Link to="/classifications">Classifications</Link> | <Link to="/inventors">Group inventors</Link> 
        </div>  
    )
}