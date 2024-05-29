import styles from './Login.module.css';
import React from 'react'
import EmailLogin from './EmailLogin';
import AdditionalLinks from './AdditionalLinks';
import ThirdPartyLogin from './ThirdPartyLogin';

// Right side of login page
const Right = () => {
    return (
        <div className={`${styles.loginContainer} border border-md-none border-lg col-lg-4 col-md-8 col-sm-12 mx-4`}>   
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

export default Right