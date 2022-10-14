import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import { localFavorites } from '../../utils'

import { MainLayout } from '../../src/shared/layouts'
import NoFavorites from '../../src/shared/components/DataDisplay/NoFavorites'
import Image from 'next/image'
import FavoritePokemon from '../../src/shared/components/DataDisplay/FavoritePokemon'

type Props = {}

const FavoritesPage = (props: Props) => {
  const [favoritesPokemons, setFavoritesPokemons] = React.useState<number[]>([])
  React.useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons())
  }, [])

  return (
    <MainLayout title="Favoritos">
      {favoritesPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <SimpleGrid spacing={6} minChildWidth="120px">
          {favoritesPokemons.map((id) => (
            <FavoritePokemon key={id} id={id} />
          ))}
        </SimpleGrid>
      )}
    </MainLayout>
  )
}

export default FavoritesPage
