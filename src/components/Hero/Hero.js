import { Button, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  hero: {
    height: '500px',
    background: 'yellow',
  },
});

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <Container maxWidth="lg">
        <h1>Bienvenue!</h1>
        <Button component={Link} to="/" variant="contained" color="primary">
          Voir Produits
        </Button>
      </Container>
    </div>
  );
}

export default Hero;
