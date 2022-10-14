import React from 'react'

import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { pokeApi } from '../../api'
import { MainLayout } from '../../src/shared/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { localFavorites } from '../../utils'

import confetti from 'canvas-confetti'

interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  // console.log(pokemon)
  const router = useRouter()
  // console.log(router.query)

  const [isInFavorites, setIsInFavorites] = React.useState(
    localFavorites.existInFavorites(pokemon.id)
  )

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -90,
        origin: {
          x: 0.5,
          y: 0.2,
        },
      })
    }
  }

  return (
    <MainLayout title={pokemon.name}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        // height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}
      >
        <Flex flex={1} bg="blue.200" alignItems={'center'}>
          <Image
            alt="imagen"
            width={300}
            height={300}
            // objectFit="cover"
            // boxSize="100%"
            src={pokemon.sprites.other?.dream_world.front_default}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            textTransform={'uppercase'}
          >
            {pokemon.name}
          </Heading>

          <Stack>
            <Heading as={'h4'} fontWeight={'medium'} fontSize={'2xl'}>
              Sprites
            </Heading>
            <Stack direction={'row'}>
              <Image src={pokemon.sprites.front_default} alt="front default" />
              <Image src={pokemon.sprites.back_default} alt="back default" />
            </Stack>
            <Stack direction={'row'}>
              <Image src={pokemon.sprites.front_shiny} alt="front shiny" />
              <Image src={pokemon.sprites.back_shiny} alt="back default" />
            </Stack>
          </Stack>

          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={isInFavorites ? 'white' : 'blue.400'}
              color={isInFavorites ? 'blue.400' : 'white'}
              // boxShadow={
              //   '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              // }
              // _hover={{
              //   bg: 'blue.500',
              // }}
              // _focus={{
              //   bg: 'blue.500',
              // }}
              onClick={onToggleFavorite}
            >
              {isInFavorites ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

//generacion dinamica de todos los posibles argumentos que el getstaticspros podra recibir
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name)

  // const { data } = await  // your fetch function here

  return {
    paths: pokemonNames.map((name) => ({
      params: {
        name: name,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`)
  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  }
  return {
    props: {
      pokemon: pokemon,
    },
  }
}
export default PokemonByNamePage
