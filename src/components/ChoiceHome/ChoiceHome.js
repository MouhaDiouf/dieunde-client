import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel';

import React from 'react';
import Produit from '../Produits/Produit/Produit';
const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  vendreVoiture: {
    background: 'red',
  },
  acheterVoiture: {
    background: 'green',
  },
  acheter: {
    height: '100px',
    width: '100px',
    background: 'red',
  },
  vendre: {
    height: '200px',
    width: '100px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
function ChoiceHome({ produits }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3">Je veux...</Typography>

        <Grid container spacing={4} className={classes.grid}>
          <Grid item xs={4}>
            <Paper className={`${classes.paper} ${classes.acheterVoiture}`}>
              Acheter Une Voiture
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={`${classes.paper} ${classes.vendreVoiture}`}>
              Vender Ma Voiture
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h3">Dernières Voitures</Typography>
        <Carousel
          className={classes.carouselContainer}
          breakPoints={breakpoints}
        >
          {produits &&
            produits.map((produit) => {
              return <Produit {...produit} />;
            })}
        </Carousel>
        <div>
          <Typography variant="h3">Les principales marques</Typography>
        </div>
      </div>
    </>
  );
}

export default ChoiceHome;
