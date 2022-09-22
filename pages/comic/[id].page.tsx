import React from 'react'
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'

import AccordionComponent from 'dh-marvel/components/accordion/accordion'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { Comic } from 'dh-marvel/features/Types/comic.types'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import { selectComic } from 'context/actions';
import useOrder from 'context/useOrder';

type Items = {
    resourceURI: string,
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
    price: number,
    oldPrice: number,
    stock: number,
    format: string,
}

const ComicDetail: NextPage<ComicDetailProps> = ({id, thumbnail, pageCount, title, description, characters, price, oldPrice, stock, format}: ComicDetailProps) => {

    const router = useRouter();
    const { state, dispatch } = useOrder();

    const urlImage = thumbnail.path + '.' + thumbnail.extension;
    const buttonTxt = stock > 0 ? "Comprar" : "No hay stock disponible";

    const handleButton = () => {
        const comic = {img: urlImage, price, title}
        selectComic(dispatch, comic)
        router.push("/checkout")
    }

  return (
        <LayoutGeneral>
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
                        <Card sx={{ minWidth: 300 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {format}
                                </Typography>
                                <Typography variant="h6" component="div">
                                {title}
                                </Typography>
                                <Typography sx={{ mb: 1.5, textDecorationLine: "line-through" }} color="text.secondary">
                                { oldPrice != price ? `$${oldPrice}` : null}
                                </Typography>
                                <Typography variant="body1">
                                ${price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{width: "100%"}} disabled={stock == 0} size="large" variant="contained" onClick={handleButton}>{buttonTxt} </Button>
                            </CardActions>      
                        </Card>
                    </Grid2>
                    <Grid2 xs={7}>
                        <AccordionComponent id={id} title="Descripcion" description={description}/> 
                    </Grid2>
                    <Grid2 xs={7}>
                        <AccordionComponent id={pageCount} title="Personajes" characters={characters}/> 
                    </Grid2>
                </Grid2>
            </BodySingle>
        </LayoutGeneral>
  )
}

export const getServerSideProps: GetServerSideProps<ComicDetailProps> = async ({params}: GetServerSidePropsContext<any>) => {
    const { id } = params;
    const response: Comic = await getComic(id);
      return {
        props:  { id: response.id, thumbnail: response.thumbnail, pageCount: response.pageCount, title: response.title, description: response.description, characters: response.characters, price: response.price, oldPrice: response.oldPrice, stock: response.stock, format: response.format } ,
      };
}


export default ComicDetail