import styles from "./Profile.module.css"
import { useAuthContext } from '../hooks/useAuthContext'

// Introduction
const Intro = ({profile}) => {
    const { user } = useAuthContext()

    return (
        <div className={`${styles.introContainer} me-md-4`}>
            { /* TODO: This component should differ depending on whether it is the user's profile or not */}
            {user._id === profile._id ? (
              <>
                <h4>Intro</h4>
                {profile.bio ? (
                    <button>Edit bio</button>
                ) : (
                    <button>Add bio</button>
                )}
                <button>Edit details</button>
                <button>Add featured</button>
            </>  
            ) : (
                <p>TODO: This component should differ depending on whether it is the user's profile or not</p>
            )}
        </div>
    )
}

export default Intro