import { toast, ToastOptions } from "react-toastify";
import { NotificationMessage } from "../types/NotificationMessage";

interface Props {
  message: NotificationMessage
  notificationClose(): void
}

const Notification = ({ message, notificationClose }: Props) => {

  const showError = () => {

    const options: ToastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      toastId: "customId",
      onClose: () => notificationClose()
    }

    if (!message.isError) {
      toast.success(message.text, options);
    } else {
      toast.error(message.text, options);
    }

  }

  if (message.text === "") return

  return (
    <>
      { showError() }
    </>
  )
}

export default Notification