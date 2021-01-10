import React, { useState } from 'react';
import Produits from '../../components/Produits/Produits';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Pagination from '../../components/Pagination/Pagination';

function Home({
  produits,
  setmaxprix,
  setminprix,
  setsearchcat,
  setsearchnom,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  // get current post
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Hero />

      <Produits
        produits={currentProducts}
        setminprix={setminprix}
        setmaxprix={setmaxprix}
        setsearchnom={setsearchnom}
        setsearchcat={setsearchcat}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={produits.length}
        paginate={paginate}
      />
    </>
  );
}

export default Home;
