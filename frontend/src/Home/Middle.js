import Statuses from "../sharedComponents/Statuses/Statuses"
import UpdateStatus from "../sharedComponents/UpdateStatus/UpdateStatus"
import styles from "./Home.module.css"

// Middle column of the home page
const Middle = ({profile}) => {
    return (
        <div className={`${styles.middleContainer} mx-3`} style={{width: '600px'}}>
            <UpdateStatus clientProfile={profile} recipientProfile={profile}/>
            <Statuses clientProfile={profile}/>
        </div>
    )
}

export default Middle