import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import { updatePassword } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    marginTop: '20px',
  },
}));

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  const classes = useStyles();
  const [openPassword, setOpenPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const dispatch = useDispatch();
  const {
    passwordErrors,
    hasPasswordUpdateErrors,
    passwordUpdateSuccess,
    updatingPassword,
  } = useSelector((state) => state.userReducer);

  const handleOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const params = {
      password,
      password_confirmation: passwordConf,
      current_password: currentPassword,
    };
    dispatch(updatePassword(params));
  };

  return (
    <Container>
      <Typography variant="h2">Your Profile</Typography>
      <button type="button" onClick={handleOpenPassword}>
        Update My Info
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openPassword}
        onClose={handleClosePassword}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPassword}>
          <div className={classes.paper}>
            {hasPasswordUpdateErrors &&
              passwordErrors.map((error) => (
                <AlertMessage message={error} type="error" />
              ))}
            {passwordUpdateSuccess && (
              <AlertMessage
                message="Password updated successfully"
                type="success"
              />
            )}
            <Typography id="transition-modal-title" variant="h3">
              Update Your Password
            </Typography>
            <form className={classes.form} onSubmit={handleUpdatePassword}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="transition-modal-description"
                  label="New Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></TextField>
                <TextField
                  label="Password Confrimation"
                  variant="filled"
                  onChange={(e) => setPasswordConf(e.target.value)}
                  value={passwordConf}
                ></TextField>
                <TextField
                  label="Your current password"
                  variant="filled"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                ></TextField>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.submitBtn}
                  disabled={updatingPassword}
                >
                  {updatingPassword ? 'Updating Password' : 'Update Password'}
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Profile;
