import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="#home">SpiceBlue CRUD</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav>
                <Nav.Link href="#deets">Stay at home</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Stay safe
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;