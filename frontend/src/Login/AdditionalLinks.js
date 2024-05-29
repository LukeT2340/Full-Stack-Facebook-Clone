import RegistrationModal from './RegistrationModal';
import { Link } from 'react-router-dom'
import styles from './Login.module.css';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

// Forgot password and sign up button
const AdditionalLinks = () => {
    const [showRegistration, setShowRegistration] = useState(false); 

    // Open registration form
    const openRegistrationForm = () => {
        setShowRegistration(true)
    };

    // Close registration form
    const handleCloseRegistration = () => {
        setShowRegistration(false)
    };

    return (
        <div className={`d-flex justify-content-between mt-5`}>
            <p className='d-flex align-items-center'><Link to="/forgotpassword" className={styles.link}>Forgot password?</Link></p>
            <p className='d-flex align-items-center'>New to headbook? <Button onClick={openRegistrationForm} className={`${styles.signUpButton} p-2 m-2`}>Create free account</Button></p>
            <RegistrationModal show={showRegistration} handleClose={handleCloseRegistration} />
        </div>
    )
}

export default AdditionalLinks