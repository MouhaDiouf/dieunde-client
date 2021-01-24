import React, { useState } from 'react';

import {
  AppBar,
  Avatar,
  Button,
  Container,
  FormControl,
  List,
  ListItem,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateProfifileForm from './UpdateProfileForm';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    margin: '20px auto',
    padding: '20px ',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 auto',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  vosProduits: {
    margin: '10px auto',
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: 'orange',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'center',
    height: '300px',
    alignItems: 'center',
  },
});

function Profile() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.userReducer);
  return (
    <Container component={Paper} elevation={3}>
      <div className={classes.root}>
        <Typography variant="h4">Votre profil</Typography>
        <div className={classes.userInfo}>
          <Avatar className={classes.avatar}>{user.name.split('')[0]}</Avatar>
          <List>
            <ListItem>{user.name}</ListItem>
            <ListItem>{user.email}</ListItem>
            <ListItem>{user.telephone}</ListItem>
            <UpdateProfifileForm />
          </List>
        </div>
        <div className={classes.navigation}>
          <Button
            component={Link}
            to={`${user.email}/products`}
            size="medium"
            color="secondary"
            variant="contained"
            className={classes.vosProduits}
          >
            Vos Produits
          </Button>
          <UpdatePassword />
          {!user.admin && <DeleteAccount />}
        </div>
      </div>
    </Container>
  );
}

export default Profile;
