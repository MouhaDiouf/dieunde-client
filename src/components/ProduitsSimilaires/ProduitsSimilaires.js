import { Container, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-elastic-carousel';
import ProduitSimilaire from './ProduitSimilaire/ProduitSimilaire';
function ProduitsSimilaires({ similaires }) {
  return (
    <Container maxWidth="lg">
      <Typography>Produits Similaires</Typography>
      <Carousel>
        {similaires.map((produitSimilaire) => (
          <div>
            <ProduitSimilaire {...produitSimilaire} />
          </div>
        ))}
      </Carousel>
    </Container>
  );
}

export default ProduitsSimilaires;
