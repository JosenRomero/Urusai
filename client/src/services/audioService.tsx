
export const uploadAndAnalyzeAudio = async (data: FormData, token: string, apikey: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAndAnalyzeAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-api-key": `${apikey}`
    },
    body: data
  })

  const result = await response.json();

  console.log(result);
}

export const uploadAudio = async (data: FormData, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })

  const result = await response.json();

  console.log(result);
}