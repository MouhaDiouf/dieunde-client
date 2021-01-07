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
import UserProducts from './pages/UserProducts/UserProducts';
import EditProduct from './pages/EditProduct/EditProduct';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';
import AccountActivation from './pages/AccountActivation/AccountActivation';

function App(props) {
  const [minprix, setminprix] = useState(0);
  const [maxprix, setmaxprix] = useState(10000000000);
  const [searchNom, setsearchnom] = useState('');
  const [searchcat, setsearchcat] = useState('All');

  let { produits, allProductsFetched } = useSelector((state) => state.products);
  const {
    logoutSuccess,
    signinSuccess,
    signupSuccess,
    user,
    accountRemovalSuccess,
  } = useSelector((state) => state.userReducer);

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
      {accountRemovalSuccess && (
        <AlertMessage message="Account Removed Successfully" type="success" />
      )}
      {logoutSuccess && (
        <AlertMessage message="Logged Out Successfully" type="success" />
      )}
      {signinSuccess && <AlertMessage message="Welcome back!" />}
      {signupSuccess && (
        <AlertMessage
          message="Account Successfully Created. Confirm it by email to login"
          type="success"
        />
      )}
      {logoutSuccess && <Redirect to="/" />}

      {accountRemovalSuccess && <Redirect to="/" />}

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
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/new-password">
          <NewPassword />
        </Route>
        <Route exact path="/account-confirmation">
          <AccountActivation />
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
            <Route path="/:product/:id/edit">
              <EditProduct />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/:email/products">
              <UserProducts />
            </Route>
          </>
        )}

        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
