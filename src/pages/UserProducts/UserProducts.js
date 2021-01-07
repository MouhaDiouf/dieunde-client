import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProducts } from '../../actions/actions';
import UserProduct from './UserProduct/UserProduct';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const useStyles = makeStyles({
  root: {
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
    <Container maxWidth="lg">
      {productDeleteSuccess && (
        <AlertMessage message="Product deleted successfully" />
      )}
      <Typography variant="h5">Your Products</Typography>
      {!userProducts.length ? (
        <Typography variant="h6">
          You don't have products.{' '}
          <Link to="/vendre-produit"> Create new ones</Link>
        </Typography>
      ) : (
        <Typography>
          <div className={classes.root}>
            {userProducts.map((product) => (
              <UserProduct {...product} />
            ))}
          </div>
        </Typography>
      )}
    </Container>
  );
}

export default UserProducts;
