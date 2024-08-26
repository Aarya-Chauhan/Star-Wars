'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react'
import { getCharacterDetails } from '../../../services/api'

export default function CharacterDetail({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<any>(null)

  useEffect(() => {
    if (params.id) {
      fetchCharacterDetails()
    }
  }, [params.id])

  const fetchCharacterDetails = async () => {
    const data = await getCharacterDetails(params.id)
    setCharacter(data)
  }

  if (!character) {
    return <Spinner />
  }

  return (
    <Box p={8}>
      <Heading mb={6}>{character.name}</Heading>
      <VStack align="start" spacing={4}>
        <Text><strong>Height:</strong> {character.height}</Text>
        <Text><strong>Mass:</strong> {character.mass}</Text>
        <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
        <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
        <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
        <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
        <Text><strong>Gender:</strong> {character.gender}</Text>
      </VStack>
      <Heading size="md" mt={8} mb={4}>Movies</Heading>
      <VStack align="start">
        {character.films.map((film: string) => (
          <Text key={film}>{film.split('/').filter(Boolean).pop()}</Text>
        ))}
      </VStack>
    </Box>
  )
}