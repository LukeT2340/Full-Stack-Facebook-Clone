import { FaUserFriends, FaClock, FaBookmark, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import styles from "./Home.module.css"


// Left column of the home page
const Left = ({profile}) => {
    return (
        <div className={`col-xl-2 col-lg-3 d-none d-lg-block mt-3 me-3`}>
            <div className={styles.leftContainer} >
                <Nav.Link as={Link} to={`/profile/${profile._id}`} className={`${styles.profileContainer} m-0 p-2`}>
                    <img src={profile.profilePictureUrl} className={styles.optionImage} alt="profile picture"></img>
                    <p>{profile.firstName} {profile.lastName}</p>
                </Nav.Link>
                <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                    <FaUserFriends className={styles.optionImage} color={'var(--accent-color)'}/>
                    <p>Friends</p>
                </Nav.Link>
                <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                    <FaClock className={styles.optionImage} color={'var(--accent-color)'}/>
                    <p>Memories</p>
                </Nav.Link>
                <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                    <FaBookmark className={styles.optionImage} color={'purple'}/>
                    <p>Saved</p>
                </Nav.Link>            
                <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                    <FaCalendar className={styles.optionImage} color={'red'}/>
                    <p>Events</p>
                </Nav.Link>
            </div>
        </div>
    )
}

export default Left