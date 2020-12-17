import React from 'react';
import Produits from '../../components/Produits/Produits';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <h1>Bienvenue!</h1>
        <Button component={Link} to="/" variant="contained" color="primary">
          Voir Produits
        </Button>
      </Container>
      <Produits />
    </>
  );
}

export default Home;
