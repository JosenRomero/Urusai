
export const getAllAudios = async (token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/all-audios`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const getAudios = async (userId: string, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/my-audios/userId/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const getAudio = async (audioId: string, token: string) => {

  return await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/${audioId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

}

export const uploadAndAnalyzeAudio = async (data: FormData, token: string, apikey: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAndAnalyzeAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-api-key": `${apikey}`
    },
    body: data
  })

  return await response.json();

}

export const uploadAudio = async (data: FormData, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/uploadAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })

  return await response.json();

}

export const deleteAudio = async (audioId: string, token: string) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/api/audio/${audioId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}