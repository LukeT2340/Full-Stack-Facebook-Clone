import styles from "../styles/Profile.module.css"
import {useState} from 'react'
import { useProfile } from "../hooks/useProfile"
import { useParams } from "react-router-dom"
import { FaCamera, FaPlus, FaPen, FaChevronDown } from 'react-icons/fa';
import Statuses from "../sharedComponents/Statuses"
import UpdateStatus from "../sharedComponents/UpdateStatus";
import { useAuthContext } from "../hooks/useAuthContext";
import NewStatusModal from "../sharedComponents/NewStatusModal";

// Profile page
const Profile = () => {
    const { userId } = useParams()
    const { profile, isProfileLoading } = useProfile(userId)

    if (isProfileLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`${styles.profilePageContainer} d-flex flex-column justify-content-center align-items-center`}>
            <ProfileTop profile={profile} />
            <ProfileBottom profile={profile} />
        </div>
    )
}

// Top part of the profile page
const ProfileTop = ({profile}) => {
    return (
        <div className={`col-xl-5 col-lg-8 col-md-10 col-sm-12`}>
            <div className={`${styles.profileTop} d-flex flex-column flex-md-row justify-content-center align-items-md-end`}>
                <div className="col-xl-6 col-lg-6  order-1 order-md-1 mt-auto mt-md-0">
                    <ProfilePictureAndName profile={profile} />
                </div>
                <div className="col-xl-6 col-lg-6  order-2 order-md-2 mt-auto mt-md-0">
                    <AddStoryAndEditProfileButtons profile={profile} />
                </div>
            </div>
        </div>
    )
}

// Bottom part of the profile page
const ProfileBottom = ({profile}) => {
    const { user } = useAuthContext()

    return (
        <div className={styles.profileBottomBackground}>
            <div className={`col-xl-5 col-lg-8 col-md-10 col-sm-12`}>
                <div className={`${styles.profileBottom} d-flex flex-column flex-md-row justify-content-center`}>
                    {/* Left side */}
                    <div className="col-xl-5 col-lg-4 col-md-10 col-12 mx-2">
                        <Intro profile={profile}/>
                    </div>

                    {/* Right side */}
                    <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-2">
                        {user.user_id == profile._id && (
                            <UpdateStatus profile={profile} />
                        )}
                        <Statuses profile={profile} onlyFetchOwnStatuses={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile picture and name at the top of the screen
const ProfilePictureAndName = ({profile}) => {
    return (
        <div className={`${styles.profilePictureAndName} mt-auto`}>
            <img className={styles.profilePicture} src={profile.profilePictureUrl} alt="Profile picture"></img>
            <FaCamera className={styles.cameraIcon} />
            <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
        </div>
    )
}

// Add story and edit profile buttons
const AddStoryAndEditProfileButtons = ({profile}) => {
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

    if (user.user_id != profile._id) {
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
            <NewStatusModal profile={profile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
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