import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Produit from './Produit/Produit';
import Search from '../Search/Search';
import { Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

  title: {
    textAlign: 'center',
  },
}));

function Produits({
  produits,
  setmaxprix,
  setminprix,
  setsearchcat,
  setsearchnom,
}) {
  const allProductsFetched = useSelector(
    (state) => state.products.allProductsFetched
  );

  const classes = useStyles();

  if (!produits.length && !allProductsFetched) {
    return 'Chargement produits...';
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Search
        produits={produits}
        setminprix={setminprix}
        setmaxprix={setmaxprix}
        setsearchnom={setsearchnom}
        setsearchcat={setsearchcat}
      />
      {produits.length ? (
        <>
          <Typography variant="h2" className={classes.title}>
            Produits
          </Typography>

          <Grid
            alignContent="center"
            alignItems="center"
            container
            className={classes.root}
            spacing={4}
          >
            {produits.map((produit) => {
              return (
                <Grid item>
                  <Produit key={produit.id} {...produit} />
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <h1>No results for your search</h1>
      )}
    </Container>
  );
}

export default Produits;
