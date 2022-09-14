import { useEffect, useState } from 'react';
import type {NextPage} from 'next'
import Head from 'next/head'

import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Grid from 'dh-marvel/components/grid/grid';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

import { Comic } from 'dh-marvel/features/comic.types';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

type homeProps = {
    comics: Comic[],
    count: number,
    total: number,
}

const Index: NextPage<homeProps> = ({comics, count, total}: homeProps) => {

    const [comicsPage, setComicsPage] = useState<Comic[]>(comics)
    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // const getComicsPage = async () => {
    //     const response = await fetch(`http://localhost:3000/api/comics?offset=${limit*(page-1)}`)
    //     const results = await response.json()
    //     setComicsPage(results.data.results)
    // }

    // useEffect(() => {
    //     getComicsPage()
    // },[page])

    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="Home" content="Home Page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Todos los Cómics"}>
                <Stack alignItems='center' margin='20px'>
                    <Pagination count={Math.round(total/12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false} />
                </Stack>
                <Grid comics={comicsPage} ></Grid>
                <Stack alignItems='center' margin='20px'>
                    <Pagination count={Math.round(total/12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false}/>
                </Stack>
            </BodySingle>
        </>
    )
}

export async function getStaticProps() {
    const response = await getComics(0, 12)
      return {
        props:  { comics: response.data.results, count: response.data.count, total: response.data.total } ,
      };
  }

export default Index
