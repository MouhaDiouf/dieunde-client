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
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProduitsSimilaires from '../../components/ProduitsSimilaires/ProduitsSimilaires';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import CurrencyFormat from 'react-currency-format';

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
  productPrice: {
    margin: '10px 0',
    color: 'red',
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
  const [alert, setalert] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { creatingFavorite, favoriteCreated, productAddedId } = useSelector(
    (state) => state.products
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddToFavorites = () => {
    if (user && !creatingFavorite) {
      const params = {
        user_id: user.id,
        produit_id: id,
      };
      dispatch(addToFavorites(params));
    } else {
      setalert(true);
    }
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
      {productAddedId === id && favoriteCreated && (
        <AlertMessage message="favorite created" />
      )}
      {alert && (
        <AlertMessage
          message="You cannot add to favorites. Please login or create an account"
          type="warning"
        />
      )}

      <Paper className={classes.innerContainer} elevation={3}>
        <Typography variant="h4">Details pour {product.nom}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image.url}
              alt=""
              className={classes.productImg}
            />
          </Grid>

          <Grid item xs={12} md={5} className={classes.contentAndBtn}>
            <Container>
              <Typography variant="body1">{product.description}</Typography>
              <CurrencyFormat
                value={product.prix}
                displayType={'text'}
                suffix={' CFA'}
                renderText={(value) => (
                  <div className={classes.productPrice}>{`Prix: ${value}`}</div>
                )}
                thousandSeparator={' '}
              />
              <Chip label={product.catégorie} />
            </Container>

            <ButtonGroup className={classes.btnGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToFavorites}
              >
                Ajouter Aux Favoris
              </Button>
              <Button className={classes.faorisBtn} onClick={handleOpen}>
                Contacter Vendeur
              </Button>
            </ButtonGroup>
            <div className={classes.shareIcons}>
              <Typography className="h6">Share this: </Typography>
              <EmailShareButton
                subject={`Info about ${product.nom}`}
                body={`Hello ${
                  product.user.nom ? product.use.nom : ''
                }. I would like to have more details about ${product.nom}.`}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url="www.github.com"
                quote="I found this from dieunde.com"
                hashtag={`#${product.catégorie}`}
              >
                <FacebookIcon round={true} size={32} />
              </FacebookShareButton>
              <WhatsappShareButton
                url="www.github.com"
                title="I found this"
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton url="www.github.com" title="I found this">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
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
      <ProduitsSimilaires similaires={product.similaires} />
    </Container>
  );
}

export default ProductPage;
