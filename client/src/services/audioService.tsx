import { AudioType } from "../types/enums";

export const getAllAudios = async (token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/all-audios`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const getAudios = async (userId: string, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/my-audios/userId/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const getAudio = async (audioId: string, token: string, audioType: AudioType) => {

  return await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/${audioType}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

}

export const getInfoAudio = async (audioId: string, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/infoAudio`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const uploadAndAnalyzeAudio = async (data: FormData, token: string, apikey: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/uploadAndAnalyzeAudio`, {
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

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/uploadAudio`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })

  return await response.json();

}

export const deleteAudio = async (audioId: string, token: string) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const addLike = async (audioId: string, token: string, audioType: AudioType) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/like/${audioType}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();
  
}

export const removeLike = async (audioId: string, token: string, audioType: AudioType) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/dislike/${audioType}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();
  
}

export const addFavorite = async (audioId: string, token: string, audioType: AudioType) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/favorite/${audioType}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();
  
}

export const removeFavorite = async (audioId: string, token: string, audioType: AudioType) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/removeFav/${audioType}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();
  
}

export const getFavoriteAudios = async (token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/favorite-audios`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const getComments = async (audioId: string, token: string) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/comments`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return await response.json();

}

export const addComment = async (audioId: string, token: string, data: FormData) => {

  const response =  await fetch(`${import.meta.env.VITE_APP_API_URL}/${audioId}/comment`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })

  return await response.json();
  
}
