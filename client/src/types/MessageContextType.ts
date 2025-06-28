import { NotificationMessage } from "./NotificationMessage";

export interface MessageContextType {
  message: NotificationMessage;
  updateMessage: (value: NotificationMessage) => void
}