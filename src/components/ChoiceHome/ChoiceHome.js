import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './ChoiceHome.css';
import Carousel from 'react-elastic-carousel';
import Slider from 'react-slick';
import { logos } from '../../data';
import loading from '../../images/loading.gif';

import React from 'react';
import Produit from '../Produits/Produit/Produit';
import { DriveEtaRounded, MonetizationOnOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: 'ease-in-out',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'column',
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
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: '',
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
  choiceIcon: {
    fontSize: '50px',
    color: 'green',
    margin: ' 20px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: '20px 0',
  },
  loadingImg: {
    width: '100px',
  },
}));
function ChoiceHome({ produits }) {
  const { user } = useSelector((state) => state.userReducer);
  const { fetchingAllProducts } = useSelector((state) => state.products);

  const classes = useStyles();
  if (!produits) {
    return 'Chargement...';
  }
  const marquesDispo = [
    ...new Set(
      produits.map((produit) => {
        if (produit.marque) return produit.marque;
      })
    ),
  ];
  const dernieresVoitures = produits.slice(0, 9);
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Je veux...
        </Typography>

        <Grid container spacing={4} className={classes.grid}>
          <Grid item xs={12} md={4} sm={6}>
            <Paper
              className={`${classes.paper} ${classes.acheterVoiture}`}
              component={Link}
              to="/voitures"
            >
              <DriveEtaRounded className={classes.choiceIcon} />
              <Typography variant="h5">Acheter Une Voiture</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Paper
              className={`${classes.paper} ${classes.vendreVoiture} vendreContainer`}
              component={Link}
              to={user ? '/vendre-voiture' : '/connexion'}
            >
              <MonetizationOnOutlined className={classes.choiceIcon} />
              <Typography variant="h5">Vendre Ma Voiture</Typography>
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.lastCars}>
          <Typography variant="h4">Dernières Voitures</Typography>
          {fetchingAllProducts && (
            <div className={classes.loadingDiv}>
              <Typography variant="h5">Patientez ...</Typography>
              <img
                src={loading}
                className={classes.loadingImg}
                alt="Chargement dernières voitures"
              />
            </div>
          )}

          {!fetchingAllProducts && (
            <Carousel
              className={classes.carouselContainer}
              breakPoints={breakpoints}
            >
              {dernieresVoitures &&
                dernieresVoitures.map((produit) => {
                  return <Produit {...produit} />;
                })}
            </Carousel>
            // <Slider {...settings} className={classes.carouselContainer}>
            //   {dernieresVoitures &&
            //     dernieresVoitures.map((produit) => {
            //       return <Produit {...produit} />;
            //     })}
            // </Slider>
          )}
        </div>
        <div>
          <Typography variant="h4">Marques disponibles</Typography>
          <div className={classes.logosContainer}>
            {marquesDispo.map((marque, idx) => (
              <img
                className={classes.marque}
                src={logos[marque]}
                alt={`logo ${marque}`}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoiceHome;
