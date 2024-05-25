import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useRegister } from '../hooks/useRegister'
import { Link } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'
import { FaGoogle, FaApple } from 'react-icons/fa'
import styles from '../styles/Login.module.css';

// Login Page Root
const Login = () => {
    return (
        <div className={`${styles.page} d-md-flex d-sm-block align-items-center justify-content-center vh-100 `}>
            <LeftSide />
            <RightSide />
        </div>
    );
};

// Left side of login page
const LeftSide = () => {
    return (
        <div className={`col-xl-4 col-lg-4 col-md-4 col-8 mx-md-0 mx-auto`}>
            <h1 className={`${styles.appName}`}>headbook</h1>
            <p className={`${styles.blurb}`}>Headbook helps you connect and share with the people in your life.</p>
        </div>
    )
}

// Right side of login page
const RightSide = () => {
    return (
        <div className={`${styles.loginContainer} col-lg-4 col-md-8 col-sm-11 mx-4`}>   
            {/* Email and password sign-in */}
            <EmailLogin />

            {/* 'OR' divider */}
            <div className="row justify-content-center align-items-center my-3">
                <div className="col">
                    <hr className="w-100"></hr>
                </div>
                <div className="col-auto">
                    <span className="mx-1">OR</span>
                </div>
                <div className="col">
                    <hr className="w-100"></hr>
                </div>
            </div>

            {/* Third party sign-in options */}
            <ThirdPartyLogin />
            
            {/* Forgot password and Sign up links */}
            <AdditionalLinks />        
        </div>
    )
}

// Google and Apple sign in
const ThirdPartyLogin = () => {
    return (
        <div className='d-flex flex-column align-items-center'>
            {/* Sign in with Google */}
            <Button className={`d-flex justify-content-center align-items-center ${styles.thirdPartySignInButton} ${styles.googleSignInButton} my-2`}>
                <FaGoogle className="me-2" /> Sign in with Google
            </Button>

            {/* Sign in with Apple */}
            <Button variant="dark" className={`d-flex justify-content-center align-items-center ${styles.thirdPartySignInButton} my-2`}>
                <FaApple className="me-2" /> Sign in with Apple
            </Button>
        </div>
    )
}

// Email Login
const EmailLogin = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, error, isLoading } = useLogin()

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
        await login(email, password)
    }

    return (
        <Form onSubmit={submitForm} className={`d-flex flex-column justify-content-center align-items-center `}>
            <Form.Group controlId="formBasicEmail" className={`${styles.textInput} my-1`}>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    required 
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={`${styles.textInput} my-1`}>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    required 
                />
            </Form.Group>

            <Button type="submit" className={`${styles.loginButton} mt-2`} disabled={isLoading}>
                {/* Show loading text when isLoading */}
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            {error && (
                <p>{error}</p>)
            } 
        </Form>
    )
}

// Forgot password and Sign up links
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

export default Login;