import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';

export default function NavigationBar({ user, setUser }){

  function handleLogoutClick() {
    fetch("/logout", { 
      method: "DELETE",
     }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

    // return(
    //     <div id='navbar'>
    //       <h1 className='heading'>Technology Patent Searching App</h1>
    //       <div id='navigation-links'>
    //         <div>
    //           <Link to="/users" className='links'>Log in</Link> 
    //           <Link to="/patents" className='links'>patents</Link>  
    //           <Link to="/classifications" className='links'>Classifications</Link> 
    //           <Link to="/inventors" className='links'>Group inventors</Link> 
    //           <Link to="/uploadpatents"className='links'>Upload patent</Link><br /> 
    //         </div>
    //         {user && (
    //         <button onClick={handleLogoutClick} id='logout-button'>Logout</button>
    //       )}
    //       </div>
    //     </div>  
    // )
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id='navbar' className=''>
        <Navbar.Brand href="#home">
          <img 
            src="https://images.unsplash.com/photo-1662481280441-d02db27f5a6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NzJ8fHxlbnwwfHx8fHw%3D" 
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          {' '}
          Technology Patents 
          <small className="text-muted small-text">Tech enthusiast.</small>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" classname='navigation-links'>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/patents" className="links">Patents</Nav.Link>
            <Nav.Link as={Link} to="/classifications" className="links">Classifications</Nav.Link>
            <Nav.Link as={Link} to="/inventors" className="links">Group inventors</Nav.Link>
            <Nav.Link as={Link} to="/uploadpatents" className="links">Upload patent</Nav.Link>
            <Nav.Link as={Link} to="/users" className="links">Log in</Nav.Link>
          </Nav>
          {user && (
            <Nav>
              <Nav.Link onClick={handleLogoutClick} id='logout-button'>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
}