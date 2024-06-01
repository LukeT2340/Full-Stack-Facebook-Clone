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
            <Right profile={profile} setChatRecipientId={setChatRecipientId}/> {/* Pass the setChatRecipientId down so that clicking on a contact will open the Chat */}
        </div>
    )
}

export default Home

