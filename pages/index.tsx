import type { NextPage, GetStaticProps } from 'next'
import { default as NextImage } from 'next/image'

import {
  SimpleGrid,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

import styles from '../styles/Home.module.css'
import { MainLayout } from '../src/shared/layouts'
import { pokeApi } from '../api/index'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list'
import PokemonCard from '../src/shared/components/DataDisplay/PokemonCard'

interface Props {
  pokemons: SmallPokemon[]
}
const Home: NextPage<Props> = ({ pokemons }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  // console.log(pokemons)

  return (
    <div className={styles.container}>
      <MainLayout title="Pokemons">
        <h1>eder el gosu</h1>

        {/* <SimpleGrid columns={4} spacing={10}>
          {pokemons.map((pokemon) => (
            <Box key={pokemon.id}>
              {pokemon.id} <span>{pokemon.name}</span>
              <NextImage
                src={pokemon.image}
                width={50}
                height={50}
                alt={pokemon.name}
              />
            </Box>
          ))}
        </SimpleGrid> */}
        <SimpleGrid columns={4} spacing={6}>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </SimpleGrid>
      </MainLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // must be async
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((e, i) => ({
    ...e,
    id: (i + 1).toString(),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
      i + 1
    }.png`,
  }))
  return {
    props: {
      pokemons,
    },
  }
}

export default Home
