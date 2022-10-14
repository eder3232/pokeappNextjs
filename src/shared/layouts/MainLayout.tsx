import React from 'react'

import Head from 'next/head'
import Navbar from '../components/Navigation/Navbar'

import { Box } from '@chakra-ui/react'

type Props = {
  children?: React.ReactNode
  title?: string
}
const origin = typeof window === 'undefined' ? '' : window.location.origin
const MainLayout = (props: Props) => {
  return (
    <>
      <Head>
        <title>{props.title || 'Pokeapp'}</title>
        <meta name="author" content="eder_3232" />
        <meta name="description" content="información sobre el pokémon xxx" />
        <meta name="description" content="XXX, pokemon, pokedex" />

        <meta
          property="og:title"
          content={`Información sobre el pokemon: ${props.title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre: ${props.title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner/png`} />
      </Head>
      <main>
        <Navbar />
        <Box mt={2}>{props.children}</Box>
      </main>
    </>
  )
}

export default MainLayout
