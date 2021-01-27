import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import ProduitSimilaire from './ProduitSimilaire/ProduitSimilaire';
const useStyles = makeStyles({
  root: {
    margin: '20px 0',
    padding: '50px 0',
  },
  carouselContainer: {
    padding: '20px 0',
  },
});
function ProduitsSimilaires({ similaires }) {
  let produits = useSelector((state) => state.products);
  const classes = useStyles();
  if (produits) {
    produits = produits.produits;
  } else {
    return 'chargement produits similaires';
  }
  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h4">Autres Voitures</Typography>

        <Carousel
          className={classes.carouselContainer}
          breakPoints={breakpoints}
        >
          {produits &&
            similaires.map((produitSimilaire, idx) => {
              const similaire = produits[0].find(
                (produit) => produit.id === produitSimilaire.id
              );

              return (
                <div key={idx}>
                  <ProduitSimilaire {...similaire} />
                </div>
              );
            })}
        </Carousel>
      </Container>
    </>
  );
}

export default ProduitsSimilaires;
