import styles from "../styles/Statuses.module.css"
import { useProfile } from "../hooks/useProfile"
import { Link } from 'react-router-dom';

// Individual comments
const Comment = ({comment}) => {
    const { profile, isProfileLoading } = useProfile(comment.userId) // Fetch profile of person who's comment it is

    // Convert date to user friendly type
    const userFriendlyDate = (dateString) => {
        const date = new Date(dateString);
    
        // Get day of the month
        const day = date.getDate();
    
        // Get month name
        const month = date.toLocaleString('default', { month: 'short' });
    
        // Get hours and minutes
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day} ${month} at ${hours}:${minutes}`;
    }

    if (isProfileLoading) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.commentContainer}>
            <Link to={`/profile/${profile._id}`}>
                <img src={profile.profilePictureUrl} alt="Profile picture" className={styles.commentSectionProfilePicture}></img>
            </Link>
            <div>
                <div className={styles.nameAndCommentTextContainer}>
                    <Link to={`/profile/${profile._id}`} className={styles.nameLink}>
                        <p className={styles.commenterName} >{profile.firstName} {profile.lastName}</p>
                    </Link>
                    <p>{comment.text}</p>
                </div>
                <p className={styles.commentDateTime}>{userFriendlyDate(comment.createdAt)}</p>
            </div>
        </div>
    )
}

export default Comment