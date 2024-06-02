import Contacts from "../sharedComponents/Contacts/Contacts"

// Right column of the home page
const Right = ({profile, setChatRecipientId}) => {

    return (
        <div className="d-md-block col-xl-2 col-lg-3 col-md-3 d-none d-sm-none ms-3">
            <Contacts clientProfile={profile}/>
        </div>
    )
}

export default Right