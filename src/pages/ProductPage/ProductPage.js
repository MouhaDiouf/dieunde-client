import {
  Button,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  List,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProduitsSimilaires from '../../components/ProduitsSimilaires/ProduitsSimilaires';
// import { addToFavorites } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import CurrencyFormat from 'react-currency-format';
import Carousel from 'react-elastic-carousel';

const breakpoints = [{ width: 1, itemsToShow: 1 }];
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImgCarousel: {
    width: '5px',
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    margin: '10px 0',
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infosVendeur: {
    fontSize: '20px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  productPrice: {
    margin: '10px 0',
    color: '#dd0426',
    fontWeight: 'bold',
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
  gridContainer: {
    margin: '20px 0',
  },
  whatsappLinkMessage: {
    display: 'none',
  },
  whatsappMessageIcon: {
    cursor: 'pointer',
    margin: '0 10px',
  },

  modalContainer: {
    backgroundColor: 'white',
    minWidth: '30%',
    textAlign: 'center',
    maxWidth: '60%',
  },
  messageIconsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productImg: {
    maxWidth: '500px',
    minWidth: '350px',
    objectFit: 'contain',
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
  const whatsappLink = useRef(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleAddToFavorites = () => {
  //   if (user && !creatingFavorite) {
  //     const params = {
  //       user_id: user.id,
  //       produit_id: id,
  //     };
  //     dispatch(addToFavorites(params));
  //   } else {
  //     setalert(true);
  //   }
  // };
  const sendWhatsappMessage = () => {
    whatsappLink.current.click();
  };
  useEffect(() => {
    const fetchOneProduct = async () => {
      console.log('FETCH ONE PRODUCT CALLED');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/produits/${id}`
        );
        const data = await response.json();
        console.log(data);
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

  const handleCallVendor = (e, vendor) => {
    window.open(`tel:+221${vendor}`, '_self');
  };

  if (loading) {
    return 'Chargement...';
  }
  if (!product) {
    return <h2>Aucun produit à afficher</h2>;
  }
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* {productAddedId === id && favoriteCreated && (
        <AlertMessage message="Ajouté à vos favoris" />
      )} */}
      {/* {alert && (
        <AlertMessage
          message="Vous ne pouvez pas ajouter aux favoris. Veuillez vous connecter pour cela."
          type="warning"
        />
      )} */}

      <Paper className={classes.innerContainer} elevation={3}>
        <Typography variant="h4" className={classes.title}>
          Détails pour {product.nom}
        </Typography>
        <Grid className={classes.gridContainer} container spacing={1}>
          <Grid
            className={classes.imagesContainer}
            item
            container
            xs={12}
            xl={12}
          >
            <Carousel
              className={classes.carouselContainer}
              breakPoints={breakpoints}
            >
              {JSON.parse(product.images).map((image, idx) => (
                <img
                  src={image.secure_url}
                  alt=""
                  key={idx}
                  className={classes.productImg}
                />
              ))}
            </Carousel>
          </Grid>

          <Grid item xs={12} xl={12} className={classes.contentAndBtn}>
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
              <Chip label={product.marque} />
              <Chip label={product.année} />
              <Chip label={`${product.kilométrage} km`} />
              <Chip label={product.etat} />
            </Container>

            <ButtonGroup className={classes.btnGroup}>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleAddToFavorites}
              >
                Ajouter Aux Favoris
              </Button> */}
              <Button className={classes.faorisBtn} onClick={handleOpen}>
                Informations Vendeur
              </Button>
            </ButtonGroup>
            <div className={classes.shareIcons}>
              <Typography className="h6">Partager ce produit: </Typography>

              <FacebookShareButton
                url="www.github.com"
                quote="J'ai trouvé ceci sur dieunde.com"
                hashtag={`#${product.catégorie}`}
              >
                <FacebookIcon round={true} size={32} />
              </FacebookShareButton>
              <WhatsappShareButton
                url="www.github.com"
                title="J'ai trouvé ceci sur dieunde.com"
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url="www.github.com"
                title="J'ai trouvé ceci sur dieunde.com"
              >
                <TwitterIcon size={35} round />
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
          <List className={classes.infosVendeur}>
            <p>{product.user.name}</p>
            <div className={classes.messageIconsContainer}>
              <Button
                onClick={(e) => handleCallVendor(e, product.user.telephone)}
                variant="contained"
                color="primary"
              >
                Appeler
              </Button>
              <a
                href={`https://api.whatsapp.com/send?phone=+221${product.user.telephone}&text=Bonjour, je suis intéressé par votre annonce ${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                className={classes.whatsappLinkMessage}
                ref={whatsappLink}
              >
                whatsapp
              </a>
              <WhatsappIcon
                size={32}
                round
                className={classes.whatsappMessageIcon}
                onClick={sendWhatsappMessage}
              />
              {/* <EmailShareButton
                to={product.user.email}
                subject={`Informations sur ${product.nom}`}
                body={`Bonjour ${
                  product.user.nom ? product.use.nom : ''
                }. J'aimerais avoir plus de détails sur ${product.nom}.`}
              >
                <EmailIcon size={32} round />
              </EmailShareButton> */}
            </div>
          </List>
        </Container>
      </Modal>
      {product.similaires.length && (
        <ProduitsSimilaires similaires={product.similaires} />
      )}
    </Container>
  );
}

export default ProductPage;
