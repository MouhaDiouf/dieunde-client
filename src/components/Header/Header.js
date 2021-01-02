import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AccountCircle } from '@material-ui/icons';

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
  const [auth, setauth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <IconButton component={Link} to="/cart">
            <Badge badgeContent={3} color="secondary">
              <ShoppingCartIcon className={classes.shoppingIcon} />
            </Badge>
          </IconButton>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/mon-profil"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/dashboard"
                >
                  My account
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/vendre-produit"
                >
                  Vendre
                </MenuItem>
                <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
                <MenuItem
                  component={Link}
                  to="/connexion"
                  onClick={handleClose}
                >
                  {' '}
                  Connexion
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
