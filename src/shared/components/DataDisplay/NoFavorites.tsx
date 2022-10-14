import React from 'react'

import { Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

type Props = {}

const NoFavorites = (props: Props) => {
  return (
    <div>
      <Container
        display="flex"
        flexDirection="column"
        height="calc(100vh - 100px)"
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
      >
        <Text fontSize="2xl">No hay favoritos</Text>
      </Container>
    </div>
  )
}

export default NoFavorites
