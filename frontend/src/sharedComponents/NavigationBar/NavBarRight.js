import React from 'react'
import { Nav } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './NavigationBar.module.css'
import { FaComment, FaBell } from 'react-icons/fa';
import Dropdown from './Dropdown.js'

{/* Navigation Bar Right Side */}
const NavBarRight = ({profile}) => {
    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const profileOptionsRef = useRef(null);

    // Listen to mouse events. Close options menu on click
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (profileOptionsRef.current && !profileOptionsRef.current.contains(event.target)) {
            setShowProfileOptions(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    // Handle Profile Button Clicked (show options)
    const handleProfileButtonClicked = () => {
        setShowProfileOptions(prev => !prev); 
      }

    return (
        <Nav className="d-none d-md-flex mx-3">
            <div className={styles.buttonContainer}>
                <FaComment className={styles.button}/>
            </div>
            <div className={styles.buttonContainer}>
                <FaBell className={styles.button}/>
            </div>

            <div ref={profileOptionsRef}> 
                <button className={styles.profilePictureContainer} onClick={handleProfileButtonClicked}>
                    <img className={styles.profilePicture} src={profile.profilePictureUrl} alt="Profile picture"></img>
                </button>

                {showProfileOptions && (
                    <Dropdown profile={profile} />
                )}
            </div>
            
        </Nav>
    );
}

export default NavBarRight