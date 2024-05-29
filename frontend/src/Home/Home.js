import styles from "./Home.module.css"
import Left from "./Left";
import Middle from "./Middle"
import Right from "./Right";

const Home = ({profile, setChatRecipientId}) => {    

    if (!profile) {
        <></>
    }

    return (
        <div className={`${styles.homeContainer} d-flex justify-content-between justify-content-lg-center`}>
            <Left profile={profile} />
            <Middle profile={profile} />
            <Right setChatRecipientId={setChatRecipientId}/>
        </div>
    )
}

export default Home
