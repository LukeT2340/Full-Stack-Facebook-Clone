import styles from './Login.module.css';

// Left side of login page
const Left = () => {
    return (
        <div className={`col-xl-4 col-lg-4 col-md-4 col-8 mx-md-0 my-3 mx-auto`}>
            <h1 className={`${styles.appName}`}>headbook</h1>
            <p className={`${styles.blurb}`}>Headbook helps you connect and share with the people in your life.</p>
        </div>
    )
}

export default Left