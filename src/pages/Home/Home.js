import React, { useState } from 'react';
import Produits from '../../components/Produits/Produits';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Pagination from '../../components/Pagination/Pagination';
import ChoiceHome from '../../components/ChoiceHome/ChoiceHome';

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
      {/* 
      <Produits
        produits={currentProducts}
        setminprix={setminprix}
        setmaxprix={setmaxprix}
        setsearchnom={setsearchnom}
        setsearchcat={setsearchcat}
      /> */}
      {/* <Pagination
        productsPerPage={productsPerPage}
        totalProducts={produits.length}
        paginate={paginate}
      /> */}
      <ChoiceHome produits={produits} />
    </>
  );
}

export default Home;
