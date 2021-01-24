import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePassword } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    margin: '20px 0',
  },
  formControl: {
    width: '100%',
  },
  changePasswordBtn: {
    margin: '10px auto',
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

function UpdatePassword() {
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
    <div>
      <Button
        type="button"
        onClick={handleOpenPassword}
        variant="contained"
        size="medium"
        color="primary"
        className={classes.changePasswordBtn}
      >
        Changer mot de passe
      </Button>

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
                message="Mot de passe modifié avec succès"
                type="success"
              />
            )}
            <Typography id="transition-modal-title" variant="h5">
              Changer votre mot de passe
            </Typography>
            <form className={classes.form} onSubmit={handleUpdatePassword}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="transition-modal-description"
                  label="Nouveau mot de passe"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                ></TextField>
                <TextField
                  label="Confirmation mot de passe"
                  variant="filled"
                  onChange={(e) => setPasswordConf(e.target.value)}
                  value={passwordConf}
                  type="password"
                ></TextField>
                <TextField
                  label="Ancien mot de passe"
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
                  {updatingPassword ? 'Changement..' : 'Changer'}
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdatePassword;
