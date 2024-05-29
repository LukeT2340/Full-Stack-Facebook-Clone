import Statuses from "../sharedComponents/Statuses.js"
import UpdateStatus from "../sharedComponents/UpdateStatus.js"
import styles from "./Profile.module.css"
import Intro from "./Intro.js"

// Bottom part of the profile page
const ProfileBottom = ({pageProfile, clientProfile}) => {
    return (
        <div className={styles.profileBottomBackground}>
            <div className={`col-xl-7 col-lg-8 col-10`}>
                <div className={`${styles.profileBottom} d-flex flex-column flex-md-row align-items-center`}>
                    {/* Left side */}
                    <div className="col-xl-5 col-lg-4 col-md-10 col-12 mx-2 mb-auto">
                        <Intro profile={pageProfile}/>
                    </div>

                    {/* Right side */}
                    <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-2">
                        <UpdateStatus clientProfile={clientProfile} recipientProfile={pageProfile} />
                        <Statuses pageProfile={pageProfile} clientProfile={clientProfile} onlyFetchOwnStatuses={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBottom