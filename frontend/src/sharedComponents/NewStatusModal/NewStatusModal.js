import styles from "./NewStatusModal.module.css"
import { Form, Button, Modal } from 'react-bootstrap'
import { FaImages, FaSmile, FaUserPlus, FaLocationArrow } from 'react-icons/fa';
import { useEffect, useState } from 'react'
import { useNewPost } from "../../hooks/useNewPost"
import UserInfo from "./UserInfo";

// Modal where users can post new statuses
const NewStatusModal = ({ clientProfile, recipientProfile, show, handleClose }) => {
    const { post, isSubmitted, isLoading } = useNewPost()
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
        await post(selectedImage, text, visibility, recipientProfile._id);
        window.location.reload(true); 
    }

    return (
        <Modal className={`d-flex flex-column justify-content-center ${styles.newStatusFormContainer}`} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title className={styles.createPostText}>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className={`d-flex flex-column`} onSubmit={handleSubmit}>

                    {/* Profile picture, name and visibility setting for status*/}
                    <UserInfo clientProfile={clientProfile} recipientProfile={recipientProfile} visibility={visibility} setVisibility={setVisibility} />
                    <textarea
                        placeholder={clientProfile._id === recipientProfile._id ? `What's on your mind, ${clientProfile.firstName}?` : `Say something to ${recipientProfile.firstName}`}
                        rows={6}
                        className="p-2"
                        value={text}
                        onChange={handleTextChange}
                    />

                    {/* Emoji 'button'*/}
                    <FaSmile size={22} color={'#00ccff'} className={styles.emojiIcon}/>

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
                                <FaImages color="#44be62" size={22} className="me-3"/>
                                <FaUserPlus color="blue" size={22} className="me-3"/>
                                <FaSmile color='#00ccff' size={22} className="me-3"/>
                                <FaLocationArrow color='orange' size={22} className="me-3"/>
                            </div>
                        </label>
                    </Form.Group>
                    <Button type="submit" className={`${styles.postButton} mt-2`} disabled={(text.trim() === "" && !selectedImage) || isLoading}>
                        {/* Show loading text when isLoading */}
                        {isLoading ? 'Posting...' : 'Post'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewStatusModal