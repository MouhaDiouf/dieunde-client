import {
  BottomNavigation,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
const useStyles = makeStyles({
  footer: {
    marginTop: '30px',
    background: 'lightgrey',
    padding: '10px auto',
  },
  link: {
    color: 'green',
  },
  infos: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '20px',
  },
});

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <p className={classes.copyright}> &copy; 2020 Dakar Voitures</p>
      <div className={classes.infos}>
        <div className={classes.companyInfo}>
          <Typography>A propos de DakarVoitures</Typography>
          <List>
            <ListItem className={classes.link} component={Link} to="/à-propos">
              A propos
            </ListItem>
            <ListItem
              className={classes.link}
              component={Link}
              to="/anti-fraude"
            >
              Anti-fraude
            </ListItem>
          </List>
        </div>
        <div className={classes.buySellContainer}>
          <Typography>Achat & Vente</Typography>
          <List>
            <ListItem component={Link} to="/voitures" className={classes.link}>
              Acheter une voiture
            </ListItem>
            <ListItem
              component={Link}
              to="/vendre-voiture"
              className={classes.link}
            >
              Vendre votre voiture
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}

export default Footer;
