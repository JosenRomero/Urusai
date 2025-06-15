import { useState } from "react";
import { notificationMessageDefault } from "../consts/notificationMessageDefault";
import { NotificationMessage } from "../types/NotificationMessage";
import useGetFavoriteAudios from "../hooks/useGetFavoriteAudios";
import Notification from "../components/Notification";
import ShowAudios from "../components/ShowAudios";

const FavoriteAudiosPage = () => {
  const [notificationMessage, setNotificationMessage] = useState<NotificationMessage>(notificationMessageDefault);

  const updateNotification = (message: NotificationMessage) => setNotificationMessage(message);

  const { isLoaded, audios, updateAudios } = useGetFavoriteAudios({ updateNotification });

  return (
    <div className='md:w-2xl mx-auto flex flex-col gap-y-16 p-4'>
      <ShowAudios
        title={"My favorite audios"}
        audios={audios}
        isLoaded={isLoaded}
        IsMyList={true}
        myAllAudios={() => {}}
        updateMyAudios={updateAudios}
      />
      <Notification
        message={notificationMessage}
        notificationClose={ () => updateNotification(notificationMessageDefault) }
      />
    </div>
  )
}

export default FavoriteAudiosPage