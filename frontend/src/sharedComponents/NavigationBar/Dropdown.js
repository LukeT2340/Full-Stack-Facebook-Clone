import React from 'react'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './NavigationBar.module.css'
import { useLogout } from "../../hooks/useLogout.js"
import { FaCog, FaChevronRight, FaQuestionCircle, FaMoon, FaSignOutAlt, FaCommentSlash } from 'react-icons/fa';

{/* Profile Options */}
const Dropdown = ({profile}) => {
    const { logout } = useLogout()

    return (
        <div className={`${styles.profileOptionsContainer} d-flex flex-column`}>
            <Nav.Link href={`/profile/${profile._id}`} className={`${styles.profileContainer}`}>
                <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                <p>{profile.firstName} {profile.lastName}</p>
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaCog />
                    </div>
                    <p>Settings & privacy</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaQuestionCircle />
                    </div>
                    <p>Help & support</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaMoon />
                    </div>
                    <p>Display & accessibility</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaCommentSlash />
                    </div>
                    <p>Give feedback</p>
                </div>
            </Nav.Link>
            <Nav.Link className={styles.optionContainer} onClick={logout}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaSignOutAlt />
                    </div>
                    <p>Logout</p>
                </div>
            </Nav.Link>
        </div>
    )
}

export default Dropdown