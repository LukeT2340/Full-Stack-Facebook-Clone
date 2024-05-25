import { FaHeart, FaLaugh, FaThumbsUp, FaComment, FaShare, FaArrowAltCircleUp, FaCaretRight } from 'react-icons/fa';
import styles from "../styles/Statuses.module.css"
import { useFetchStatuses } from "../hooks/useFetchStatuses"
import { useProfile } from "../hooks/useProfile"
import { useLikeStatus } from '../hooks/useLikeStatus'
import { useState } from 'react'
import { useComment } from '../hooks/useComment'
import { Link } from 'react-router-dom';

// This component displays recent statuses
const Statuses = ({clientProfile, pageProfile, onlyFetchOwnStatuses}) => {
    const { statuses, areStatusesLoading } = useFetchStatuses(20, 1, onlyFetchOwnStatuses ? pageProfile._id : null) // Fetch 20 statuses
    if (areStatusesLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className="d-flex flex-column mb-3 w-100">
            {statuses && statuses.map((status) => (
                <Status key={status._id} status={status} clientsProfile={clientProfile} />
            ))}
        </div>
    )
}

// Individual posts
const Status = ({status, clientsProfile}) => {
    const { profile: posterProfile, isProfileLoading: isPosterProfileLoading } = useProfile(status.userId) // Fetch profile of person who's post it is
    const { profile: recipientProfile, isProfileLoading: isRecipientProfileLoading } = useProfile(status.recipientUserId) // Fetch profile of person who's post it is
    const { unlikeStatus, likeStatus, isLiked, isLoading } = useLikeStatus(status._id) 
    const [likeCount, setLikeCount] = useState(status.likes.length)
    const [commentSectionOpen, setCommentSectionOpen] = useState(status.comments.length > 0)
    const [comments, setComments] = useState(status.comments)

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

    if (isPosterProfileLoading || isLoading|| isRecipientProfileLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`${styles.postContainer}`}>
            <div className={`d-flex`}>
                <Link to={`/profile/${posterProfile._id}`}>
                    <img className={styles.profilePicture} src={posterProfile.profilePictureUrl}></img>
                </Link>
                <div className={`${styles.nameAndDateContainer}`}>
                        <div className='d-flex flex-wrap align-items-center '>
                            <Link to={`/profile/${posterProfile._id}`} className={styles.nameLink}>
                                <h6 className={styles.name}>{`${posterProfile.firstName} ${posterProfile.lastName}`}</h6>
                            </Link>
                            {recipientProfile && recipientProfile._id != posterProfile._id && (
                                <>
                                    <FaCaretRight />
                                    <Link to={`/profile/${recipientProfile._id}`} className={styles.nameLink}>
                                        <h6 className={styles.name}>{`${recipientProfile.firstName} ${recipientProfile.lastName}`}</h6>
                                    </Link>
                                </>
                            )}
                        </div>
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
                    <button className={styles.commentCount} onClick={handleCommentButtonClicked}>{`${status.comments.length} comments`}</button>
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
            <Comments setComments={setComments} statusId={status._id} comments={comments} open={commentSectionOpen} profile={clientsProfile}/>
        </div>
    )
}

// Comment section
const Comments = ({setComments, statusId, comments, open, profile}) => {
    if (!open) {
        return <></>
    }

    return (
        <div className={styles.commentsContainer}>
            <hr className='m-2'></hr>
            {comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />;
            })}
            <NewComment setComments={setComments} statusId={statusId} profile={profile}/>
        </div>
    )
}

// Individual comments
const Comment = ({comment}) => {
    const { profile, isProfileLoading } = useProfile(comment.userId) // Fetch profile of person who's comment it is

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

    if (isProfileLoading) {
        return (
            <div className={styles.commentContainer}>Loading...</div>
        )
    }

    return (
        <div className={styles.commentContainer}>
            <Link to={`/profile/${profile._id}`}>
                <img src={profile.profilePictureUrl} alt="Profile picture" className={styles.commentSectionProfilePicture}></img>
            </Link>
            <div>
                <div className={styles.nameAndCommentTextContainer}>
                    <Link to={`/profile/${profile._id}`} className={styles.nameLink}>
                        <p className={styles.commenterName} >{profile.firstName} {profile.lastName}</p>
                    </Link>
                    <p>{comment.text}</p>
                </div>
                <p className={styles.commentDateTime}>{userFriendlyDate(comment.createdAt)}</p>
            </div>
        </div>
    )
}

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

export default Statuses