import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { selectComic } from 'context/actions';
import useOrder from 'context/useOrder';

type comicCardProps = {
    id: number,
    title: string,
    img: string,
    price: number,
}

const ComicCard: FC<comicCardProps> = ({id, title, img, price}: comicCardProps) => {

  const { dispatch } = useOrder();

  const router = useRouter()

  const goToDetail = () => {
    router.push(`/comic/${id}`)
  }

  const goToCheckout = () => {
    const comic = {img, price, title}
    selectComic(dispatch, comic)
    router.push("/checkout")
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
        <Button size="small" onClick={goToCheckout}> Comprar</Button>
        <Button size="small" onClick={goToDetail}>Ver Detalle</Button>
      </CardActions>
    </Card>
  );
}

export default ComicCard;