import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

type comicCardProps = {
    id: number,
    title: string,
    img: string,
}

const ComicCard: FC<comicCardProps> = ({id, title, img}: comicCardProps) => {

  const router = useRouter()

  const goToDetail = () => {
    router.push(`/comic/${id}`)
  }

  return (
    <Card>
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
        <Button size="small" onClick={goToDetail}>Ver Detalle</Button>
      </CardActions>
    </Card>
  );
}

export default ComicCard;