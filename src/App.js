import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Connexion from './pages/Connexion/Connexion';
import { useEffect } from 'react';
import { getAllProducts } from './actions/actions';
import { useDispatch } from 'react-redux';
import NouveauProduit from './pages/NouveauProduit/NouveauProduit';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/connexion">
          <Connexion />
        </Route>
        <Route exact path="/vendre-produit">
          <NouveauProduit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
