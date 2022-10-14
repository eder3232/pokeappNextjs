import { Box, useColorModeValue, Text, Stack, Heading } from '@chakra-ui/react'
import React from 'react'
import { SmallPokemon } from '../../../../interfaces'
import { default as NextImage } from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  pokemon: SmallPokemon
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const router = useRouter()
  // console.log(pokemon)
  const onclick = () => {
    router.push(`/name/${pokemon.name}`)
  }
  return (
    <div>
      <Box
        key={pokemon.id}
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={bgColor}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        _hover={{ background: 'pink.100' }}
        onClick={onclick}
      >
        <Box rounded={'lg'} mt={-12} pos={'relative'} height={'230px'}>
          <NextImage
            src={pokemon.image}
            width={230}
            height={230}
            alt={pokemon.name}
          />
        </Box>

        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'}>
            {pokemon.id}
          </Text>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            fontWeight={'500'}
            textTransform={'uppercase'}
          >
            {pokemon.name}
          </Heading>
        </Stack>
      </Box>
    </div>
  )
}

export default PokemonCard
