import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Connexion from './pages/Connexion/Connexion';

function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
