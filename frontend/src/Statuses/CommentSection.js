import styles from "../styles/Statuses.module.css"
import Comment from './Comment'
import NewComment from "./NewComment"

// Comment section
const CommentSection = ({setComments, statusId, comments, open, profile}) => {
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

export default CommentSection