import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function UserProducts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getUserProducts(user.id));
  });
  return (
    <Container>
      <Typography>Your Products</Typography>
    </Container>
  );
}

export default UserProducts;
