import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Produit from '../../components/Produits/Produit/Produit';
import Carousel from 'react-elastic-carousel';
const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];
const useStyles = makeStyles({
  carouselContainer: {
    margin: '20px 0',
  },
  AllCarsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
function AllCars() {
  const classes = useStyles();
  const [voitures, setvoitures] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    try {
      axios.get('http://localhost:3001/produits').then((res) => {
        console.log(res);
        if (res.status === 200) {
          setvoitures(res.data);
          setloading(false);
        } else {
          return 'Error';
        }
      });
    } catch (error) {
      setloading(false);
      return 'Erreur';
    }
  }, []);
  if (loading) {
    return <h2>Chargement...</h2>;
  }
  return (
    <Container>
      <div className={classes.selection}>
        <Typography variant="h5">Notre Sélection</Typography>
        <Carousel
          className={classes.carouselContainer}
          breakPoints={breakpoints}
        >
          {voitures &&
            voitures.map((voiture) => {
              return <Produit {...voiture} />;
            })}
        </Carousel>
      </div>
      <Typography>Toutes Les Voitures</Typography>
      <div className={classes.AllCarsContainer}>
        {voitures.map((voiture) => (
          <Produit {...voiture} />
        ))}
      </div>
    </Container>
  );
}

export default AllCars;
