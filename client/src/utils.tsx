
export const getAudioDate = (date: string) => {

  return new Date(date).toLocaleString("en", { 
    year: "numeric",
    month: "long",
    day: "numeric"
  })
    
}