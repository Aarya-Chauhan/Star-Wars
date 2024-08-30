'use client'

import { Box, Heading, Text, VStack, Spinner, Image, Center, Divider,Card, CardBody} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getCharacterDetails, getCharacterImage, getMovieDetails } from '../services/api'


interface CharacterDetailsProps {
  id: string;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ id }) => {
  const [character, setCharacter] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [movies,setMovies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCharacterDetails()
  }, [id])

  const fetchMovies = async (filmUrls: string[]) => {
    const movieTitles = await Promise.all(
        filmUrls.map(async (url) => {
            const movie = await getMovieDetails(url)
            return movie.title
        })
    )
    setMovies(movieTitles)
}

  const fetchCharacterDetails = async () => {
    setLoading(true)
    try {
      const data = await getCharacterDetails(id)
      setCharacter(data)
      fetchMovies(data.films)
      const image = await getCharacterImage(data.name)
      setImageUrl(image || '../../../../public/starry-night.jpeg')
    } catch (error) {
      console.error('Error fetching character details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !character) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box px={8} display={'flex'} bg="rgba(0, 0, 0, 0.8)" borderRadius="lg" boxShadow="lg" flexDirection={'column'}>
        <VStack width={'90%'} flexDirection={'row'}  mx={'5%'} my={10} px={'5%'} boxShadow="0 0 20px  rgb(255, 255, 255, 0.75)" py={'2%'}  border="1px solid white" borderBottom={0} borderTop={0} borderRadius={10}>
            <Image
              src={imageUrl}
              alt={character.name}
              boxSize="300px"
              objectFit="contain"
              borderRadius={10}
              boxShadow="0 0 10px rgba(255, 255, 255, 0.5)"
            /> 
          <VStack display={'flex'} justifyContent={'flex-start'} >
            <VStack display={'inline-block'} width={'90%'}  textAlign={'left'} mx={7}>
              <Heading  color="white" fontSize={60}  >
                {character.name}
              </Heading>
            </VStack>
            <VStack  display={'flex'} flexDirection={'row'} width={'90%'}  textAlign={'left'} gap={19} > 
              <Text color="white" fontSize={20} ><strong>Height:</strong> {character.height} cm</Text>
              <Text color="white"  fontSize={20}><strong>Mass:</strong> {character.mass} kg</Text>
              <Text color="white"  fontSize={20}><strong>Hair Color:</strong> {character.hair_color}</Text>
              <Text color="white"  fontSize={20}><strong>Skin Color:</strong> {character.skin_color}</Text>
              <Text color="white"  fontSize={20}><strong>Eye Color:</strong> {character.eye_color}</Text>
              <Text color="white"  fontSize={20}><strong>Birth Year:</strong> {character.birth_year}</Text>
              <Text color="white"  fontSize={20}><strong>Gender:</strong> {character.gender}</Text>
            </VStack>
          </VStack>
        </VStack>
        <Divider my={5} />
        <VStack width={'100%'}  py={2}>
          <VStack width={'90%'} >
            <VStack display={'inline-block'} width={'100%'}  textAlign={'left'} >
              <Heading color="white" fontSize={30} m={2}>Movie Apperences : </Heading>
            </VStack>
          </VStack>
          <Card width={'90%'} display={'flex'} flexDirection={'row'} my={2} color="white" gap={10} flexWrap={'wrap'}>
          {movies.map((film: string) => (
            <CardBody fontSize={20} boxShadow="0 0 10px  rgb(255, 255, 255, 0.75)" borderRadius={10} key={film}>{film}</CardBody>
          ))}
          </Card>
        </VStack>
    </Box>
  )
}

export default CharacterDetails


