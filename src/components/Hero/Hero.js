import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  hero: {
    height: '300px',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <Container maxWidth="xl">
        <Typography className={classes.title} variant="h3">
          Bienvenue!
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Voir Produits
        </Button>
      </Container>
    </div>
  );
}

export default Hero;
