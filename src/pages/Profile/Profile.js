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

function Profile() {
  return (
    <Container>
      <Typography variant="h2">Your Profile</Typography>
      <Button>Vos Produits</Button>
      <UpdatePassword />
      <DeleteAccount />
    </Container>
  );
}

export default Profile;
