import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import ChoiceHome from '../ChoiceHome/ChoiceHome';
import hero from '../../images/hero.jpg';
const useStyles = makeStyles({
  hero: {
    height: '300px',
    backgroundImage: `linear-gradient( to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0,0.7)), url(${hero})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginBottom: '10px',
  },
});

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <Container maxWidth="xl">
        <Typography className={classes.title} variant="h3">
          Trouvez votre voiture à Dakar!
        </Typography>
        <Button
          component={Link}
          to="/voitures"
          variant="contained"
          color="primary"
          size="large"
        >
          Voir Voitures
        </Button>
      </Container>
    </div>
  );
}

export default Hero;
