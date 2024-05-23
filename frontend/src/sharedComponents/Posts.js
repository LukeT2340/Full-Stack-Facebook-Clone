import { FaHeart, FaLaugh, FaThumbsUp, FaComment, FaShare, FaArrowAltCircleUp } from 'react-icons/fa';
import styles from "../styles/Posts.module.css"
import { useFetchStatuses } from "../hooks/useFetchStatuses"
import { useProfile } from "../hooks/useProfile"
import { useLikeStatus } from '../hooks/useLikeStatus';
import { useState } from 'react'

// This section holds all the new statuses by the user and other users
const Posts = ({profile}) => {
    const { statuses, areStatusesLoading } = useFetchStatuses(20, 1) // Fetch 20 statuses

    if (areStatusesLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className="d-flex flex-column">
            {statuses && statuses.map((status) => (
                <Post key={status._id} status={status} clientsProfile={profile} />
            ))}
        </div>
    )
}

// Individual posts
const Post = ({status, clientsProfile}) => {
    const { profile, isProfileLoading } = useProfile(status.userId) // Fetch profile of person who's post it is
    const { unlikeStatus, likeStatus, isLiked, isLoading } = useLikeStatus(status._id) 
    const [likeCount, setLikeCount] = useState(status.likes.length)
    const [commentSectionOpen, setCommentSectionOpen] = useState(status.comments.length > 0)

    // Handle comment button clicked
    const handleCommentButtonClicked = () => {
        setCommentSectionOpen(prev => !prev)
    }

    // Handle like status button clicked
    const handleLikeButtonClicked = async () => {
        if (isLiked) {
            await unlikeStatus();
            setLikeCount(prevCount => prevCount - 1);
        } else {
            await likeStatus();
            setLikeCount(prevCount => prevCount + 1);
        }
    };

    // Convert date to user friendly type
    const userFriendlyDate = (dateString) => {
        const date = new Date(dateString);
    
        // Get day of the month
        const day = date.getDate();
    
        // Get month name
        const month = date.toLocaleString('default', { month: 'short' });
    
        // Get hours and minutes
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day} ${month} at ${hours}:${minutes}`;
    }

    if (!profile || isProfileLoading || isLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`${styles.postContainer}`}>
            <div className={`d-flex`}>
                <img className={styles.profilePicture} src={profile.profilePictureUrl}></img>
                <div className={`${styles.nameAndDateContainer}`}>
                    <h6 className={styles.name}>{`${profile.firstName} ${profile.lastName}`}</h6>
                    <p className={styles.postDate}>{userFriendlyDate(status.createdAt)}</p>
                </div>
            </div>
            <div className={styles.postBodyContainer}>
                <p className={styles.postBody}>{status.text}</p>
                {status.media && status.media.url !== "" && (
                    <img src={status.media.url} className={styles.media} alt="Status media"></img>
                )}
            </div>
            <div className={styles.likesAndCommentsContainer}>
                {likeCount > 0 && (
                    <div className={styles.reactions}>
                        <FaThumbsUp color={'var(--accent-color)'}/>
                        <FaHeart color='red' />
                        <FaLaugh color={'rgb(255, 213, 0)'} className="me-2"/>
                        <p className={styles.reactionsCount}>{likeCount}</p>
                    </div>
                )}
                {status.comments.length > 0 && (
                    <div className={styles.commentCount}>
                        <p>{`${status.comments.length} comments`}</p>
                    </div>
                )}
            </div>
            <hr className='m-2'></hr>
            <div className={styles.feedbackContainer}>
                <button className={styles.feedbackButton} onClick={handleLikeButtonClicked}>
                    <FaThumbsUp color={isLiked ? 'var(--accent-color)' : ''}/>
                    <p>Like</p>
                </button>
                <button className={styles.feedbackButton} onClick={handleCommentButtonClicked}>
                    <FaComment />
                    <p>Comment</p>
                </button>
                <button className={styles.feedbackButton}>
                    <FaShare />
                    <p>Share</p>
                </button>
            </div>
            <Comments status={status} open={commentSectionOpen} profile={clientsProfile}/>
        </div>
    )
}

// Comment section
const Comments = ({status, open, profile}) => {
    if (!open) {
        return <></>
    }

    return (
        <div className={styles.commentsContainer}>
            <hr className='m-2'></hr>
            {status.comments.map((comment)=>{
                <Comment comment={comment} />
            })}
            <NewComment status={status} profile={profile}/>
        </div>
    )
}

// Individual comments
const Comment = ({comment}) => {
    return (
        <></>
    )
}

// Write new comment
const NewComment = ({status, profile}) => {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    // Handle text box focused
    const handleFocused = () => {
        setIsFocused(true)
    }

    // Handle text box blurred
    const handleBlur = () => {
        setIsFocused(false)
    }

    // Handle text change
    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    // Publish comment
    const publishComment = () => {

    }

    return (
        <div className={styles.newCommentContainer}>
            <img src={profile.profilePictureUrl} alt="Profile picture" className={styles.commentSectionProfilePicture}></img>
            <div className={styles.commentInputContainer}>
                <input onSubmit={publishComment} onFocus={handleFocused} onBlur={handleBlur} type="text" value={text} placeholder="Submit your comment..." onChange={handleTextChange}></input>
                {isFocused && (
                    <FaArrowAltCircleUp size={24} className='me-1' color={'var(--accent-color)'}/>
                )}
            </div>
        </div>
    )
}

export default Posts