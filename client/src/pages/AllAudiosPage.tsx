import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { Audio } from "../types/Audio";
import { NotificationMessage } from "../types/NotificationMessage";
import { notificationMessageDefault } from "../consts/notificationMessageDefault";
import { getAllAudios } from "../services/audioService";
import Notification from "../components/Notification";
import ShowAudios from "../components/ShowAudios";

const AllAudiosPage = () => {
  const { getToken } = useAuth();
  const [audios, setAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<NotificationMessage>(notificationMessageDefault);
  
  useEffect(() => {

    const allAudios = async () => {

      try {

        const token = await getToken();
        if (!token) throw new Error("Missing required fields");

        const { allAudios, message } = await getAllAudios(token);

        setIsLoaded(true);

        if (message) throw new Error(message);

        setAudios(allAudios);
        
      } catch (error) {
        let msg = "Something went wrong."

        if (error instanceof Error) msg = error.message

        setNotificationMessage({
          text: msg,
          isError: true,
        }); 
      }

    }

    allAudios();

  }, [getToken]);

  return (
    <div className="sm:w-96 md:w-2xl mx-auto flex flex-col gap-y-16 p-4">
      <ShowAudios
        title="Latest audios added"
        audios={audios}
        isLoaded={isLoaded}
        IsMyList={false}
        myAllAudios={() => console.log("")}
      />
      <Notification
        message={notificationMessage}
        notificationClose={ () => setNotificationMessage(notificationMessageDefault) }
      />
    </div>
  )
}

export default AllAudiosPage