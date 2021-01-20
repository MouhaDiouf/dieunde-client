import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});
function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Page non trouvée</h1>
      <p>
        La page à laquelle vous essayez d'accéder n'existe pas ou est
        restreinte. <Link to="/connexion">Connectez-vous</Link> à votre compte
        et réessayez.
      </p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
    </div>
  );
}

export default NotFound;
