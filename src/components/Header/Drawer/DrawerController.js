import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import DrawerStyles from './DrawerController.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../../actions/actions';
import { useDispatch } from 'react-redux';
import {
  AccountCircleRounded,
  DriveEta,
  ExitToApp,
  SupervisedUserCircle,
  VpnKeyRounded,
} from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

  iconStyles: {
    color: 'white',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const { user } = useSelector((state) => state.userReducer);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {!user && (
          <>
            <ListItem button component={Link} to="/connexion">
              <ListItemIcon>
                <VpnKeyRounded />
              </ListItemIcon>
              <ListItemText primary="Connexion" />
            </ListItem>
            <ListItem button component={Link} to="/signup">
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary="Créer compte" />
            </ListItem>
          </>
        )}
      </List>

      {user && (
        <>
          <List>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <AccountCircleRounded />
              </ListItemIcon>
              <ListItemText primary="Profil" />
            </ListItem>
            <ListItem button component={Link} to="/vendre-produit">
              <ListItemIcon>
                <DriveEta />
              </ListItemIcon>
              <ListItemText primary="Vendre" />
            </ListItem>{' '}
            <ListItem button component={Link} onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Déconnexion" />
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <div className={DrawerStyles.root}>
      <React.Fragment>
        <IconButton onClick={toggleDrawer('left', true)}>
          <MenuIcon className={classes.iconStyles} />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
