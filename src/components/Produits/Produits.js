import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { produits } from '../../data';
import Grid from '@material-ui/core/Grid';
import Produit from './Produit/Produit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Produits() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  if (loading) {
    return 'Chargement produits...';
  }

  return (
    <Grid
      alignContent="center"
      alignItems="center"
      container
      className={classes.root}
      spacing={2}
    >
      {produits.map((produit) => {
        return <Produit key={produit.id} {...produit} />;
      })}
    </Grid>
  );
}

export default Produits;
