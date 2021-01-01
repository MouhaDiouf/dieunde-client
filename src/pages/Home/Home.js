import React from 'react';
import Produits from '../../components/Produits/Produits';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';

function Home({
  produits,
  setmaxprix,
  setminprix,
  setsearchcat,
  setsearchnom,
}) {
  return (
    <>
      <Hero />
      <Produits
        produits={produits}
        setminprix={setminprix}
        setmaxprix={setmaxprix}
        setsearchnom={setsearchnom}
        setsearchcat={setsearchcat}
      />
    </>
  );
}

export default Home;
