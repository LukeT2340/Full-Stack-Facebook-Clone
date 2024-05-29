import CoverPhoto from './CoverPhoto.js'
import styles from "./Profile.module.css"
import { useAuthContext } from "../hooks/useAuthContext.js"
import NewStatusModal from "../sharedComponents/NewStatusModal.js"
import { FaPlus, FaPen, FaChevronDown } from 'react-icons/fa'
import React, { useState } from 'react'

// Top part of the profile page
const ProfileTop = ({clientProfile, pageProfile}) => {
    return (
        <div className={`col-xl-7 col-lg-8 col-md-12`}>
            <CoverPhoto pageProfile={pageProfile} clientProfile={clientProfile}/>
            <div className={` ${styles.profileInfoContainer} d-flex flex-column flex-md-row`}>
                <ProfilePictureAndName pageProfile={pageProfile} />
                <AddStoryAndEditProfileButtons clientProfile={clientProfile} pageProfile={pageProfile} />
            </div>
        </div>
    )
}

// Add story and edit profile buttons
const AddStoryAndEditProfileButtons = ({pageProfile, clientProfile}) => {
    const { user } = useAuthContext()
    const [showNewStatusForm, setShowNewStatusForm] = useState(false); 

    // Open new status form
    const handleOpenNewStatusForm = () => {
        setShowNewStatusForm(true)
    };

    // Close new status form
    const handleCloseNewStatusForm = () => {
        setShowNewStatusForm(false)
    };

    if (user.user_id != pageProfile._id) {
        return
    }

    return(
        <div className="d-flex flex-wrap ms-auto mt-auto mb-2">
            <button className={styles.addStoryButton} onClick={handleOpenNewStatusForm}>
                <FaPlus />
                <p>Add to story</p>
            </button>
            <button className={styles.editProfileButton}>
                <FaPen />
                <p>Edit profile</p>
            </button>
            <button className={styles.peopleYouMayKnowButton}><FaChevronDown /></button>
            <NewStatusModal recipientProfile={pageProfile} clientProfile={clientProfile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
        </div>
    )
}

// Profile picture and name at the top of the screen
const ProfilePictureAndName = ({ pageProfile }) => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center">
            <img className={`${styles.profilePicture}`} src={pageProfile.profilePictureUrl} alt="Profile picture" />
            <h1 className="mx-2">{`${pageProfile.firstName} ${pageProfile.lastName}`}</h1>
        </div>
    );
};

export default ProfileTop