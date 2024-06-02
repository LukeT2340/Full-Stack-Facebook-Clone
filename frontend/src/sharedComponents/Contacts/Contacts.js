import { useContacts } from "../../hooks/useContacts"
import styles from "./Contacts.module.css"
import { FaSearch, FaEllipsisH, FaCircle } from 'react-icons/fa'
import Contact from "./Contact";

// Shows Contacts
const Contacts = () => {
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
                <Contact key={contact._id} contact={contact} />
            ))}
            
        </div>
    );
};

export default Contacts;
