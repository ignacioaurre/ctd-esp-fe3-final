import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

import AccordionComponent from 'dh-marvel/components/accordion/accordion'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image'
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { Character } from 'dh-marvel/features/Types/character.types'
import { Comic } from 'dh-marvel/features/Types/comic.types'

type Items = {
    resourseURI: string,
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
        <>
            <Head>
                <title>Detalle del Personaje</title>
                <meta name="Home" content="Detalle del Personaje"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Detalle del Personaje"} >
                <Grid2 container spacing={2} direction='row' alignItems='center' justifyContent='center' marginTop='10px'>
                    <Grid2 xs={3}>
                            <Image src={urlImage} alt='Portada del comic' height={300} width={200}/>
                    </Grid2>
                    <Grid2 xs={3}>
                        <div>CharacterDetail: {}</div>
                    </Grid2>
                    <Grid2 xs={7}>
                        <AccordionComponent id={2} title="Comics"  characters={comics}/> 
                    </Grid2>
                </Grid2>
            </BodySingle>
        </>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getCharacters(0, 12);
    const characters: Character[] = await response.data.results;
    const paths = characters.map(char => ({
        params: {id: `${char.id}`}
    }))
    return {paths, fallback: false}
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