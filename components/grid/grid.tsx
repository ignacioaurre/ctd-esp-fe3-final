import React, { FC } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Comic } from 'dh-marvel/features/comic.types';
import ComicCard from '../comicCard/comicCard';

interface Props {
    comics: Comic[],
}

const Grid: FC<Props> = ({comics}) => {
  return (
    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
  {comics.map((comic, index) => (
    <Grid2 xs={12} sm={4} md={4} key={index}>
            <ComicCard title={comic.title} img={comic.thumbnail.path + "." + comic.thumbnail.extension} id={comic.id}/>
    </Grid2>
  ))}
</Grid2>
  )
}

export default Grid;