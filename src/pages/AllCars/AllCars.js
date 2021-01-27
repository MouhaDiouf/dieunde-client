import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Produit from '../../components/Produits/Produit/Produit';
import Carousel from 'react-elastic-carousel';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];
const useStyles = makeStyles({
  carouselContainer: {
    margin: '20px 0',
  },
  AllCarsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
  noResult: {
    textAlign: 'center',
  },
  selection: {
    textAlign: 'center',
    marginTop: '20px',
  },
  allCarsTitle: {
    textAlign: 'center',
  },
});

function AllCars() {
  const classes = useStyles();
  const [voitures, setvoitures] = useState(null);
  const [loading, setloading] = useState(true);
  const [minPrix, setminPrix] = useState(0);
  const [maxPrix, setmaxPrix] = useState(0);
  const [searchmarque, setsearchmarque] = useState('');
  const [searchnom, setsearchnom] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);

  // get current post

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/produits`).then((res) => {
        if (res.status === 200) {
          setvoitures(res.data);
          setloading(false);
        } else {
          return 'Error';
        }
      });
    } catch (error) {
      setloading(false);
      return 'Erreur';
    }
  }, []);
  if (loading) {
    return <h2>Chargement...</h2>;
  }
  let filterVoitures = [...voitures];

  // for (let i = 0; i < voitures.length; i++) {
  //   if (voitures[i].prix < minPrix) {
  //     setminPrix(voitures[i].prix);
  //   }
  // if (voitures[i].prix > maxPrix) {
  //   setmaxPrix(voitures[i].prix);
  // }

  filterVoitures = filterVoitures.filter((voiture) =>
    voiture.nom.toLowerCase().includes(searchnom.toLowerCase())
  );
  filterVoitures = filterVoitures.filter((voiture) =>
    voiture.marque.toLowerCase().includes(searchmarque.toLowerCase())
  );
  if (minPrix) {
    filterVoitures = filterVoitures.filter(
      (voiture) => voiture.prix >= minPrix
    );
  }
  if (maxPrix) {
    filterVoitures = filterVoitures.filter(
      (voiture) => voiture.prix <= maxPrix
    );
  }

  if (searchmarque === 'Toutes les marques') {
    filterVoitures = [...voitures];
  }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const voituresPerPage = filterVoitures.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <Container className={classes.container} fullWidth>
      <div className={classes.selection}>
        <Typography variant="h3">Notre Sélection</Typography>
        <Carousel
          className={classes.carouselContainer}
          breakPoints={breakpoints}
        >
          {voitures &&
            voitures.map((voiture, idx) => {
              if (voiture.inSelection) {
                return <Produit key={idx} {...voiture} />;
              }
            })}
        </Carousel>
      </div>
      <div className={classes.allCarsParent}>
        <Typography variant="h4" className={classes.allCarsTitle}>
          Toutes Les Voitures
        </Typography>
        <Search
          voitures={voitures}
          setsearchnom={setsearchnom}
          setsearchmarque={setsearchmarque}
          minPrix={minPrix}
          maxPrix={maxPrix}
          setminPrix={setminPrix}
          setmaxPrix={setmaxPrix}
        />

        {voituresPerPage.length === 0 && (
          <div className={classes.noResult}>
            <Typography>Aucun résultat pour vos recherches</Typography>
          </div>
        )}
        <div className={classes.AllCarsContainer}>
          {voituresPerPage.map((voiture, idx) => (
            <Produit key={idx} {...voiture} />
          ))}
        </div>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filterVoitures.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default AllCars;
