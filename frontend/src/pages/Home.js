import styles from "../styles/Home.module.css"
import { Nav } from 'react-bootstrap'
import Contacts from "../sharedComponents/Contacts"
import Statuses from "../sharedComponents/Statuses"
import { Link } from 'react-router-dom';
import UpdateStatus from "../sharedComponents/UpdateStatus";
import { FaUserFriends, FaClock, FaBookmark, FaCalendar } from 'react-icons/fa';

const Home = ({profile}) => {    

    if (!profile) {
        <>loading...</>
    }

    return (
        <div className={`${styles.homeContainer} d-flex justify-content-between`} style={{ backgroundColor: '#f1f2f5' }}> {/* I shouldn't have to define styles like this. Fix later*/ }
            <Left profile={profile} />
            <Middle profile={profile} />
            <Right />
        </div>
    )
}

// Left column of the home page
const Left = ({profile}) => {
    return (
        <div className="col-xl-3 col-lg-3 d-none d-lg-block me-3">
            <Nav.Link as={Link} to={`/profile/${profile._id}`} className={`${styles.profileContainer} m-0 p-2`}>
                <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                <p>{profile.firstName} {profile.lastName}</p>
            </Nav.Link>
            <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                <FaUserFriends className={styles.profilePicture} color={'var(--accent-color)'}/>
                <p>Friends</p>
            </Nav.Link>
            <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                <FaClock className={styles.profilePicture} color={'var(--accent-color)'}/>
                <p>Memories</p>
            </Nav.Link>
            <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                <FaBookmark className={styles.profilePicture} color={'purple'}/>
                <p>Saved</p>
            </Nav.Link>            
            <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                <FaCalendar className={styles.profilePicture} color={'red'}/>
                <p>Events</p>
            </Nav.Link>
            <Nav.Link as={Link} className={`${styles.profileContainer} m-0 p-2`}>
                <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                <p>{profile.firstName} {profile.lastName}</p>
            </Nav.Link>
        </div>
    )
}

// Middle column of the home page
const Middle = ({profile}) => {
    return (
        <div className={`${styles.middleContainer} vh-100 mx-5`} style={{width: '600px'}}>
            <UpdateStatus profile={profile}/>
            <Statuses profile={profile}/>
        </div>
    )
}

// Right column of the home page
const Right = () => {
    return (
        <div className="d-md-block col-xl-3 col-lg-3 col-md-3 d-none d-sm-none ms-3">
            <Contacts />
        </div>
    )
}

export default Home

