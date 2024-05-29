import React from 'react'
import styles from './Login.module.css';
import Left from './Left'
import Right from './Right'

// Login Page Root
const Login = () => {
    return (
        <div className={`${styles.page} d-md-flex d-sm-block align-items-center justify-content-center vh-100 `}>
            <Left />
            <Right />
        </div>
    );
}

export default Login;