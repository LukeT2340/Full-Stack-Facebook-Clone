import { FaVideo, FaImages, FaSmile} from 'react-icons/fa';
import { useState } from 'react'
import styles from "../styles/UpdateStatus.module.css"
import { Link } from 'react-router-dom';
import NewStatusModal from './NewStatusModal';

// Upload status section
const UpdateStatus = ({profile}) => {
    const [showNewStatusForm, setShowNewStatusForm] = useState(false); 

    // Open new status form
    const handleOpenNewStatusForm = () => {
        setShowNewStatusForm(true)
    };

    // Close new status form
    const handleCloseNewStatusForm = () => {
        setShowNewStatusForm(false)
    };

    return (
        <div className={`d-flex flex-column ${styles.newStatusContainer}`}>
            <div className="d-flex">
                <Link to={`/profile/${profile._id}`}>
                    <img src={profile.profilePictureUrl} alt="Profile picture"></img>
                </Link>
                <button className={styles.textFieldLookalike} onClick={handleOpenNewStatusForm}>{`What's on your mind, ${profile.firstName}?`}</button>
            </div>
            <hr className='mb-2 mt-3 p-0'></hr>
            <div className="d-flex">
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaVideo color="#f02848" className="me-1"/>Live video</button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaImages color="#44be62" className="me-1"/>Photo/video</button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaSmile color="#f7ba28" className="me-1"/>Feeling/activity</button>
                </div>
            </div>
            <NewStatusModal profile={profile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
        </div>
    )
}

export default UpdateStatus