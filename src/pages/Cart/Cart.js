import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import FavoriteProduct from '../../components/FavoriteProduct/FavoriteProduct';
import { Link } from 'react-router-dom';
const useStyes = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  favoritesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  noFavorites: {
    textAlign: 'center',
  },
});
function Cart() {
  const { user } = useSelector((state) => state.userReducer);
  const { favorites } = useSelector((state) => state.products);
  const classes = useStyes();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getFavoritesOnLoad() {
      await dispatch(getFavorites(user.id));
      setLoading(false);
    }
    getFavoritesOnLoad();
  }, [dispatch, user.id]);

  if (loading) {
    return 'Loading';
  }
  if (favorites.length === 0) {
    return (
      <Container className={classes.noFavorites}>
        <Typography variant="h3">
          Vous n'avez pas de favoris pour le moment
        </Typography>
        <Button component={Link} to="/" color="primary" variant="contained">
          Retour
        </Button>
      </Container>
    );
  }
  return (
    <Container className={classes.root}>
      <Typography variant="h2">Your Favorites</Typography>
      <div className={classes.favoritesContainer}>
        {favorites.map((favorite, idx) => {
          return <FavoriteProduct {...favorite} key={idx} />;
        })}
      </div>
    </Container>
  );
}

export default Cart;
