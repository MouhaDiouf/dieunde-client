import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProducts } from '../../actions/actions';
import UserProduct from './UserProduct/UserProduct';

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
  const { userProducts, userProductsFetched } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getUserProducts(user.id));
  }, []);

  if (!userProductsFetched) {
    return 'Loading...';
  }
  if (!userProducts.length) {
    return "You don't have products. Create one";
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Your Products</Typography>

      <div className={classes.root}>
        {userProducts.map((product) => (
          <UserProduct {...product} />
        ))}
      </div>
    </Container>
  );
}

export default UserProducts;
