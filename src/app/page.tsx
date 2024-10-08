'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, SimpleGrid, Button, VStack, Center, Container } from '@chakra-ui/react'
import { getCharacters } from '../services/api'
import CharacterCard from '../components/CharacterCard'


export default function Home() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    fetchCharacters()
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(storedFavorites)
  }, [page])

  const fetchCharacters = async () => {
    const data = await getCharacters(page)
    setCharacters(data.results)
    setTotalPages(Math.ceil(data.count / 10))
  }

  const toggleFavorite = (name: string) => {
    const newFavorites = favorites.includes(name)
      ? favorites.filter(fav => fav !== name)
      : [...favorites, name];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }

  return (
    <Container maxW="container.xl" p={8}>
      <VStack spacing={8}>
      <Heading 
        as="h1" 
        size="2xl" 
        textAlign="center" 
        color="white" 
        className="main-heading"
      >
       STAR WARS 
      </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} width="100%">
          {characters.map((character: any) => (
            <Center key={character.url}>
              <CharacterCard 
                name={character.name} 
                url={character.url} 
              />
            </Center>
          ))}
        </SimpleGrid>
        <Box>
          <Button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1} 
            mt={10}
            mr={9}
            colorScheme="none"
            boxShadow="0 0 5px 3px rgb(255, 255, 255)"
          >
            Previous
          </Button>
          <Button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
            disabled={page === totalPages}
            colorScheme="none"
            mt={10}
            ml={9}
            boxShadow="0 0 5px 3px rgb(255, 255, 255)"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}