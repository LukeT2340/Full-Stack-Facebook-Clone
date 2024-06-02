import { ChatContext } from "../ChatContext";
import { useContext } from 'react';

export const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw Error("useChatContext must be used inside an ChatContext");
    }

    return context;
}
