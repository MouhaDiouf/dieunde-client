import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Produit from './Produit/Produit';
import Search from '../Search/Search';

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

function Produits({
  produits,
  setmaxprix,
  setminprix,
  setsearchcat,
  setsearchnom,
}) {
  const classes = useStyles();
  if (!produits.length) {
    return 'Chargement produits...';
  }

  return (
    <>
      <Search
        produits={produits}
        setminprix={setminprix}
        setmaxprix={setmaxprix}
        setsearchnom={setsearchnom}
        setsearchcat={setsearchcat}
      />

      <Grid
        alignContent="center"
        alignItems="center"
        container
        className={classes.root}
        spacing={4}
      >
        {produits.map((produit) => {
          console.log('proudit is ', produit);

          return (
            <Grid item>
              <Produit key={produit.id} {...produit} />;
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Produits;
