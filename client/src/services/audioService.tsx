
export const uploadAndAnalyzeAudio = async (data: FormData, apikey: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAndAnalyzeAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apikey}`
    },
    body: data
  })

  const result = await response.json();

  console.log(result);
}

export const uploadAudio = async (data: FormData) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAudio`, {
    method: "POST",
    body: data
  })

  const result = await response.json();

  console.log(result);
}