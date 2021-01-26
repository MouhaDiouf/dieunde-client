import {
  Button,
  ButtonGroup,
  Container,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0',
    padding: '10px',
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    width: '70%',
    justifyContent: 'space-around',
  },
  paper: {
    position: 'absolute',
    top: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: 0,
    right: 0,
  },

  usersDivContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));
function AllUsers() {
  const handleOpen = (e, user) => {
    setuserToShow(user);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };
  const [open, setopen] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((res) => setusers(res.data))
      .catch((error) => {
        seterrors(error);
      });
  }, []);
  const [users, setusers] = useState(null);
  const [errors, seterrors] = useState(null);
  const [userToShow, setuserToShow] = useState({});
  if (!users) {
    return 'Loading...';
  }

  if (!users.length) {
    return 'No users yet';
  }
  return (
    <>
      <Container className={classes.outerContainer}>
        <div className={classes.usersDivContainer}>
          <Typography>Utilisateurs</Typography>
          {users.map((user) => {
            return (
              <Paper className={classes.userContainer}>
                <div className={classes.userInfo}>
                  <p>{user.email}</p>
                  <p>{user.name}</p>
                  {user.isadmin && (
                    <Button color="primary" variant="text">
                      Admin
                    </Button>
                  )}
                  {!user['confirmed?'] && <p>Non Confirmé</p>}
                </div>
                <div>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={(e) => handleOpen(e, user)}
                  >
                    Voir
                  </Button>
                </div>
              </Paper>
            );
          })}
        </div>
      </Container>
      <div className={classes.modalContainer}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">
              Details pour {userToShow.name ? userToShow.name : 'User'}
            </h2>
            <p id="simple-modal-description">Name: {userToShow.name}</p>
            <p>Email: {userToShow.email}</p>
            <p>Telephone: {userToShow.telephone}</p>
            <ButtonGroup>
              <Button>Supprimer</Button>
            </ButtonGroup>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default AllUsers;
