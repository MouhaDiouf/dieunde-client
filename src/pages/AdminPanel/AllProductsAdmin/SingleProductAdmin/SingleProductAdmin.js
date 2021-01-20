import {
  Button,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Email } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { validateProduct } from '../../../../actions/adminactions';
import { deleteProduct } from '../../../../actions/actions';
import AlertMessage from '../../../../components/AlertMessage/AlertMessage';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentAndBtn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnGroup: {
    margin: '25px 0',
  },

  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    minWidth: '50%',
    textAlign: 'center',
    maxWidth: '60%',
  },
  productImg: {
    width: '50%',
    maxWidth: '300px',
  },
  innerContainer: {
    width: '100%',
    padding: '20px',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faorisBtn: {
    backgroundColor: 'orange',
  },
});
function SingleProductAdmin() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { user } = useSelector((state) => state.userReducer);
  const [errorFetch, setErrorFetch] = useState(false);
  const dispatch = useDispatch();
  const {
    validateSuccess,
    productDeleteSuccess,
    productDeleteFailure,
  } = useSelector((state) => state.products);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleValidateProduct = () => {
    dispatch(validateProduct(id));
  };
  useEffect(() => {
    const fetchOneProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/produits/${id}`);
        const data = await response.json();
        if (data) {
          setProduct(data);
          setLoading(false);
        } else {
          setProduct(null);
          setLoading(false);
          setErrorFetch(true);
        }
      } catch (error) {
        setProduct(null);
        setErrorFetch(true);
        setLoading(false);
      }
    };
    fetchOneProduct();
  }, [id, validateSuccess]);

  if (errorFetch) {
    return <Typography>Nous ne pouvons pas trouver le produit</Typography>;
  }
  if (loading) {
    return 'Chargement...';
  }

  if (!product) {
    return <h2>Aucun produit à afficher</h2>;
  }
  return (
    <Container maxWidth="lg" className={classes.root}>
      {productDeleteSuccess && (
        <AlertMessage message="produit supprimé avec succès" />
      )}
      {productDeleteFailure && (
        <AlertMessage
          message="Nous ne pouvons pas supprimer le produit pour le moment. Réactualisez la page et réessayez."
          type="error"
        />
      )}
      <Typography variant="h4">Details pour {product.nom}</Typography>
      <Paper className={classes.innerContainer} elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image?.url}
              alt=""
              className={classes.productImg}
            />
          </Grid>

          <Grid item xs={12} md={5} className={classes.contentAndBtn}>
            <Container>
              <Typography variant="body1">{product.description}</Typography>
              <Chip label={product.catégorie} />
            </Container>

            <ButtonGroup className={classes.btnGroup}>
              <Button className={classes.faorisBtn} onClick={handleOpen}>
                Voir Vendeur
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleValidateProduct}
              >
                {product['confirmed?'] ? 'Invalider' : 'Valider'}
              </Button>
              <Button onClick={() => handleDeleteProduct(product.id)}>
                Supprimer
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Container className={classes.modalContainer}>
          <Typography variant="h5">Informations Vendeur</Typography>
          <List>
            <ListItem>{product.user.name}</ListItem>
            <ListItem>{product.user.email}</ListItem>
            <ListItem>{product.user.telephone}</ListItem>
          </List>
        </Container>
      </Modal>
    </Container>
  );
}

export default SingleProductAdmin;
