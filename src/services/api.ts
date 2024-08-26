import axios from 'axios'

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
})

export const getCharacters = async (page = 1) => {
  const response = await api.get(`/people/?page=${page}`)
  return response.data
}

export const getCharacterDetails = async (url: string) => {
  // Remove the base URL from the character's full URL
  const characterPath = url.replace('https://swapi.dev/api', '')
  const response = await api.get(characterPath)
  return response.data
}

export default api