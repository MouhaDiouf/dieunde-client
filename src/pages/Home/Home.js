import React from 'react';
import Hero from '../../components/Hero/Hero';
import ChoiceHome from '../../components/ChoiceHome/ChoiceHome';

function Home({ produits }) {
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
