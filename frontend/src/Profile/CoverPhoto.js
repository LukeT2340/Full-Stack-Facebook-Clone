import { useUserDetails } from '../hooks/useUserDetails.js' 
import { Form } from 'react-bootstrap'
import styles from "./Profile.module.css"
import { FaCamera } from 'react-icons/fa'

// Cover photo
const CoverPhoto = ({pageProfile, clientProfile}) => {
    const { updateCoverPhoto, loading, error } = useUserDetails()

    // Handle Image Change
    const handleCoverPhotoChange = async (e) => {
        if (loading) {
            return
        }
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
        };
        await updateCoverPhoto(file)

        // If cover photo updated successfully, refresh the page
        if (!error) {
            window.location.reload();
        }
        reader.readAsDataURL(file);
    };
    
    return (
        <div className={`${styles.coverPhotoContainer} mx-auto`}>
            <img 
                src={pageProfile.coverPhotoUrl ? pageProfile.coverPhotoUrl : pageProfile.profilePictureUrl} 
                alt="Cover photo" 
                className={pageProfile.coverPhotoUrl ? styles.coverPhoto : styles.coverPhotoPlaceholder}>
            </img>
            {pageProfile._id === clientProfile._id && (
                <Form.Group className={`mt-auto`}>
                    <Form.Control type="file" accept="image/*" onChange={handleCoverPhotoChange} className="d-none" id="coverPhoto"></Form.Control>
                    <label htmlFor="coverPhoto" className={`${styles.customFileInputButton}`}>
                        <FaCamera className="me-1"/>
                        {loading ? `Loading...` : `Edit cover photo`}
                    </label>
                </Form.Group>
            )}
        </div>
    )
}

export default CoverPhoto