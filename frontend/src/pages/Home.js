import styles from "../styles/Home.module.css"
import { Form, Button, Modal, Dropdown, Nav } from 'react-bootstrap'
import { FaHeart, FaVideo, FaImages, FaSmile, FaGlobe, FaUserPlus, FaLocationArrow } from 'react-icons/fa';
import { useEffect, useState } from 'react'
import { useNewPost } from "../hooks/useNewPost"
import Contacts from "../sharedComponents/Contacts"
import Posts from "../sharedComponents/Posts"

const Home = ({profile}) => {    

    if (!profile) {
        <>loading...</>
    }

    return (
        <div className={`${styles.homeContainer} d-flex justify-content-center`} style={{ backgroundColor: '#f1f2f5' }}> {/* I shouldn't have to define styles like this. Fix later*/ }
            <Left profile={profile} />
            <Middle profile={profile} />
            <Right />
        </div>
    )
}

// Left column of the home page
const Left = ({profile}) => {
    return (
        <div className="col-xl-2 col-lg-3 d-none d-lg-block me-3">
            <Nav.Link className={`${styles.profileContainer} p-3`}>
                <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                <p>{profile.firstName} {profile.lastName}</p>
            </Nav.Link>
        </div>
    )
}

// Middle column of the home page
const Middle = ({profile}) => {
    return (
        <div className={`${styles.middleContainer} vh-100`} style={{width: '600px'}}>
            <UpdateStatus profile={profile}/>
            <Posts profile={profile}/>
        </div>
    )
}

// Right column of the home page
const Right = () => {
    return (
        <div className="d-md-block col-xl-2 col-lg-3 col-md-3 d-none d-sm-none ms-3">
            <Contacts />
        </div>
    )
}

// Upload status section
const UpdateStatus = ({profile}) => {
    const [showNewStatusForm, setShowNewStatusForm] = useState(false); 

    // Open new status form
    const handleOpenNewStatusForm = () => {
        setShowNewStatusForm(true)
    };

    // Close new status form
    const handleCloseNewStatusForm = () => {
        setShowNewStatusForm(false)
    };

    return (
        <div className={`d-flex flex-column ${styles.newStatusContainer}`}>
            <div className="d-flex">
                <img src={profile.profilePictureUrl} alt="Profile picture"></img>
                <button className={styles.textFieldLookalike} onClick={handleOpenNewStatusForm}>{`What's on your mind, ${profile.firstName}?`}</button>
            </div>
            <hr></hr>
            <div className="d-flex">
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaVideo color="#f02848" className="me-2"/>Live video</button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaImages color="#44be62" className="me-2"/>Photo/video</button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <button className={styles.statusOptionButton}><FaSmile color="#f7ba28" className="me-2"/>Feeling/activity</button>
                </div>
            </div>
            <NewStatusModal profile={profile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
        </div>
    )
}



// Modal where users can post new statuses
const NewStatusModal = ({ profile, show, handleClose }) => {
    const { post, isSubmitted, isLoading, error } = useNewPost()
    const [text, setText] = useState("")    
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [visibility, setVisibility] = useState('Public');

    useEffect(()=>{
        setText("")
        setSelectedImage(null)
        setImagePreview(null)
    }, [isSubmitted])

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Check if a file is selected
        if (!file) {
            return;
        }
    
        // Check if the selected file is a valid instance of Blob or File
        if (!(file instanceof Blob) && !(file instanceof File)) {
            return;
        }
    
        // Proceed with handling the valid file
        const reader = new FileReader();
            reader.onloadend = () => {
            setImagePreview(reader.result);
            setSelectedImage(file);
        };
        reader.readAsDataURL(file);
    };

    // Handle text change
    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    // Handle post button clicked
    const handleSubmit = async (e) => {
        e.preventDefault()
        await post(selectedImage, text, visibility);
        window.location.reload(true); 
    }

    const handleVisibilityChange = (newVisibility) => {
        setVisibility(newVisibility);
    };

    return (
        <Modal className={`modal-lg d-flex flex-column justify-content-center ${styles.newStatusFormContainer}`} show={show} onHide={handleClose}>
            <div className={`${styles.modalInnerContainer}`}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.createPostText}>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={`d-flex flex-column ${styles.modalBody}`} onSubmit={handleSubmit}>
                        {/* Profile picture, name and visibility setting for status*/}
                        <div className="d-flex">
                            <img className={styles.profilePicture} src={profile.profilePictureUrl}></img>
                            <div className="d-flex flex-column">
                                <p className="m-0 p-0">{profile.firstName} {profile.lastName}</p>
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
                        <textarea
                            placeholder={`What's on your mind, ${profile.firstName}?`}
                            rows={4}
                            className="p-4"
                            value={text}
                            onChange={handleTextChange}
                        />
                        {/* Emoji 'button'*/}
                        <FaSmile size={25} color={'#00ccff'} className={styles.emojiIcon}/>

                        {/* Show selected media */}
                        {selectedImage && (
                            <img className={`${styles.selectedImage}`} src={imagePreview} alt="Image Preview" />
                        )}

                        {/* Add images to status*/}
                        <Form.Group className={`${styles.imageInput}`}>
                            {/* Hide the actual file input */}
                            <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="d-none"
                                id="additionalMedia"
                            />
                            
                            {/* Custom label styled as a button */}
                            <label htmlFor="additionalMedia" className={`${styles.customFileInputButton}`}>
                                <span>Add to your post</span>
                                <div>
                                    <FaImages color="#44be62" size={26} className="me-3"/>
                                    <FaUserPlus color="blue" size={26} className="me-3"/>
                                    <FaSmile color='#00ccff' size={26} className="me-3"/>
                                    <FaLocationArrow color='orange' size={26} className="me-3"/>
                                </div>
                            </label>
                        </Form.Group>
                        <Button type="submit" className={`${styles.postButton} mt-2`} disabled={text.trim() === "" || isLoading}>
                            {/* Show loading text when isLoading */}
                            {isLoading ? 'Posting...' : 'Post'}
                        </Button>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default Home

