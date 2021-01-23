import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import benz from '../../images/brands/benz.png';
import landRover from '../../images/brands/landRover.png';
import { Link } from 'react-router-dom';
import './ChoiceHome.css';
import Carousel from 'react-elastic-carousel';
import { logos } from '../../data';

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
    width: '95%',
    margin: '0 auto',
  },
  logosContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    margin: '20px 0',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  vendreVoiture: {
    margin: '20px 0',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
    textDecoration: 'none',
  },
  marque: {
    width: '50px',
    height: '50x',
    objectFit: 'contain',
  },
  lastCars: {
    margin: '30px 0',
  },
  acheterVoiture: {
    margin: '20px 0',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'yello',
    },
  },

  acheter: {
    height: '100px',
    width: '100px',
    background: 'red',
    fontWeight: 'bold',
    fontSize: '30px',
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
  title: {
    margin: '20px 0',
  },
}));
function ChoiceHome({ produits }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Je veux...
        </Typography>

        <Grid container spacing={4} className={classes.grid}>
          <Grid item xs={12} md={4} sm={6}>
            <Paper
              className={`${classes.paper} ${classes.acheterVoiture}`}
              component={Link}
              to="/voitures"
            >
              Acheter Une Voiture
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Paper
              className={`${classes.paper} ${classes.vendreVoiture} vendreContainer`}
              component={Link}
              to="/vendre-produit"
            >
              Vendre Ma Voiture
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.lastCars}>
          <Typography variant="h4">Dernières Voitures</Typography>
          <Carousel
            className={classes.carouselContainer}
            breakPoints={breakpoints}
          >
            {produits &&
              produits.map((produit) => {
                return <Produit {...produit} />;
              })}
          </Carousel>
        </div>
        <div>
          <Typography variant="h4">Marques disponibles</Typography>
          <div className={classes.logosContainer}>
            {produits.map((produit) => (
              <img
                className={classes.marque}
                src={logos[produit.marque]}
                alt={`logo ${produit.marque}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoiceHome;
