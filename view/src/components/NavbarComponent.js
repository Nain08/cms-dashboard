import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchResults from './SearchResults';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavbarComponent() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isActive = (path) => location.pathname === path;
  const { user, logoutUser} = useUser();
  
  const authToken = localStorage.getItem('authToken');
  const isLoggedIn = authToken !== null;
  const userName=localStorage.getItem('userName');
  const loggedIn=localStorage.getItem('loggedIn');
  console.log('isLoggedIn',isLoggedIn);
  const handleSearch=() => {
   
    setShowSearchResults(true);
  };
  const handleCloseSearchResults = () => {
    setSearchQuery();
    setShowSearchResults(false);
  };
 
  
  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('loggedIn');
    logoutUser();
    window.location.href = '/login';
  };
  return (
    <>
    
    <Navbar style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff', padding: '10px', zIndex: 100 }} expand="lg" className={`navBg ${isActive('/dashboard') ? 'active' : ''}`}>
      <Container fluid>
        <Navbar.Brand style={{ color: 'white' }} href="/">
          DCX CMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/pages" className={isActive('/pages') ? 'active' : ''}>
              Pages
            </Nav.Link>
            <Nav.Link href="/categories" className={isActive('/categories') ? 'active' : ''}>
              Categories
            </Nav.Link>
            <Nav.Link href="/users" className={isActive('/users') ? 'active' : ''}>
              Users
            </Nav.Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}

              />
              <Button variant="light" onClick={handleSearch}>Submit</Button>
            </Form>
          </Nav>
          <Nav>
            
            {isLoggedIn ? (
                  <>
                  <NavDropdown title="My Account" id="collapsible-nav-dropdown">
                      <NavDropdown.Item >{userName}</NavDropdown.Item>
                    </NavDropdown>
                 
                    <Button variant="light" className='nav-btn-close' onClick={handleLogout}>Logout</Button>
                    
                  </>
                  
                  ) : (
                  <>
                    <Link to="/login">
                      <Button variant="light" className='nav-btn'>Login</Button>
                    </Link>
                    
                  </>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showSearchResults && <SearchResults searchQuery={searchQuery} onClose={handleCloseSearchResults}/>}
    </>
  );
}

export default NavbarComponent;
