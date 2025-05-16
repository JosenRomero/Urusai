import { Audio } from "../types/Audio"

interface Props {
  title: string,
  audios: Audio[],
  isLoaded: boolean
}

const ShowAudios = ({ title, audios, isLoaded }: Props) => {

  const getAudioDate = (date: string) => {

    return new Date(date).toLocaleString("en", { 
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    
  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>

      <div className='mt-5'>
        {!isLoaded ? (
          <div className="loader mx-auto"></div>
        ) : (
          <table className="w-full text-xl text-left rtl:text-right text-slate-800">
            <tbody>
              {audios.map((audio) => {
                return (
                  <tr className="border-b border-gray-200" key={audio._id}>
                    <td className="px-6 py-4">{audio.title}</td>
                    <td className="px-6 py-4">{getAudioDate(audio.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ShowAudios