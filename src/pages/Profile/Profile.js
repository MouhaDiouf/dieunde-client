import React, { useState } from 'react';

import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <Container>
      <Typography variant="h2">Your Profile</Typography>
      <Button component={Link} to={`${user.email}/products`}>
        Vos Produits
      </Button>
      <UpdatePassword />
      <DeleteAccount />
    </Container>
  );
}

export default Profile;
