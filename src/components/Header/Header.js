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

import DrawerController from './Drawer/DrawerController';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AccountCircle } from '@material-ui/icons';
import { logoutUser } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

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
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <DrawerController />

          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Dieunde
          </Typography>

          {user && (
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartIcon className={classes.shoppingIcon} />
              </Badge>
            </IconButton>
          )}

          {!user && (
            <>
              <MenuItem
                component={Link}
                to="/connexion"
                variant="contained"
                color="primary"
              >
                {' '}
                Sign In
              </MenuItem>
              <MenuItem
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
              >
                {' '}
                Create Account
              </MenuItem>
            </>
          )}
          {user && (
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
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
