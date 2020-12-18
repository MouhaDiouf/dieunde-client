import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { register } from './styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../actions/actions';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const dispatch = useDispatch();

  const errorClose = () => {
    setErrorOpen(false);
  };

  const passwordMatch = () => password === passwordConfirm;

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const isValid = () => {
    if (email === '') {
      return false;
    }
    return true;
  };
  const submitRegistration = (e) => {
    e.preventDefault();
    if (!passwordMatch()) {
      setErrorOpen(true);
      setError('Les mots de passe ne correspondent pas');
    }
    const newUserCredentials = {
      email,
      password,
      passwordConfirm,
    };
    dispatch(signUpUser(newUserCredentials));
    console.log('newUserCredentials', newUserCredentials);
    //dispath to userActions
  };

  const classes = register();
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleAltIcon className={classes.icon} />
        </Avatar>
        <form className={classes.form} onSubmit={submitRegistration}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="email" className={classes.labels}>
              e-mail
            </InputLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              className={classes.inputs}
              disableUnderline={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="password" className={classes.labels}>
              Mot de passe
            </InputLabel>
            <Input
              name="password"
              autoComplete="password"
              className={classes.inputs}
              disableUnderline={true}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={hidePassword ? 'password' : 'input'}
              endAdornment={
                hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                )
              }
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
              Confrimer Mot de passe
            </InputLabel>
            <Input
              name="passwordConfrim"
              autoComplete="passwordConfrim"
              className={classes.inputs}
              disableUnderline={true}
              onClick={showPassword}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              type={hidePassword ? 'password' : 'input'}
              endAdornment={
                hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                      fontSize="default"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                )
              }
            />
          </FormControl>
          <Button
            disabled={!isValid()}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={submitRegistration}
          >
            Créer Compte
          </Button>
        </form>

        {error ? (
          <Snackbar
            variant="error"
            key={error}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={errorOpen}
            onClose={errorClose}
            autoHideDuration={3000}
          >
            <SnackbarContent
              className={classes.error}
              message={
                <div>
                  <span style={{ marginRight: '8px' }}>
                    <ErrorIcon fontSize="large" color="error" />
                  </span>
                  <span> {error} </span>
                </div>
              }
              action={[
                <IconButton key="close" aria-label="close" onClick={errorClose}>
                  <CloseIcon color="error" />
                </IconButton>,
              ]}
            />
          </Snackbar>
        ) : null}
      </Paper>
    </div>
  );
};

export default Connexion;
