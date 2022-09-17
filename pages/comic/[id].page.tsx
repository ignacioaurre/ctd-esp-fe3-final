import React from 'react'
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import AccordionComponent from 'dh-marvel/components/accordion/accordion'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { Comic } from 'dh-marvel/features/comic.types'

type Items = {
    resourseURI: string,
    name: string,
}

type Characters = {
available: number,
collectionURI: string,
items: Items[] ,
returned: number,
}

type ComicDetailProps = {
    id: number,
    thumbnail: {
        path: string,
        extension: string,
    }
    pageCount: number,
    title: string,
    description: string,
    characters: Characters,
}

const ComicDetail: NextPage<ComicDetailProps> = ({id, thumbnail, pageCount, title, description, characters}: ComicDetailProps) => {

    const urlImage = thumbnail.path + '.' + thumbnail.extension;

  return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="Home" content="Home Page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Detalle del Comic"} >
                <Grid2 container spacing={2} direction='row' alignItems='center' justifyContent='center' marginTop='10px'>
                    <Grid2 xs={3}>
                            <Image src={urlImage} alt='Portada del comic' height={300} width={200}/>
                    </Grid2>
                    <Grid2 xs={3}>
                        <div>ComicDetail: {title}</div>
                    </Grid2>
                    <Grid2 xs={7}>
                        <AccordionComponent id={id} title="Descripcion" description={description}/> 
                    </Grid2>
                    <Grid2 xs={7}>
                        <AccordionComponent id={pageCount} title="Personajes" characters={characters}/> 
                    </Grid2>
                </Grid2>
            </BodySingle>
        </>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getComics(0,24);
    const comics: Comic[] = await response.data.results;
    const paths = comics.map(comic => ({
        params: {id: `${comic.id}`}
    }))
    return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps<ComicDetailProps> = async ({params}: GetStaticPropsContext<any>) => {
    const { id } = params;
    const response: Comic = await getComic(id);
      return {
        props:  { id: response.id, thumbnail: response.thumbnail, pageCount: response.pageCount, title: response.title, description: response.description, characters: response.characters } ,
      };
}


export default ComicDetail