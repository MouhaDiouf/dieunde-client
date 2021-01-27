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
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addToSelection,
  validateProduct,
} from '../../../../actions/adminactions';
import { deleteProduct } from '../../../../actions/actions';
import AlertMessage from '../../../../components/AlertMessage/AlertMessage';
import Carousel from 'react-elastic-carousel';
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
    display: 'flex',
    flexWrap: 'wrap',
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
  const [errorFetch, setErrorFetch] = useState(false);
  const dispatch = useDispatch();
  const {
    validateSuccess,
    productDeleteSuccess,
    productDeleteFailure,
    addingToSelection,
    addedToSelection,
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

  const handleAddToSelection = (id) => {
    dispatch(addToSelection(id));
  };
  const handleValidateProduct = () => {
    dispatch(validateProduct(id));
  };
  useEffect(() => {
    const fetchOneProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/produits/${id}`
        );
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
  }, [id, validateSuccess, addedToSelection]);

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
      {addedToSelection && (
        <AlertMessage message="Ajouté à la sélection" type="info" />
      )}
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
          <Grid item xs={12} md={7}>
            <Carousel className={classes.carouselContainer}>
              {product.images &&
                JSON.parse(product.images).map((img, idx) => {
                  return (
                    <img
                      src={img.secure_url}
                      alt=""
                      key={idx}
                      className={classes.productImg}
                    />
                  );
                })}
            </Carousel>
          </Grid>

          <Grid item xs={12} md={5} className={classes.contentAndBtn}>
            <Container>
              <Typography variant="body1">{product.description}</Typography>
              <Chip label={product.marque} />
              <Chip label={`${product.prix} CFA`} />
              <Chip label={`${product.kilométrage} km`} />
            </Container>

            <ButtonGroup className={classes.btnGroup}>
              <Button className={classes.faorisBtn} onClick={handleOpen}>
                Voir Vendeur
              </Button>
              <Button
                className={classes.faorisBtn}
                component={Link}
                to={`/${product.nom}/${product.id}/edit`}
              >
                Modifier
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
              <Button
                onClick={() => handleAddToSelection(product.id)}
                color="primary"
                disabled={addingToSelection}
              >
                {product.inSelection
                  ? 'Enlever de la sélection'
                  : 'Ajouter à la sélection'}
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
