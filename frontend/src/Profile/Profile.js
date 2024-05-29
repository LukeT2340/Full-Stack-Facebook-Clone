import styles from "./Profile.module.css"
import React, { useState } from 'react'
import { useProfile } from "../hooks/useProfile.js"
import { useParams } from "react-router-dom"
import ProfileTop from "./ProfileTop.js"
import ProfileBottom from "./ProfileBottom.js"

// Profile page
const Profile = () => {
    const clientUserJson = localStorage.getItem('user');
    const clientUser = JSON.parse(clientUserJson);
    const { userId } = useParams()
    const { profile: pageProfile, isProfileLoading: isPageProfileLoading } = useProfile(userId) // Get profile of the person's profile page we are viewing
    const { profile: clientProfile, isProfileLoading: isClientProfileLoading} = useProfile(clientUser.user_id) // Get the profile of the client user

    if (isPageProfileLoading || isClientProfileLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`${styles.profileContainer} d-flex flex-column justify-content-center align-items-center`}>
            <ProfileTop pageProfile={pageProfile} clientProfile={clientProfile} />
            <ProfileBottom pageProfile={pageProfile} clientProfile={clientProfile} />
        </div>
    )
}

export default Profile