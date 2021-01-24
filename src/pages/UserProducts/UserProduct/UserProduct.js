import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import DeleteProduct from './DeleteProduct';
const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: '20px',
  },
  media: {
    height: 140,
  },
});
function UserProduct({ nom, images, id }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={JSON.parse(images)[0].secure_url}
          title={nom}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nom}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          to={`/${nom}/${id}/edit`}
          size="small"
          color="primary"
          variant="outlined"
        >
          Modifier
        </Button>
        <DeleteProduct
          productName={nom}
          productImg={JSON.parse(images)[0]}
          id={id}
        />
      </CardActions>
    </Card>
  );
}

export default UserProduct;
