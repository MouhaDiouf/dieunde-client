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
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
  favoriteIcon: {
    color: 'white',
  },
  notifications: {
    color: 'white',
  },
  appBarAdmin: {
    background: 'black',
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
  const { favorites, produits } = useSelector((state) => state.products);
  let unconfirmedProducts = 0;
  if (produits) {
    for (let i = 0; i < produits[0].length; i++) {
      if (!produits[0][i]['confirmed?']) unconfirmedProducts += 1;
    }
  }
  return (
    <>
      <AppBar
        className={`${user?.admin && classes.appBarAdmin}`}
        position="static"
      >
        <Toolbar>
          <DrawerController />

          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            DakarVoitures
          </Typography>

          {user && (
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={favorites?.length} color="secondary">
                <FavoriteIcon className={classes.favoriteIcon} />
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
                Connexion
              </MenuItem>
              <MenuItem
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
              >
                {' '}
                Créer un compte
              </MenuItem>
            </>
          )}
          {user?.admin && (
            <>
              <IconButton component={Link} to="/admin/allproducts">
                <Badge badgeContent={unconfirmedProducts} color="secondary">
                  <NotificationsIcon className={classes.notifications} />
                </Badge>
              </IconButton>

              <MenuItem component={Link} to="/admin-panel" variant="text">
                Admin Panel
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
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Profil
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
