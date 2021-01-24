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
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeProfileInfo, deleteAccount } from '../../actions/actions';

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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    marginTop: '20px',
  },
  textField: {
    margin: '20px ',
  },
}));

function DeleteAccount() {
  const [deteleAccountModal, setdeteleAccountModal] = useState(false);
  const [confirmText, setconfirmText] = useState('');
  const [email, setemail] = useState('');
  const [telephone, settelephone] = useState('');
  const { user } = useSelector((state) => state.userReducer);
  const { id } = user;
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleCloseDelete = () => {
    setdeteleAccountModal(false);
  };

  const handleOpenDelete = () => {
    setdeteleAccountModal(true);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const params = {
      email,
      telephone,
      id,
    };
    dispatch(changeProfileInfo(params));
  };
  return (
    <>
      {/* <Button variant="text" color="secondary" onClick={handleOpenDelete}>
        Changer Téléphone
      </Button> */}
      <Modal
        className={classes.modal}
        open={deteleAccountModal}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deteleAccountModal}>
          <div className={classes.paper}>
            <Typography id="transition-modal-title" variant="h5">
              Changer votre Téléphone
            </Typography>
            <form className={classes.form} onSubmit={handleProfileUpdate}>
              <FormControl className={classes.formControl}>
                {/* <TextField
                  variant="outlined"
                  label="New Email"
                  type="email"
                  placeholder="Leave blank to not change it"
                  onChange={(e) => setemail(e.target.value)}
                  className={classes.textField}
                ></TextField> */}

                <TextField
                  variant="outlined"
                  label="Telephone"
                  placeholder="Laisser vide pour ne pas changer"
                  onChange={(e) => settelephone(e.target.value)}
                  className={classes.textField}
                  required
                ></TextField>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className={classes.submitBtn}
                >
                  Mettre à jour
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default DeleteAccount;
