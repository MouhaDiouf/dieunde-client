import {
  Backdrop,
  Button,
  Container,
  Fade,
  makeStyles,
  Modal,
  Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },
  container: {
    height: '100vh',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  productConfirm: {
    fontWeight: 'bold',
    color: 'orange',
    margin: '0 20px',
  },
}));

function AllProductsAdmin() {
  const classes = useStyles();
  useEffect(() => {
    Axios.get('http://localhost:3001/admin/products')
      .then((res) => {
        const { data } = res;
        setproducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [products, setproducts] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!products) {
    return 'Loading...';
  }
  return (
    <Container className={classes.container}>
      {products.map((product) => (
        <Paper className={classes.root}>
          <div className={classes.productDetails}>
            <p>{product.nom}</p>
            <p className={classes.productConfirm}>
              {!product['confirmed?'] && 'non confirmé'}
            </p>
          </div>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={handleOpen}
            component={Link}
            to={`/admin/product/${product.id}`}
          >
            Voir
          </Button>
        </Paper>
      ))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Details</h2>
            <p id="transition-modal-description"></p>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default AllProductsAdmin;
