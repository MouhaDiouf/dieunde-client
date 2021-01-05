import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import ProduitSimilaire from './ProduitSimilaire/ProduitSimilaire';
const useStyles = makeStyles({
  root: {
    margin: '20px 0',
    padding: '100px 0',
  },
});
function ProduitsSimilaires({ similaires }) {
  let produits = useSelector((state) => state.products);
  const classes = useStyles();
  if (produits) {
    produits = produits.produits;
  } else {
    return 'fetching similaires';
  }
  return (
    <>
      <Typography variant="h3">Produits Similaires</Typography>

      <Container maxWidth="lg" className={classes.root}>
        <Carousel itemsToShow={3}>
          {produits &&
            similaires.map((produitSimilaire) => {
              const similaire = produits[0].find(
                (produit) => produit.id === produitSimilaire.id
              );

              return (
                <div>
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
