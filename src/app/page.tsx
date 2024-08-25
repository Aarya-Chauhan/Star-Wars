'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { getCharacters } from '../services/api'
import CharacterCard from '../components/CharacterCard'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchCharacters()
  }, [page])

  const fetchCharacters = async () => {
    const data = await getCharacters(page)
    setCharacters(data.results)
    setTotalPages(Math.ceil(data.count / 10))
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Star Wars Characters</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {characters.map((character: any) => (
          <CharacterCard key={character.url} name={character.name} url={character.url} />
        ))}
      </SimpleGrid>
      <Flex justify="center" mt={6}>
        <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} mr={2}>
          Previous
        </Button>
        <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  )
}