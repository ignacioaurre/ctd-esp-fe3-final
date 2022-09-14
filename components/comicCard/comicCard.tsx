import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type comicCardProps = {
    title: string,
    img: string,
}

const ComicCard: FC<comicCardProps> = ({title, img}: comicCardProps) => {
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardMedia
        component="img"
        height="300"
        image={img}
        alt="Foto portada del cómic"
      />
      <CardContent>
        <Typography variant="subtitle2" component="div">
        {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Comprar</Button>
        <Button size="small">Ver Detalle</Button>
      </CardActions>
    </Card>
  );
}

export default ComicCard;