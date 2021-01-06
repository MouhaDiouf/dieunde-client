import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Connexion from './pages/Connexion/Connexion';
import { useEffect, useState } from 'react';
import { connectUser, getAllProducts } from './actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import NouveauProduit from './pages/NouveauProduit/NouveauProduit';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Cart from './pages/Cart/Cart';
import SignUp from './pages/Signup/Signup';
import AlertMessage from './components/AlertMessage/AlertMessage';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';

function App(props) {
  const [minprix, setminprix] = useState(0);
  const [maxprix, setmaxprix] = useState(10000000000);
  const [searchNom, setsearchnom] = useState('');
  const [searchcat, setsearchcat] = useState('All');

  let { produits, allProductsFetched } = useSelector((state) => state.products);
  const { logoutSuccess, signinSuccess, signupSuccess, user } = useSelector(
    (state) => state.userReducer
  );

  let produitsFilter = produits ? [...produits] : [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    if (sessionStorage.user) {
      dispatch(connectUser());
    }
  }, [dispatch]);

  if (allProductsFetched) {
    produits = produits[0];
    if (searchcat === 'All') {
      produitsFilter = produits;
    }
    produitsFilter = produits.filter(
      (produit) =>
        produit.nom.includes(searchNom) ||
        produit.description.includes(searchNom)
    );

    if (searchcat !== 'All') {
      produitsFilter = produitsFilter.filter((produit) =>
        produit.catégorie.includes(searchcat)
      );
    }

    produitsFilter = produitsFilter.filter(
      (produit) => produit.prix >= minprix && produit.prix <= maxprix
    );
  }
  return (
    <Router>
      {logoutSuccess && (
        <AlertMessage message="Logged Out Successfully" type="success" />
      )}
      {signinSuccess && <AlertMessage message="Welcome back!" />}
      {signupSuccess && (
        <AlertMessage message="Account Successfully Created." type="success" />
      )}
      {logoutSuccess && <Redirect to="/" />}

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
        <Route exact path="/produits/:id">
          <ProductPage />
        </Route>
        {user && (
          <>
            <Route exact path="/vendre-produit">
              <NouveauProduit />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        )}

        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
