import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
});
function AccountActivation() {
  const classes = useStyles();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const confirmation = params.get('account_confirmation_success');

  if (!confirmation) {
    return 'Account not activated';
  }
  return (
    <div className={classes.container}>
      <Typography variant="h5">Compte activé avec succès</Typography>
      <Link to="/connexion">Se connecter</Link>
    </div>
  );
}

export default AccountActivation;
