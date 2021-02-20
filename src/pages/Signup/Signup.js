import React, { useRef, useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Checkbox, FormControlLabel } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/"></Link>{' '}
      {new Date().getFullYear()}
      {' Dakar Voitures.'}
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
  const {
    signupAttempt,
    signupErrorMessages,
    redirectAfterSignup,
  } = useSelector((state) => state.userReducer);
  const history = useHistory();

  const classes = useStyles();
  // const [pseudo, setpseudo] = useState('');
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [password, setpassword] = useState('');
  // const [passwordConfirmation, setpasswordConfirmation] = useState('');
  const [telephone, settelephone] = useState('');
  const [telephoneError, settelephoneError] = useState('');
  const [nom, setnom] = useState('');
  const [nomError, setnomError] = useState('');
  const errorsContainer = useRef(null);
  const whatsappCheck = useRef(null);
  const [isOnWhatsapp, setisOnWhatsapp] = useState(true);
  const dispatch = useDispatch();

  const handleAccountCreation = (e) => {
    e.preventDefault();
    setnomError('');
    setemailError('');
    setpasswordError('');
    settelephoneError('');
    const user = {
      // nickname: pseudo,
      name: nom,
      email,
      password,
      // password_confirmation: passwordConfirmation,
      telephone,
      whatsapp: isOnWhatsapp,
    };

    dispatch(createUser(user));
    // if (!validatePhonenumber(telephone)) {
    //   settelephoneError('Veuillez entrer un numéro de téléphone valide');
    // }
    // if (!validateEmail(email)) {
    //   setemailError('Veuillez entrer une addresse email valide.');
    // }

    // if (!password) {
    //   setpasswordError(
    //     "Veuillez entrez un mot de passe d'au moins 6 caractères"
    //   );
    // }

    // if (nom.length < 3) {
    //   setnomError('Veuillez saisir un nom avec au moins 3 caractères');
    // }
    // if (
    //   !password ||
    //   !validateEmail(email) ||
    //   !validatePhonenumber(telephone) ||
    //   !nom
    // ) {
    //   return;
    // }
  };

  if (redirectAfterSignup) {
    history.replace('/');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créer un compte
        </Typography>
        <div className={classes.errorsContainer} ref={errorsContainer}>
          {signupErrorMessages &&
            signupErrorMessages.map((error, idx) => (
              <AlertMessage message={error} key={idx} type="warning" />
            ))}
          {nomError && <AlertMessage message={nomError} type="warning" />}

          {emailError && (
            <AlertMessage
              message="L'addresse email est invalide. Veuillez réessayer"
              type="warning"
            />
          )}

          {telephoneError && (
            <AlertMessage message={telephoneError} type="warning" />
          )}
          {passwordError && (
            <AlertMessage message={passwordError} type="warning" />
          )}
        </div>
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
                label="Prénom et nom"
                onChange={(e) => setnom(e.target.value)}
                autoFocus
                value={nom}
              />
            </Grid>
            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setemail(e.target.value.toLowerCase())}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <NumberFormat
                customInput={TextField}
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Téléphone (+221)"
                type="text"
                id="telephone"
                autoComplete="telephone"
                onChange={(e) => settelephone(e.target.value)}
                value={telephone}
                format="## ### ## ##"
              />
              <label htmlFor="whatsapp">Whatsapp</label>
              <Checkbox
                checked={isOnWhatsapp}
                color="primary"
                id="whatsapp"
                ref={whatsappCheck}
                onChange={(e) => setisOnWhatsapp(e.target.checked)}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirmation mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setpasswordConfirmation(e.target.value)}
                />
              </Grid> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={signupAttempt}
            className={classes.submit}
            onClick={handleAccountCreation}
          >
            {signupAttempt ? (
              <div className={classes.signupIndicator}>
                <img
                  className={classes.loadingImg}
                  src={loadingImg}
                  alt="loading"
                />
                <Typography variant="body2">Patientez...</Typography>
              </div>
            ) : (
              'Créer compte'
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/connexion" variant="body2">
                Vous avez déjà un compte? se connecter{' '}
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
