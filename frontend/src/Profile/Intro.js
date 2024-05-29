import styles from "./Profile.module.css"

// Introduction
const Intro = ({profile}) => {
    return (
        <div className={styles.introContainer}>
            <h4>Intro</h4>
            {profile.bio ? (
                <button>Edit bio</button>
             ) : (
                <button>Add bio</button>
            )}
            <button>Edit details</button>
            <button>Add featured</button>
        </div>
    )
}

export default Intro