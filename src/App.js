import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Connexion from './pages/Connexion/Connexion';
import { useEffect, useState } from 'react';
import { getAllProducts } from './actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import NouveauProduit from './pages/NouveauProduit/NouveauProduit';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Cart from './pages/Cart/Cart';

function App() {
  const [minprix, setminprix] = useState(0);
  const [maxprix, setmaxprix] = useState(20000);
  const [searchNom, setsearchnom] = useState('');
  const [searchcat, setsearchcat] = useState('');

  let produits = useSelector((state) => state.products);
  let produitsFilter = produits['produits'] ? [...produits['produits']] : [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (produits['produits']) {
    console.log(produits);
    produits = produits.produits[0];

    produitsFilter = produits.filter((produit) =>
      produit.nom.includes(searchNom)
    );
    produitsFilter = produits.filter((produit) =>
      produit.catégorie.includes(searchcat)
    );

    produitsFilter = produits.filter(
      (produit) => produit.prix >= minprix && produit.prix <= maxprix
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            produits={produitsFilter}
            setminprix={setminprix}
            setmaxprix={setmaxprix}
            setsearchnom={setsearchnom}
            setsearchcat={setsearchcat}
          />
        </Route>
        <Route exact path="/connexion">
          <Connexion />
        </Route>
        <Route exact path="/vendre-produit">
          <NouveauProduit />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/produits/:id">
          <ProductPage />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
