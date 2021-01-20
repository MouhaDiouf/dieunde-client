import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProducts } from '../../actions/actions';
import UserProduct from './UserProduct/UserProduct';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const useStyles = makeStyles({
  rootContainer: {
    textAlign: 'center',
  },

  validation: {
    display: 'flex',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
function UserProducts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const {
    userProducts,
    userProductsFetched,
    productDeleteSuccess,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getUserProducts(user.id));
  }, [dispatch, user.id, productDeleteSuccess]);

  if (!userProductsFetched) {
    return 'Loading...';
  }

  return (
    <Container maxWidth="lg" className={classes.rootContainer}>
      {productDeleteSuccess && (
        <AlertMessage message="Product deleted successfully" type="info" />
      )}
      <Typography variant="h5">Vos produits</Typography>
      {!userProducts.length ? (
        <Typography variant="h6">
          Vous n'avez pas de produits.{' '}
          <Link to="/vendre-produit"> Créer un nouveau produit</Link>
        </Typography>
      ) : (
        <Typography>
          <div>
            <div className={classes.validation}>
              {userProducts.map((product) => {
                if (product['confirmed?']) {
                  return <UserProduct {...product} />;
                }
              })}
            </div>

            <div>
              <Typography variant="h5">En attente de validation</Typography>
              <div className={classes.validation}>
                {userProducts.map((product) => {
                  if (!product['confirmed?']) {
                    return <UserProduct {...product} />;
                  }
                })}
              </div>
            </div>
          </div>
        </Typography>
      )}
    </Container>
  );
}

export default UserProducts;
