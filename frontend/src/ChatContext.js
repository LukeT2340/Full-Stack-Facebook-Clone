import { createContext, useState } from "react";

const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
    const [recipientId, setRecipientId] = useState(null)

    return (
    <ChatContext.Provider value={{recipientId, setRecipientId}}>
        {children}
    </ChatContext.Provider>
    )
}

export { ChatContext, ChatContextProvider }