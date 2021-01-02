import {
  Button,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProduitsSimilaires from '../../components/ProduitsSimilaires/ProduitsSimilaires';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    width: '50%',
  },
  productImg: {
    width: '50%',
    maxWidth: '300px',
  },
  innerContainer: {
    width: '100%',
    padding: '20px',
  },
  faorisBtn: {
    backgroundColor: 'orange',
  },
});
function ProductPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        }
      } catch (error) {
        setProduct(null);
        setLoading(false);
      }
    };
    fetchOneProduct();
  }, [id]);

  if (loading) {
    return 'Chargement...';
  }
  if (!product) {
    return <h2>Aucun produit à afficher</h2>;
  }
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3">Details pour {product.nom}</Typography>
      <Paper className={classes.innerContainer} elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image.url}
              alt=""
              className={classes.productImg}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Container>
              <Typography variant="body1">{product.description}</Typography>
              <Chip label={product.catégorie} />
            </Container>

            <ButtonGroup>
              <Button variant="contained" color="primary">
                Ajouter Aux Favoris
              </Button>
              <Button className={classes.faorisBtn} onClick={handleOpen}>
                Contacter Vendeur
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
          Hello from modal
        </Container>
      </Modal>
      <ProduitsSimilaires similaires={product.similaires} />
    </Container>
  );
}

export default ProductPage;
