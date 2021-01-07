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
import { deleteProduct } from '../../../actions/actions';
import AlertMessage from '../../../components/AlertMessage/AlertMessage';
import Loader from '../../../images/loading.gif';

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
  imgDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100px',
    height: '100px',
  },
  loaderDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loader: {
    width: '30px',
    margin: '0 5px',
  },
}));

function DeleteProduct({ productName, productImg, id }) {
  const [deteleAccountModal, setdeteleAccountModal] = useState(false);
  const [confirmText, setconfirmText] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const { deletingProduct, productDeleteFailure } = useSelector(
    (state) => state.products
  );
  const handleCloseDelete = () => {
    setdeteleAccountModal(false);
  };

  const handleOpenDelete = () => {
    setdeteleAccountModal(true);
  };

  const testToEnter = productName.split(' ')[0];
  const handleProductDeletion = (e) => {
    e.preventDefault();

    if (passConfirmation(testToEnter, confirmText)) {
      handleCloseDelete();
      dispatch(deleteProduct(id));
    }
  };
  function passConfirmation(userInput, reference) {
    return userInput.toLocaleLowerCase() === reference.toLocaleLowerCase();
  }
  return (
    <>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={handleOpenDelete}
        size="small"
      >
        Delete
      </Button>
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
            {productDeleteFailure && (
              <AlertMessage
                message="Can't delete this product. Try again later"
                type="error"
              />
            )}
            <Typography id="transition-modal-title" variant="h3">
              Delete {productName} ?
            </Typography>
            <div className={classes.imgDiv}>
              <img
                src={productImg.url}
                alt={productName}
                className={classes.img}
              />
            </div>

            <form className={classes.form} onSubmit={handleProductDeletion}>
              <Typography>
                Are your sure you want to delete this product? Type "
                {testToEnter}" to confirm
              </Typography>
              <FormControl className={classes.formControl}>
                <TextField
                  id="transition-modal-description"
                  variant="outlined"
                  onChange={(e) => setconfirmText(e.target.value)}
                  required
                ></TextField>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  className={classes.submitBtn}
                  disabled={deletingProduct}
                >
                  {deletingProduct ? (
                    <div className={classes.loaderDiv}>
                      <img
                        src={Loader}
                        alt="loader"
                        className={classes.loader}
                      />
                      <span className={classes.loaderSpan}>
                        Deleting Product
                      </span>
                    </div>
                  ) : (
                    'Delete'
                  )}
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default DeleteProduct;
