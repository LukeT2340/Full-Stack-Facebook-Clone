import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './NavigationBar.module.css'
import { useLogout } from "../../hooks/useLogout.js"
import { FaComment, FaBell, FaSearch, FaCog, FaChevronRight, FaQuestionCircle, FaMoon, FaSignOutAlt, FaCommentSlash } from 'react-icons/fa';
import NavBarLeft from './NavBarLeft.js'
import NavBarRight from './NavBarRight.js'

// Navigation Bar
const NavigationBar = ({profile}) => {
    return (
        <Navbar data-bs-theme="light" className={`${styles.navBar}`} expand='md'>
            <Link to="/home" className='text-decoration-none'>
                <Navbar.Brand className={`mx-3 ${styles.brand}`}>headbook</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />

            <div className={styles.navBarContents}>
                <NavBarLeft profile={profile}/>
                <NavBarRight profile={profile}/>
            </div>
        </Navbar>
      );
    
};

export default NavigationBar;
