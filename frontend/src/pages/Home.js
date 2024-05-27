import styles from "../styles/Home.module.css"
import { Nav } from 'react-bootstrap'
import Contacts from "../sharedComponents/Contacts"
import Statuses from "../sharedComponents/Statuses"
import { Link } from 'react-router-dom';
import UpdateStatus from "../sharedComponents/UpdateStatus";
import { FaUserFriends, FaClock, FaBookmark, FaCalendar } from 'react-icons/fa';

const Home = ({profile, setChatRecipientId}) => {    

    if (!profile) {
        <></>
    }

    return (
        <div className={`${styles.homeContainer} d-flex justify-content-between justify-content-lg-center`}>
            <Left profile={profile} />
            <Middle profile={profile} />
            <Right setChatRecipientId={setChatRecipientId}/>
        </div>
    )
}

// Left column of the home page
const Left = ({profile}) => {
    return (
        <div className={`${styles.leftContainer} col-xl-2 col-lg-3 d-none d-lg-block mt-3 me-3`}>
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
    )
}

// Middle column of the home page
const Middle = ({profile}) => {
    return (
        <div className={`${styles.middleContainer} mx-3`} style={{width: '600px'}}>
            <UpdateStatus clientProfile={profile} recipientProfile={profile}/>
            <Statuses clientProfile={profile}/>
        </div>
    )
}

// Right column of the home page
const Right = ({setChatRecipientId}) => {
    return (
        <div className="d-md-block col-xl-2 col-lg-3 col-md-3 d-none d-sm-none ms-3">
            <Contacts setChatRecipientId={setChatRecipientId}/>
        </div>
    )
}

export default Home

