'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, Text, VStack, Spinner, Image, Center } from '@chakra-ui/react'
import { getCharacterDetails, getCharacterImage } from '../../../services/api'

export default function CharacterDetail({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchCharacterDetails()
    }
  }, [params.id])

  const fetchCharacterDetails = async () => {
    const data = await getCharacterDetails(params.id)
    setCharacter(data)
    const image = await getCharacterImage(data.name)
    setImageUrl(image || '../../../../public/starry-night.jpeg')
  }

  if (!character) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <VStack p={8} spacing={6} align="center">
      <Image src={imageUrl} alt={character.name} boxSize="300px" objectFit="cover" />
      <Heading>{character.name}</Heading>
      <VStack align="center" spacing={4}>
        <Text><strong>Height:</strong> {character.height}</Text>
        <Text><strong>Mass:</strong> {character.mass}</Text>
        <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
        <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
        <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
        <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
        <Text><strong>Gender:</strong> {character.gender}</Text>
      </VStack>
      <Heading size="md">Movies</Heading>
      <VStack align="center">
        {character.films.map((film: string) => (
          <Text key={film}>{film.split('/').filter(Boolean).pop()}</Text>
        ))}
      </VStack>
    </VStack>
  )
}