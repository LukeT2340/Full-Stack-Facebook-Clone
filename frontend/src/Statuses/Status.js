import { useProfile } from "../hooks/useProfile"
import { useLikeStatus } from '../hooks/useLikeStatus'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaHeart, FaLaugh, FaThumbsUp, FaComment, FaShare, FaArrowAltCircleUp, FaCaretRight } from 'react-icons/fa';
import styles from "./Statuses.module.css"
import CommentSection from "./CommentSection";

// Individual status
const Status = ({ status, clientsProfile }) => {
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

    if (isPosterProfileLoading || isRecipientProfileLoading) {
        return (
            <></>
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
                    <button className={styles.commentCount} onClick={handleCommentButtonClicked}>
                    {status.comments.length === 1 ? 
                        `${status.comments.length} comment` : 
                        `${status.comments.length} comments` 
                    }</button>
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
            <CommentSection setComments={setComments} statusId={status._id} comments={comments} open={commentSectionOpen} profile={clientsProfile}/>
        </div>
    )
}

export default Status
