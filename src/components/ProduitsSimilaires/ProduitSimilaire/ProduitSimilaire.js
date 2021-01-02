import { Container, Typography } from '@material-ui/core';
import React from 'react';

function ProduitSimilaire({ nom, description, catégorie, prix }) {
  return (
    <Container>
      <Typography>{nom}</Typography>
    </Container>
  );
}

export default ProduitSimilaire;
