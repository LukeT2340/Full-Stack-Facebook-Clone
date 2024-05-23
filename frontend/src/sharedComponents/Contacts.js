import { useContacts } from "../hooks/useContacts"
import styles from "../styles/Contacts.module.css"
import { useEffect, useState } from 'react'
import { FaSearch, FaEllipsisH, FaCircle } from 'react-icons/fa'

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

// Individual Contact
const Contact = ({ contact }) => {
    return (
        <button className={styles.contactContainer}>
            <div className={styles.profilePicture}>
                <img src={contact.profilePictureUrl} alt="profile picture" className={styles.profilePicture}></img>
                <FaCircle className={styles.onlineIcon} />
            </div>
            <h5>{`${contact.firstName} ${contact.lastName}`}</h5>
        </button>
    )
};

export default Contacts;
