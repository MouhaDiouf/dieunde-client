import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import {
  createUser,
  recoverPassword,
  resetPasswordEmail,
} from '../../actions/actions';
import { useSelector } from 'react-redux';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import loadingImg from '../../images/loading.gif';
import { Redirect, useHistory, useParams } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/"></Link>{' '}
      {new Date().getFullYear()}
      {' Dieunde .'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loadingImg: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  signupIndicator: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function NewPassword() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const token = params.get('access-token');
  const uid = params.get('uid');
  const client = params.get('client');
  const redirectUrl = params.get('redirect_url');
  const {
    passwordRecovered,
    passwordRecoveryFailed,
    passwordRecoverMessage,
    passwordRecoverFailMessage,
    user,
  } = useSelector((state) => state.userReducer);

  const history = useHistory();

  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [passwordconfirmation, setpasswordconfirmation] = useState('');

  const dispatch = useDispatch();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const params = {
      password,
      password_confirmation: passwordconfirmation,
      client,
      uid,
      'access-token': token,
    };
    dispatch(resetPasswordEmail(params));
  };

  if (user) {
    history.push('/');
  }
  return (
    <Container component="main" maxWidth="xs">
      {passwordRecovered && (
        <AlertMessage message={passwordRecoverMessage} type="success" />
      )}
      {passwordRecoverFailMessage &&
        passwordRecoverFailMessage.map((error) => (
          <AlertMessage message={error} type="error" />
        ))}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Récupérez votre mot de passe
        </Typography>

        <form
          className={classes.form}
          noValidate
          onSubmit={handlePasswordReset}
        >
          <Grid container spacing={2}>
            <TextField
              variant="standard"
              required
              fullWidth
              type="password"
              label="Nouveau mot de passe"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              variant="standard"
              required
              fullWidth
              type="password"
              label="Confirmer mot de passe"
              name="password_confirmation"
              onChange={(e) => setpasswordconfirmation(e.target.value)}
              value={passwordconfirmation}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // disabled={resetingPassword}
            className={classes.submit}
          >
            Changer mot de passe
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
