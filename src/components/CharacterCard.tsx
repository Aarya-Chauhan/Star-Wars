import { Box, Text, Button, Image, VStack, Icon, HStack, Spinner, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCharacterImage } from '../services/api'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface CharacterCardProps {
  name: string
  url: string
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, url }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const id = url.split('/').filter(Boolean).pop() || ''

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(id))

    const fetchImage = async () => {
      setIsLoading(true)
      const image = await getCharacterImage(name)
      setImageUrl(image)
      setIsLoading(false)
    }
    fetchImage()
  }, [id, name])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((favId: string) => favId !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      favorites.push(id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md" 
      width="100%" 
      maxWidth="300px"
      height="400px"
      paddingTop={5}
      display="flex"
      flexDirection="column"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.05)' }}
      bg="rgba(0, 0, 0, 0.7)"
    >
      <Box height="250px" width="100%" position="relative">
        {isLoading ? (
          <Center height="100%">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <Image 
            src={imageUrl} 
            alt={name} 
            objectFit="contain"
            width="100%"
            height="100%"
          />
        )}
      </Box>
      <VStack spacing={4} p={4} flex={1} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" textAlign="center" noOfLines={2} color="white">{name}</Text>
        <HStack width="100%" spacing={7} justifyContent="space-between">
          <Link href={`/character/${id}`} style={{ flexGrow: 1 }}>
            <Button colorScheme="blue" width="100%">View Details</Button>
          </Link>
          <Icon
            as={isFavorite ? FaHeart : FaRegHeart}
            color={isFavorite ? "red.500" : "gray.400"}
            boxSize={9}
            cursor="pointer"
            onClick={toggleFavorite}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default CharacterCard