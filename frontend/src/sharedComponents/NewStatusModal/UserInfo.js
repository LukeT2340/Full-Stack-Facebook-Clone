import styles from "./NewStatusModal.module.css"
import { Dropdown } from 'react-bootstrap'
import { FaGlobe, FaCaretRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Top part of modal that specifies the users' details
const UserInfo = ({clientProfile, recipientProfile, visibility, setVisibility}) => {

    const handleVisibilityChange = (newVisibility) => {
        setVisibility(newVisibility);
    };
    return (
        <div className="d-flex">
            <Link to={`/profile/${clientProfile._id}`}>
                <img className={styles.profilePicture} src={clientProfile.profilePictureUrl}></img>
            </Link>
            <div className="d-flex flex-column">
                <div className='d-flex align-items-center'>
                    <p className="m-0 p-0">{clientProfile.firstName} {clientProfile.lastName}</p>
                    {(clientProfile._id !== recipientProfile._id) && (
                        <>
                            <FaCaretRight />
                            <p className="m-0 p-0">{recipientProfile.firstName} {recipientProfile.lastName}</p>
                        </>
                    )}
                </div>
                <Dropdown className={`${styles.visibilityDropdown}`}>
                    <Dropdown.Toggle variant="light" id="visibility-dropdown" className="d-flex align-items-center">
                        <FaGlobe className="me-1" />
                        {visibility}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleVisibilityChange('Public')}>Public</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleVisibilityChange('Friends')}>Friends</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleVisibilityChange('Private')}>Private</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>                            
            </div>
        </div>
    )
}

export default UserInfo