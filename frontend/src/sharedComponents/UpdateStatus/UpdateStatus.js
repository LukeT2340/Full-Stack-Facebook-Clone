import { FaVideo, FaImages, FaSmile} from 'react-icons/fa';
import { useState } from 'react'
import styles from "./UpdateStatus.module.css"
import { Link } from 'react-router-dom';
import NewStatusModal from '../NewStatusModal/NewStatusModal';

// Upload status section
const UpdateStatus = ({clientProfile, recipientProfile}) => {
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
                <Link to={`/profile/${clientProfile._id}`}>
                    <img src={clientProfile.profilePictureUrl} alt="Profile picture"></img>
                </Link>
                <button className={styles.textFieldLookalike} onClick={handleOpenNewStatusForm}>{clientProfile._id === recipientProfile._id ? `What's on your mind, ${clientProfile.firstName}?` : `Write something to ${recipientProfile.firstName}`}</button>
            </div>
            <hr className='mb-2 mt-3 p-0'></hr>
            <div className="d-flex">
                <div className="col-4 d-flex">
                    <button className={`${styles.statusOptionButton} d-flex justify-content-center align-items-center`}><FaVideo color="#f02848" className="me-1" size={24}/><p className='m-0 p-0 d-none d-md-block'>Live video</p></button>
                </div>
                <div className="col-4 d-flex">
                    <button className={`${styles.statusOptionButton} d-flex justify-content-center align-items-center`}><FaImages color="#44be62" className="me-1" size={24}/><p className='m-0 p-0 d-none d-md-block'>Photo/video</p></button>
                </div>
                <div className="col-4 d-flex">
                    <button className={`${styles.statusOptionButton} d-flex justify-content-center align-items-center`}><FaSmile color="#f7ba28" className="me-1" size={24}/><p className='m-0 p-0 d-none d-md-block'>Feeling/activity</p></button>
                </div>
            </div>
            <NewStatusModal clientProfile={clientProfile} recipientProfile={recipientProfile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
        </div>
    )
}

export default UpdateStatus