import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import styles from './Login.module.css';

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

export default EmailLogin