import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Badge,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
  shoppingIcon: {
    color: 'white',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Dieunde
          </Typography>
          <Button color="inherit" component={Link} to="/vendre-produit">
            Vendre
          </Button>
          <Button component={Link} to="/connexion" color="inherit">
            Connexion
          </Button>
          <IconButton component={Link} to="/cart">
            <Badge badgeContent={3} color="secondary">
              <ShoppingCartIcon className={classes.shoppingIcon} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
