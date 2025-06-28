import { MessageContextType } from "../types/MessageContextType";
import { notificationMessageDefault } from "./notificationMessageDefault";

export const messageContextDefault: MessageContextType = {
  message: notificationMessageDefault,
  updateMessage: () => {},
}