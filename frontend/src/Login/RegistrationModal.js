import { useRegister } from '../hooks/useRegister'
import { Form, Button, Modal } from 'react-bootstrap'
import styles from './Login.module.css';
import React, { useState } from 'react'

// Registration form
const RegistrationModal = ({ show, handleClose }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register, error, isLoading } = useRegister()
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle Profile Picture Change
    const handleImageChange = (e) => {
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
            setImagePreview(reader.result);
            setSelectedImage(file);
        };
        reader.readAsDataURL(file);
    };
    
    // Handle First Name Change 
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    };

    // Handle Last Name Change
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    // Handle Email Change
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };

    // Handle Password Change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    // Handle Login
    const submitForm = async (e) => {
        e.preventDefault()
        await register(selectedImage, firstName, lastName, email, password)
    }

    return (
        <Modal className={`d-flex flex-column justify-content-center ${styles.registrationFormContainer}`} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.signupText}>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${styles.registrationBodyContainer}`}>
                <Form onSubmit={submitForm} className={`d-flex flex-column justify-content-center align-items-center `}>
                    <Form.Label>About you</Form.Label>
                    { /* Profile picture */ }
                    {selectedImage ? (
                        <img className={`${styles.profilePicture}`} src={imagePreview} alt="Profile Preview" />
                    ) : (
                        <Form.Group controlId="formBasicProfilePicture" className={`${styles.textInput}`}>
                            <Form.Control 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            required
                            />
                        </Form.Group>
                    )}

                    { /* First name */}
                    <Form.Group controlId="formBasicFirstName" className={`${styles.textInput} my-1`}>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter first name" 
                            value={firstName} 
                            onChange={handleFirstNameChange} 
                            required 
                        />
                    </Form.Group>

                    { /* Surname */}
                    <Form.Group controlId="formBasicLastName" className={`${styles.textInput} my-1`}>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter surname" 
                            value={lastName} 
                            onChange={handleLastNameChange} 
                            required 
                        />
                    </Form.Group>

                    { /* Email */}
                    <Form.Label>Email</Form.Label>
                    <Form.Group controlId="formBasicEmail" className={`${styles.textInput} my-1`}>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            required 
                        />
                    </Form.Group>

                    { /* Surname */}
                    <Form.Label>Password</Form.Label>
                    <Form.Group controlId="formBasicPassword" className={`${styles.textInput} my-1`}>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                    </Form.Group>

                    <p className={styles.terms}> In vitae maximus dolor. Phasellus pharetra, nisi vel tristique sagittis, lectus erat egestas tellus, in vestibulum sem elit eu nibh. Nunc id massa dolor. Praesent non fermentum tellus. Morbi eget risus mi. Sed tortor nunc, viverra at elementum vel, lobortis ut ipsum. Proin tellus sem, tempus eu diam vel, venenatis ultrices sapien.</p>

                    <Button type="submit" className={`${styles.signupButton} mt-2`} disabled={isLoading}>
                        {/* Show loading text when isLoading */}
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    {error && (
                        <p>{error.message}</p>)
                    } 
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default RegistrationModal