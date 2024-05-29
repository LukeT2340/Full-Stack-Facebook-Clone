import { useContacts } from "../hooks/useContacts"
import styles from "../sharedComponentsStyles/Contacts.module.css"
import { FaSearch, FaEllipsisH, FaCircle } from 'react-icons/fa'

// Shows Contacts
const Contacts = ({setChatRecipientId}) => {
    const { contacts, isLoading } = useContacts(20);
    if (isLoading) {
        return <>Loading...</>;
    }

    if (!contacts) {
        return <>No contacts found.</>;
    }

    return (
        <div className={styles.contactsContainer}>
            <hr></hr>
            <div className={styles.topBar}>
                <div className={styles.topBarLeft}>
                    <h4>Contacts</h4>
                </div>
                <div className={styles.topBarRight}>
                    <FaSearch className="me-3"/>
                    <FaEllipsisH className="me-3"/>
                </div>
            </div>
            {contacts.map((contact) => (
                <Contact setChatRecipientId={setChatRecipientId} key={contact._id} contact={contact} />
            ))}
        </div>
    );
};

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

export default Contacts;
