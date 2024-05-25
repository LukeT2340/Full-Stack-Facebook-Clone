import { useProfile } from "../hooks/useProfile"
import { useState } from "react"
import { FaTimes } from 'react-icons/fa'
import styles from '../styles/Chat.module.css'
import { Link } from 'react-router-dom'
import { useMessage } from "../hooks/useMessage"

// Chat box (messenging)
const Chat = ({clientProfile, recipientId}) => {
    const { profile: recipientProfile, isLoading: isRecipientProfileLoading } = useProfile(recipientId)
    const [text, setText] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const { messages, setMessages, isSending, errorSending, sendMessage, isFetching, errorFetching } = useMessage(recipientId)

    // Handle profile is loading or fetching messages
    if (isRecipientProfileLoading || !recipientProfile || isFetching) {
        return 
    }

    const handleSendMessage = () => {
        sendMessage(text)
        setText('')
      };
    

    return (
        isOpen && (
          <div className={styles.chatBox}>
            <div className={styles.chatHeader}>
              <Link to={`/profile/${recipientProfile._id}`} className={styles.recipientInfo}>
                <img src={recipientProfile.profilePictureUrl} alt="Profile picture" className={styles.profilePicture}></img>
                <h5>{`${recipientProfile.firstName} ${recipientProfile.lastName}`}</h5>
              </Link>
              <FaTimes onClick={() => setIsOpen(false)} className={styles.closeButton} />
            </div>
            <hr className="m-0 p-0"></hr>
            <div className={styles.chatBody}>
              {messages.map((msg, index) => (
                <Message key={index} message={msg} clientProfile={clientProfile} recipientProfile={recipientProfile} />
              ))}
            </div>
            <div className={styles.chatFooter}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )
      )
}

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

export default Chat