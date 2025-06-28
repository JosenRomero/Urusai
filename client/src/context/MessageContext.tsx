import { createContext } from "react";
import { MessageContextType } from "../types/MessageContextType";
import { messageContextDefault } from "../consts/messageContextDefault";

const MessageContext = createContext<MessageContextType>(messageContextDefault);

export default MessageContext;
