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
import { createUser } from '../../actions/actions';
import { useSelector } from 'react-redux';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import loadingImg from '../../images/loading.gif';
import { Redirect, useHistory } from 'react-router-dom';

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

export default function SignUp() {
  const { signupAttempt, signupErrorMessages, signupSuccess } = useSelector(
    (state) => state.userReducer
  );
  const history = useHistory();

  const classes = useStyles();
  // const [pseudo, setpseudo] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');
  const [telephone, settelephone] = useState('');
  const [nom, setnom] = useState('');

  const dispatch = useDispatch();

  const handleAccountCreation = (e) => {
    e.preventDefault();
    const user = {
      // nickname: pseudo,
      name: nom,
      email,
      password,
      password_confirmation: passwordConfirmation,
      telephone,
    };

    dispatch(createUser(user));
  };

  if (signupSuccess) {
    history.push('/');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signupErrorMessages &&
          signupErrorMessages.map((error) => (
            <AlertMessage message={error} type="warning" />
          ))}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleAccountCreation}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="nom"
                name="nom"
                variant="outlined"
                required
                fullWidth
                id="nom"
                label="Full name"
                onChange={(e) => setnom(e.target.value)}
                autoFocus
                value={nom}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <TextField
                autoComplete="pseudo"
                name="pseudo"
                variant="outlined"
  
                fullWidth
                id="pseudo"
                label="Pseudo"
                onChange={(e) => setpseudo(e.target.value)}
                autoFocus
              /> */}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Telephone"
                type="text"
                id="telephone"
                autoComplete="telephone"
                onChange={(e) => settelephone(e.target.value)}
                value={telephone}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password Confirmation"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setpasswordConfirmation(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={signupAttempt}
            className={classes.submit}
          >
            {signupAttempt ? (
              <div className={classes.signupIndicator}>
                <img
                  className={classes.loadingImg}
                  src={loadingImg}
                  alt="loading"
                />
                <Typography variant="body2">Hold Tight...</Typography>
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/connexion" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
