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
import AdminPanel from './pages/AdminPanel/AdminPanel';
import AllUsers from './pages/AdminPanel/AllUsers/AllUsers';
import AllProductsAdmin from './pages/AdminPanel/AllProductsAdmin/AllProductsAdmin';
import SingleProductAdmin from './pages/AdminPanel/AllProductsAdmin/SingleProductAdmin/SingleProductAdmin';
import AllCars from './pages/AllCars/AllCars';
import { CloudinaryContext } from 'cloudinary-react';
import ConseilsVendeurAcheteur from './pages/ConseilsVendeurAcheteur/ConseilsVendeurAcheteur';
import About from './pages/About/About';

function App() {
  const [minprix, setminprix] = useState(0);
  const [maxprix, setmaxprix] = useState(10000000000);
  const [searchNom, setsearchnom] = useState('');
  const [searchcat, setsearchcat] = useState('Tout');

  let { produits, allProductsFetched, validateSuccess } = useSelector(
    (state) => state.products
  );
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
    if (user?.isadmin) {
      dispatch(getAllProducts(true));
    } else {
      dispatch(getAllProducts());
    }

    if (localStorage.user) {
      dispatch(connectUser());
    }
  }, [dispatch, user?.isadmin, validateSuccess]);

  if (allProductsFetched) {
    produits = produits[0];
    if (searchcat === 'Tout') {
      produitsFilter = produits;
    }
    produitsFilter = produits.filter(
      (produit) =>
        produit.nom.includes(searchNom) ||
        produit.description.toLowerCase().includes(searchNom.toLowerCase())
    );

    if (searchcat !== 'Tout') {
      produitsFilter = produitsFilter.filter((produit) =>
        produit.catégorie.toLowerCase().includes(searchcat.toLowerCase())
      );
    }
  }
  return (
    <Router>
      <>
        <CloudinaryContext cloudName="mouhamadou">
          {accountRemovalSuccess && (
            <AlertMessage
              message="Compte supprimé avec succès"
              type="success"
            />
          )}
          {logoutSuccess && (
            <AlertMessage
              message="Vous êtes déconnecté avec succès"
              type="success"
            />
          )}
          {signinSuccess && <AlertMessage message="Bon retour!" />}
          {signupSuccess && (
            <AlertMessage
              message="Compte créé avec succès. Vous devez l'activer maintenant par email"
              type="success"
            />
          )}
          {logoutSuccess && <Redirect to="/" />}

          {accountRemovalSuccess && <Redirect to="/" />}

          <Header />

          <Switch>
            {user?.isadmin && (
              <Route exact path="/admin-panel">
                <AdminPanel />
              </Route>
            )}
            {user?.isadmin && (
              <Route exact path="/admin/allusers">
                <AllUsers />
              </Route>
            )}
            {user?.isadmin && (
              <Route exact path="/admin/allproducts">
                <AllProductsAdmin />
              </Route>
            )}
            {user?.isadmin && (
              <Route exact path="/admin/product/:id">
                <SingleProductAdmin />
              </Route>
            )}

            <Route exact path="/">
              <Home
                produits={produitsFilter}
                setminprix={setminprix}
                setmaxprix={setmaxprix}
                setsearchnom={setsearchnom}
                setsearchcat={setsearchcat}
              />
            </Route>
            <Route exact path="/voitures">
              <AllCars />
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
            <Route exact path="/anti-fraude">
              <ConseilsVendeurAcheteur />
            </Route>
            <Route exact path="/à-propos">
              <About />
            </Route>
            <Route exact path="/vendre-voiture">
              <NouveauProduit />
            </Route>
            {user && (
              <>
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
        </CloudinaryContext>
      </>
    </Router>
  );
}

export default App;
