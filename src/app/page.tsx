'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, SimpleGrid, Button, VStack, Center, Container } from '@chakra-ui/react'
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
    <Container maxW="container.xl" p={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" color="white">
          Star Wars Characters
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} width="100%">
          {characters.map((character: any) => (
            <Center key={character.url}>
              <CharacterCard name={character.name} url={character.url} />
            </Center>
          ))}
        </SimpleGrid>
        <Box>
          <Button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1} 
            mr={4}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
            disabled={page === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}