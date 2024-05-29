import styles from "./Contacts.module.css"
import { FaCircle } from 'react-icons/fa'

// Individual Contact
const Contact = ({ contact, setChatRecipientId }) => {

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
        </button>
    )
};

export default Contact