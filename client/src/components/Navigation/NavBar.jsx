import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';



function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </>
    );
}

export default Navbar;

    // <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    //     <Container>
    //         <Navbar.Brand href="/">Cheetah</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //             <Nav className="me-auto">
    //                 <Nav.Link href="/login">{user ? 'profile' : 'Login'}</Nav.Link>
    //                 {user && <>
    //                     <Nav.Link href="conversations">converstions</Nav.Link>
    //                     <NavDropdown title="Contacts" id="collasible-nav-dropdown">
    //                         <NavDropdown.Item href="/newcontact">add contact</NavDropdown.Item>
    //                         <NavDropdown.Item href="/contacts">contacts</NavDropdown.Item>
    //                         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                     </NavDropdown>
    //                 </>
    //                 }
    //             </Nav>
    //             <Nav>
    //                 <Nav.Link href="/chatroom">chat</Nav.Link>
    //             </Nav>
    //             {user && <Nav>
    //                 <Nav.Link href="#deets">log out</Nav.Link>
    //             </Nav>}
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>
