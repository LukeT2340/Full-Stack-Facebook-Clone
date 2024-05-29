import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useComment } from '../hooks/useComment'
import styles from "./Statuses.module.css"

// Write new comment
const NewComment = ({setComments, statusId, profile}) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const { publishComment, isLoading } = useComment(statusId);

    // Handle text box focused
    const handleFocused = () => {
        setIsFocused(true);
    };

    // Handle text change
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Publish comment
    const handleComment = async () => {
        try {
            const newComment = await publishComment(text);
            setComments(prev => [...prev, newComment]); 
            setText('');
        } catch (error) {
            console.error('Error publishing comment:', error);
        }   
    };


    return (
        <div className={styles.newCommentContainer}>
            <Link to={`/profile/${profile._id}`}>
                <img src={profile.profilePictureUrl} alt="Profile picture" className={styles.commentSectionProfilePicture}></img>
            </Link>
            <div className={styles.commentInputContainer}>
                <input onSubmit={handleComment} onFocus={handleFocused} type="text" value={text} placeholder="Submit your comment..." onChange={handleTextChange}></input>
                {isFocused && (
                    <button className={styles.publishCommentButton} onClick={handleComment}>
                        <FaArrowAltCircleUp size={22} className='me-1' color={'var(--accent-color)'}/>
                    </button>
                )}
            </div>
        </div>
    )
}

export default NewComment