import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './NavigationBar.module.css'
import { useLogout } from "../../hooks/useLogout.js"
import { FaSearch, FaCog, FaChevronRight, FaQuestionCircle, FaMoon, FaSignOutAlt, FaCommentSlash } from 'react-icons/fa';
import Search from './Search.js'

{/* Navigation Bar Left Side */}
const NavBarLeft = ({profile}) => {
    const [searchText, setSearchText] = useState("")
    const { logout } = useLogout()

    // Handle search text change
    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Navbar.Collapse id="basic-navbar-nav" className="mx-3">
            <Nav>
                <div className={`d-none d-md-flex ${styles.searchBarContainer}`}>
                    <FaSearch className={`${styles.searchIcon}`} />
                    <input 
                        type='text' 
                        placeholder='Search Headbook' 
                        className={`${styles.searchBar}`} 
                        value={searchText} 
                        onChange={handleSearchTextChange}
                    /> 
                </div>

                {/* Smaller screens nav links */}
                <div className={`${styles.profileOptionsContainer} d-md-none d-md-flex`}>
                    <Nav.Link href={`/profile/${profile._id}`} className={`${styles.profileContainer} d-md-none d-sm-block`}>
                        <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                        <p>{profile.firstName} {profile.lastName}</p>
                    </Nav.Link>
                    <Nav.Link className={`${styles.optionContainer}`}>
                        <div className={styles.optionLeftPart}>
                            <div className={styles.icon}>
                                <FaCog />
                            </div>
                            <p>Settings & privacy</p>
                        </div>
                        <FaChevronRight />
                    </Nav.Link>
                    <Nav.Link className={`${styles.optionContainer}`}>
                        <div className={styles.optionLeftPart}>
                            <div className={styles.icon}>
                                <FaQuestionCircle />
                            </div>
                            <p>Help & support</p>
                        </div>
                        <FaChevronRight />
                    </Nav.Link>
                    <Nav.Link className={`${styles.optionContainer}`}>
                        <div className={styles.optionLeftPart}>
                            <div className={styles.icon}>
                                <FaMoon />
                            </div>
                            <p>Display & accessibility</p>
                        </div>
                        <FaChevronRight />
                    </Nav.Link>
                    <Nav.Link className={`${styles.optionContainer}`}>
                        <div className={styles.optionLeftPart}>
                            <div className={styles.icon}>
                                <FaCommentSlash />
                            </div>
                            <p>Give feedback</p>
                        </div>
                    </Nav.Link>
                    <Nav.Link className={`${styles.optionContainer}`} onClick={logout}>
                        <div className={styles.optionLeftPart}>
                            <div className={styles.icon}>
                                <FaSignOutAlt />
                            </div>
                            <p>Logout</p>
                        </div>
                    </Nav.Link>
                </div>
            </Nav>
            <Search text={searchText} />
        </Navbar.Collapse>
    )
}

export default NavBarLeft