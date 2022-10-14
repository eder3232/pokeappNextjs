import React from 'react'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {
  id: number
}

const FavoritePokemon = ({ id }: Props) => {
  const router = useRouter()

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${id}`)
  }
  return (
    <Box key={id} sx={{ mx: 20, mt: 10 }} onClick={onFavoriteClicked}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt="imagen del pokemon"
        width={'100%'}
        height={'100%'}
      ></Image>
    </Box>
  )
}

export default FavoritePokemon
