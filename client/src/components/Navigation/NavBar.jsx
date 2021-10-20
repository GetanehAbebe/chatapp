import React from 'react'

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
const {  useSelector } = require('react-redux')
const NavBar = props => {
    const { user } = useSelector(state => state.user)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Cheetah</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/login">{user ? 'profile' : 'Login'}</Nav.Link>
                        {user && <>
                            <Nav.Link href="conversations">converstions</Nav.Link>
                            <NavDropdown title="Contacts" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">add contact</NavDropdown.Item>
                                <NavDropdown.Item href="/contacts">contacts</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>
                        </>
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link href="/chatroom">chat</Nav.Link>
                    </Nav>
                    {user && <Nav>
                        <Nav.Link href="#deets">log out</Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavBar
