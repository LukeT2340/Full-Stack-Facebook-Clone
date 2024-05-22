import React from "react";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// The bottom component of each page
const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className={`${styles.container}`}>
                <hr className={styles.hr} />
                <FootNoteSection />
            </div>
        </footer>
    );
}

// Footnote
const FootNoteSection = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <p className="text-center">&copy; 2024 HeadBook. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;