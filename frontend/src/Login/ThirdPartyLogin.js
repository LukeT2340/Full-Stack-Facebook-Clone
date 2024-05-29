import { FaGoogle, FaApple } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import styles from './Login.module.css';

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

export default ThirdPartyLogin