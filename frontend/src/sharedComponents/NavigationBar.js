import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavigationBar.module.css';

const NavigationBar = () => {
    return (
        <Navbar data-bs-theme="light" className={`${styles.navBar} border-bottom`} expand='md'>
            <Navbar.Brand href="/articles" className={`mx-3 ${styles.brand}`}>headbook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />

            <NavBarLeft />
            <NavBarRight />
        </Navbar>
      );
    
};

{/* Navigation Bar Left Side / Navigation Bar for small screens */}
const NavBarLeft = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? styles.activeNavLink : '';
    }

    return (
        <Navbar.Collapse id="basic-navbar-nav" className="mx-3">
            <Nav className="mr-auto align-items-left">
                <Nav.Link href="/home" className={`d-flex align-items-center ${styles.navLink} ${isActive('/home')}`}>
                    Home
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    )
}

{/* Navigation Bar Right Side */}
const NavBarRight = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'd-none' : '';
    }

    return (
        <Nav className="d-none d-lg-flex ml-auto mx-3">
            <Nav.Link href="/login" className={`d-flex justify-content-center ${styles.loginButton} ${isActive('/login')} me-3`}>
                Login
            </Nav.Link>
        </Nav>
    )
}


export default NavigationBar;
