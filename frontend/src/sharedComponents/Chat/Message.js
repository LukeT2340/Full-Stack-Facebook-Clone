import styles from './Chat.module.css'

// Individual message
const Message = ( {message, clientProfile, recipientProfile} ) => {

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
  
      // Get today's day
      const todaysDate = new Date();
      const todaysDay = todaysDate.getDate();

      if (day === todaysDay) {
        return `${hours}:${minutes}`
      }

      return `${day} ${month} at ${hours}:${minutes}`;
  }

  return (
    <div className="d-flex flex-column">
      <div className={styles.timestamp}>
        <p>{userFriendlyDate(message.createdAt)}</p>
      </div>
      <div className={styles.messageContainer}>
        {message.senderId === clientProfile._id ? (
          <div className={`${styles.clientMessage} ms-auto`}>
            <p>{message.text}</p>
          </div>
        ) : (
          <div className={`${styles.theirMessage} me-auto`}>
            <img className={styles.smallProfilePicture} alt="Profile picture" src={recipientProfile.profilePictureUrl}></img>
            <p>{message.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message