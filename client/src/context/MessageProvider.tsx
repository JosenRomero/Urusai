import { ReactNode, useState } from "react"
import MessageContext from "./MessageContext"
import { NotificationMessage } from "../types/NotificationMessage";
import { notificationMessageDefault } from "../consts/notificationMessageDefault";

interface Props {
  children: ReactNode
}

export const MessageProvider = ({ children }: Props) => {

  const [ message, setMessage] = useState<NotificationMessage>(notificationMessageDefault);

  const updateMessage = (value: NotificationMessage) => setMessage(value);

  return (
    <MessageContext.Provider
      value={{ message, updateMessage }}
    >
      {children}
    </MessageContext.Provider>
  )

}