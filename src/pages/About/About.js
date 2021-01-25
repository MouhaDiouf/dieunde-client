import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    width: '50%',
    margin: '0 auto',
  },
});
function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2">A propos</Typography>
      <p>
        DakarVoitures.com est un fournisseurs de solutions et de marchés
        numériques pour l'industrie automobile à Dakar et au Sénégal. Nous
        relions les acheteurs de voitures aux vendeurs. Lancée en 2021 et basée
        à Fann, la société permet aux acheteurs de disposer de données, des
        ressources et des outils numériques nécessaires pour des décisions
        d'achat éclairées et une connexion transparente avec les vendeurs
        automobiles.
      </p>
    </div>
  );
}

export default About;
