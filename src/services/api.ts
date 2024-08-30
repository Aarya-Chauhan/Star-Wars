import axios from 'axios'
import { clearScreenDown } from 'readline'

const api = axios.create({
  baseURL: 'https://swapi.py4e.com/api',
})

const visualGuideApi = axios.create({
  baseURL: 'https://akabab.github.io/starwars-api/api',
})



export const getCharacters = async (page = 1) => {
  try {
    const response = await api.get(`/people/?page=${page}`)
    return response.data
  } catch (error) {
    console.error('Error fetching characters:', error)
    throw error
  }
}

export const getCharacterDetails = async (id: string) => {
  try {
    const response = await api.get(`/people/${id}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching character details:', error)
    throw error
  }
}

export const getCharacterImage = async (name: string) => {
  try {
    const response = await visualGuideApi.get('/all.json')
    const character = response.data.find((char: any) => char.name.toLowerCase() === name.toLowerCase())
    return character ? character.image : null
  } catch (error) {
    console.error('Error fetching character image:', error)
    return null
  }
}


export const getMovieDetails = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}


export default api