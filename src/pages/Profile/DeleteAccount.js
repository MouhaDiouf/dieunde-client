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
import { deleteAccount } from '../../actions/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supprimerCompteBtn: {
    margin: '10px auto',
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
}));

function DeleteAccount() {
  const [deteleAccountModal, setdeteleAccountModal] = useState(false);
  const [confirmText, setconfirmText] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleCloseDelete = () => {
    setdeteleAccountModal(false);
  };

  const handleOpenDelete = () => {
    setdeteleAccountModal(true);
  };

  const handleAccountDeletion = (e) => {
    e.preventDefault();
    if (confirmText.toLocaleLowerCase() === 'oui') {
      dispatch(deleteAccount());
    }
  };
  return (
    <>
      {/* <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={handleOpenDelete}
        className={classes.supprimerCompteBtn}
      >
        Supprimer compte
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
              Supprimer votre compte
            </Typography>
            <form className={classes.form} onSubmit={handleAccountDeletion}>
              <Typography>
                Êtes-vous sûr de supprimer votre compte? Tapez "Oui" pour
                confirmer
              </Typography>
              <FormControl className={classes.formControl}>
                <TextField
                  id="transition-modal-description"
                  variant="outlined"
                  onChange={(e) => setconfirmText(e.target.value)}
                ></TextField>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className={classes.submitBtn}
                >
                  Supprimer
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
