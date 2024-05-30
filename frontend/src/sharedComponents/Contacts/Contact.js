import styles from "./Contacts.module.css"
import { FaCircle } from 'react-icons/fa'
import { useUnreadMessageCount } from "../../hooks/useUnreadMessageCount";

// Individual Contact
const Contact = ({ contact, setChatRecipientId }) => {
    // Fetch unread message count
    const { unreadCount } = useUnreadMessageCount(contact._id)


    // Handle contact button clicked (open up chat with the contact)
    const handleContactButtonClicked = () => {
        setChatRecipientId(contact._id)
    }

    return (
        <button className={styles.contactContainer} onClick={handleContactButtonClicked}>
            <div className={styles.profilePicture}>
                <img src={contact.profilePictureUrl} alt="profile picture" className={styles.profilePicture}></img>
                <FaCircle className={styles.onlineIcon} />
            </div>
            <h5>{`${contact.firstName} ${contact.lastName}`}</h5>
            {unreadCount > 0 && (   
                <div className={styles.unreadCountContainer}>
                    <h6>{unreadCount}</h6>
                </div>
            )}  
        </button>
    )
};

export default Contact