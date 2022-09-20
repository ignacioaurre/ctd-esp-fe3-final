import { useEffect, useState } from 'react';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import type {NextPage} from 'next'
import Head from 'next/head'

import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Grid from 'dh-marvel/components/grid/grid';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

import { Comic } from 'dh-marvel/features/Types/comic.types';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import CircularIndeterminate from 'dh-marvel/components/loading/loading';

type homeProps = {
    comics: Comic[],
    count: number,
    total: number,
}

const Index: NextPage<homeProps> = ({comics, count, total}: homeProps) => {

    const [comicsPage, setComicsPage] = useState<Comic[]>(comics)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const limit = 12;

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setLoading(true)
        setPage(value);
    };

    const getComicsPage = async () => {
        const offset = limit*(page-1);
        const response = await fetch(`/api/comics?offset=${offset}`)
        const results = await response.json()
        setComicsPage(results)
        setLoading(false)
    }

    useEffect(() => {
        getComicsPage()
    },[page])

    return (
        <LayoutGeneral>
            <Head>
                <title>Home Page</title>
                <meta name="Home" content="Home Page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Todos los Cómics"}>
                <Stack alignItems='center' margin='20px'>
                    <Pagination count={Math.round(total/12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false} />
                </Stack>
                {loading ? 
                <CircularIndeterminate /> :
                    <Grid comics={comicsPage} ></Grid>
                }
                <Stack alignItems='center' margin='20px'>
                    <Pagination count={Math.round(total/12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false}/>
                </Stack>
            </BodySingle>
        </LayoutGeneral>
    )
}

export async function getStaticProps() {
    const response = await getComics(0, 12)
      return {
        props:  { 
            comics: response.data.results,
            count: response.data.count,
            total: response.data.total } ,
      };
}

export default Index
