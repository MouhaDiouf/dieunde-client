import { BottomNavigation, makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles({
  footer: {
    marginTop: '30px',
    background: 'lightgrey',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Footer() {
  const classes = useStyles();
  return <div className={classes.footer}>&copy; 2020 Dakar Voitures</div>;
}

export default Footer;
