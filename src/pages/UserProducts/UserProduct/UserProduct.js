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
const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: '20px',
  },
  media: {
    height: 140,
  },
});
function UserProduct({ nom, image, id }) {
  const classes = useStyles();
  console.log(image.url);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image.url} title={nom} />
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
          Edit
        </Button>
        <Button size="small" color="secondary" variant="outlined">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserProduct;
