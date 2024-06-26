import { useProfile } from "../../hooks/useProfile"
import { FaTimes } from 'react-icons/fa'
import styles from './Chat.module.css'
import { Link } from 'react-router-dom'
import { useMessage } from "../../hooks/useMessage"
import { useState, useEffect, useRef } from 'react';
import Message from "./Message"
import { useChatContext } from "../../hooks/useChatContext"

// Chat box (messenging)
const Chat = ({clientProfile}) => {
    const { recipientId } = useChatContext()
    const { profile: recipientProfile, isLoading: isRecipientProfileLoading } = useProfile(recipientId) // Get the other user's profile info
    const [text, setText] = useState('') 
    const [isOpen, setIsOpen] = useState(true)
    const { messages, markAsRead, sendMessage, isFetching} = useMessage(recipientId) // Retrieve previous messages
    const messagesEndRef = useRef(null)

    // Scroll to bottom whenever messages changes
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages, isOpen]);

    // Mark messages as read when chat is opened
    useEffect(() => {
      markAsRead()
    }, [isOpen])

    // If the user we are chatting with changes, open the chat
    useEffect(() => {
      setIsOpen(true)
    }, [recipientId])

    // Handle profile is loading or fetching messages
    if (isRecipientProfileLoading || !recipientProfile || isFetching) {
        return 
    }

    // Handle send message
    const handleSendMessage = () => {
        sendMessage(text)
        setText('')
      };
    

    return (
        isOpen ? (
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
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatFooter}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Aa"
                onKeyPress={(event) => event.key === 'Enter' && text.trim() != "" ? handleSendMessage() : null}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )
       : (
        <div className={styles.closedChatContainer}>
          <button onClick={() => setIsOpen(true)} className={styles.openChatButton}>
            <img src={recipientProfile.profilePictureUrl} alt="Profile picture" className={styles.closedChatProfilePicture}></img>
          </button>
        </div>
      )
    )
}

export default Chat