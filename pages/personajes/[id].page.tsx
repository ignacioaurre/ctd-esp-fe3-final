import React from 'react'
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

import AccordionComponent from 'dh-marvel/components/accordion/accordion'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box'
import Image from 'next/image'
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { Character } from 'dh-marvel/features/Types/character.types'

type Items = {
    resourceURI: string,
    name: string,
}

type Comics = {
    available: number,
    collectionURI: string,
    items: Items[] ,
    returned: number,
  }

type CharacterDetailProps = {
    id: number,
    name: string,
    thumbnail: {
        path: string,
        extension: string,
    }
    description: string,
    comics: Comics,
}

const CharacterDetail: NextPage<CharacterDetailProps> = ({id, name, thumbnail, description, comics}: CharacterDetailProps) => {

    const urlImage = thumbnail.path + '.' + thumbnail.extension;

  return (
        <LayoutGeneral>
            <Head>
                <title>Detalle del Personaje</title>
                <meta name="Detalle Personaje" content={name}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={name} >
                <Grid2 container spacing={10} direction={{md: "row", xs:"column"}} alignItems='center' justifyContent='center' marginTop='10px'>
                    <Grid2 xs={5} md={3} position="relative" height="300px">
                            <Image src={urlImage} alt='Portada del comic' layout='fill'/>
                    </Grid2>
                    <Grid2 xs={5} md={3} padding={{xs: "0px"}} margin={{xs: "10px"}}>
                        <div>{description}</div>
                    </Grid2>
                    <Grid2 xs={7} md={7} paddingTop={{xs: "20px"}}>
                        <AccordionComponent id={id} title="Comics"  characters={comics}/> 
                    </Grid2>
                </Grid2>
            </BodySingle>
        </LayoutGeneral>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getCharacters(0, 12);
    const characters: Character[] = await response.data.results;
    const paths = characters.map(char => ({
        params: {id: `${char.id}`}
    }))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<CharacterDetailProps> = async ({params}: GetStaticPropsContext<any>) => {
    const { id } = params;
    const response = await getCharacter(id);
    const character: Character = await response
      return {
        props:  { id: character.id, name: character.name, thumbnail: character.thumbnail, description: character.description, comics: character.comics} ,
      };
}


export default CharacterDetail