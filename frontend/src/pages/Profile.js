import styles from "../styles/Profile.module.css"
import React, { useState } from 'react'
import { useProfile } from "../hooks/useProfile"
import { useParams } from "react-router-dom"
import { FaCamera, FaPlus, FaPen, FaChevronDown } from 'react-icons/fa'
import Statuses from "../sharedComponents/Statuses"
import UpdateStatus from "../sharedComponents/UpdateStatus"
import { useAuthContext } from "../hooks/useAuthContext"
import NewStatusModal from "../sharedComponents/NewStatusModal"
import { useUserDetails } from '../hooks/useUserDetails.js' 
import { Form } from 'react-bootstrap'

// Profile page
const Profile = () => {
    const clientUserJson = localStorage.getItem('user');
    const clientUser = JSON.parse(clientUserJson);
    const { userId } = useParams()
    const { profile: pageProfile, isProfileLoading: isPageProfileLoading } = useProfile(userId) // Get profile of the person's profile page we are viewing
    const { profile: clientProfile, isProfileLoading: isClientProfileLoading} = useProfile(clientUser.user_id) // Get the profile of the client user

    if (isPageProfileLoading || isClientProfileLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <ProfileTop pageProfile={pageProfile} clientProfile={clientProfile} />
            <ProfileBottom pageProfile={pageProfile} clientProfile={clientProfile} />
        </div>
    )
}

// Cover photo
const CoverPhoto = ({pageProfile, clientProfile}) => {
    const { updateCoverPhoto, loading, error } = useUserDetails()

    // Handle Image Change
    const handleCoverPhotoChange = async (e) => {
        const file = e.target.files[0];
        // Check if a file is selected
        if (!file) {
            return;
        }
    
        // Check if the selected file is a valid instance of Blob or File
        if (!(file instanceof Blob) && !(file instanceof File)) {
            return;
        }
    
        // Proceed with handling the valid file
        const reader = new FileReader();
            reader.onloadend = () => {
        };
        await updateCoverPhoto(file)

        // If cover photo updated successfully, refresh the page
        if (!error) {
            window.location.reload();
        }
        reader.readAsDataURL(file);
    };
    
    return (
        <div className={`${styles.coverPhotoContainer} mx-auto`}>
            <img 
                src={pageProfile.coverPhotoUrl ? pageProfile.coverPhotoUrl : pageProfile.profilePictureUrl} 
                alt="Cover photo" 
                className={pageProfile.coverPhotoUrl ? styles.coverPhoto : styles.coverPhotoPlaceholder}>
            </img>
            {pageProfile._id === clientProfile._id && (
                <Form.Group className={`${styles.changeCoverContainer}`}>
                    <Form.Control type="file" accept="image/*" onChange={handleCoverPhotoChange} className="d-none" id="additionalMedia"></Form.Control>
                    <label htmlFor="additionalMedia" className={`${styles.customFileInputButton}`}>
                        <FaCamera className="me-1"/>
                        Edit cover photo
                    </label>
                </Form.Group>
            )}
        </div>
    )
}

// Top part of the profile page
const ProfileTop = ({clientProfile, pageProfile}) => {
    return (
        <div className={`col-xl-7 col-lg-8 col-md-10 col-sm-12`}>
            <CoverPhoto pageProfile={pageProfile} clientProfile={clientProfile}/>
            <div className={` ${styles.profileInfoContainer} d-flex flex-column flex-md-row`}>
                <ProfilePictureAndName pageProfile={pageProfile} />
                <AddStoryAndEditProfileButtons clientProfile={clientProfile} pageProfile={pageProfile} />
            </div>
        </div>
    )
}

// Bottom part of the profile page
const ProfileBottom = ({pageProfile, clientProfile}) => {
    return (
        <div className={styles.profileBottomBackground}>
            <div className={`col-xl-7 col-lg-8 col-10`}>
                <div className={`${styles.profileBottom} d-flex flex-column flex-md-row align-items-center`}>
                    {/* Left side */}
                    <div className="col-xl-5 col-lg-4 col-md-10 col-12 mx-2 mb-auto">
                        <Intro profile={pageProfile}/>
                    </div>

                    {/* Right side */}
                    <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-2">
                        <UpdateStatus clientProfile={clientProfile} recipientProfile={pageProfile} />
                        <Statuses pageProfile={pageProfile} clientProfile={clientProfile} onlyFetchOwnStatuses={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile picture and name at the top of the screen
const ProfilePictureAndName = ({ pageProfile }) => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center">
            <div className="">
                <img className={`${styles.profilePicture}`} src={pageProfile.profilePictureUrl} alt="Profile picture" />
                <FaCamera className={styles.cameraIcon} />
            </div>
            <h1>{`${pageProfile.firstName} ${pageProfile.lastName}`}</h1>
        </div>
    );
};


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
        <div className="d-flex flex-wrap justify-content-end mt-auto mb-4">
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

const Intro = ({profile}) => {

    return (
        <div className={styles.introContainer}>
            <h4>Intro</h4>
            {profile.bio ? (
                <button>Edit bio</button>
             ) : (
                <button>Add bio</button>
            )}
            <button>Edit details</button>
            <button>Add featured</button>
        </div>
    )
}

export default Profile