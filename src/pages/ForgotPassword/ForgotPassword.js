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
import { recoverPassword } from '../../actions/actions';
import { useSelector } from 'react-redux';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import { useHistory } from 'react-router-dom';

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

export default function ForgotPassword() {
  const {
    resetPasswordEmailSent,
    resetPasswordEmailUnsent,
    resetingPassword,
    emailSentMessage,
    emailUnsentMessage,
    user,
  } = useSelector((state) => state.userReducer);

  const history = useHistory();

  const classes = useStyles();
  const [email, setemail] = useState('');
  const dispatch = useDispatch();

  const handlePasswordRecovery = (e) => {
    e.preventDefault();

    dispatch(recoverPassword(email));
    setemail('');
  };

  if (user) {
    history.push('/');
  }
  return (
    <Container component="main" maxWidth="xs">
      {resetPasswordEmailSent && (
        <AlertMessage message={emailSentMessage} type="success" />
      )}
      {resetPasswordEmailUnsent &&
        emailUnsentMessage.map((error, idx) => (
          <AlertMessage key={idx} message={error} type="error" />
        ))}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Mot de passe oublié
        </Typography>
        <Typography variant="body2">
          Mot de passe perdu? Veuillez saisir votre identifiant ou adresse mail.
          Vous recevrez un lien pour créer un nouveau mot de passe par e-mail.
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handlePasswordRecovery}
        >
          <Grid container spacing={2}>
            <TextField
              variant="standard"
              required
              fullWidth
              type="email"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={resetingPassword}
            className={classes.submit}
          >
            Réinitialiser mot de passe
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
