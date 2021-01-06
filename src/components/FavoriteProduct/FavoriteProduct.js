import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeFavorite } from '../../actions/actions';
const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',

    margin: '10px 0',
  },
  img: {
    width: '100%',
  },
  textContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  favoriteTitle: {
    marginBottom: '20px',
  },
});

function FavoriteProduct({ nom, image, description, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const HandleRemoveFavorite = () => {
    const params = {
      user_id: user.id,
      produit_id: id,
    };
    dispatch(removeFavorite(params));
  };
  return (
    <Paper>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} sm={3}>
          <img className={classes.img} src={image.url} alt="nom" />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.textContent}>
          <Typography variant="h5" gutterBottom>
            {nom}
          </Typography>
          <ButtonGroup>
            <Button
              component={Link}
              to={`/produits/${id}`}
              color="primary"
              variant="contained"
            >
              Voir Produit
            </Button>
            <Button
              onClick={HandleRemoveFavorite}
              color="secondary"
              variant="contained"
            >
              Retirer Des Favoris
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FavoriteProduct;
