import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '300px',
  },
  image: {
    width: '100%',
    height: '200px',
  },
});
function ProduitSimilaire({ nom, description, catégorie, prix, images, id }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper>
        <img className={classes.image} src={images[0].url} alt={nom} />

        <Typography>{nom}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/produits/${id}`}
        >
          Voir
        </Button>
      </Paper>
    </Container>
  );
}

export default ProduitSimilaire;
