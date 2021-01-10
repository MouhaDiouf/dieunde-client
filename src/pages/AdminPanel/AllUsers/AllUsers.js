import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles({
  userContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0',
    padding: '10px',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    width: '70%',
    justifyContent: 'space-around',
  },
});
function AllUsers() {
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
  if (!users) {
    return 'Loading...';
  }

  if (!users.length) {
    return 'No users yet';
  }
  return (
    <Container>
      <Typography>All Users</Typography>
      {users.map((user) => {
        return (
          <Paper className={classes.userContainer}>
            <div className={classes.userInfo}>
              <p>{user.email}</p>
              <p>{user.name}</p>
              {user.admin && (
                <Button color="primary" variant="text">
                  Admin
                </Button>
              )}
              {!user['confirmed?'] && <p>Non Confirmé</p>}
            </div>
            <div>
              <Button variant="text" color="secondary">
                Voir
              </Button>
            </div>
          </Paper>
        );
      })}
    </Container>
  );
}

export default AllUsers;
