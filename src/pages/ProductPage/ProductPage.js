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
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProduitsSimilaires from '../../components/ProduitsSimilaires/ProduitsSimilaires';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import CurrencyFormat from 'react-currency-format';
import Carousel from 'react-elastic-carousel';
import { Flex, Square } from 'react-elastic-carousel';
const breakpoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  // { width: 850, itemsToShow: 3 },
  // { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  // { width: 1450, itemsToShow: 5 },
  // { width: 1750, itemsToShow: 6 },
];
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
    width: '100%',
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
  const whatsappLink = useRef(null);
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
  const sendWhatsappMessage = () => {
    whatsappLink.current.click();
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
      {productAddedId === id && favoriteCreated && (
        <AlertMessage message="Ajouté à vos favoris" />
      )}
      {alert && (
        <AlertMessage
          message="Vous ne pouvez pas ajouter aux favoris. Veuillez vous connecter pour cela."
          type="warning"
        />
      )}

      <Paper className={classes.innerContainer} elevation={3}>
        <Typography variant="h4" className={classes.title}>
          Details pour {product.nom}
        </Typography>
        <Grid className={classes.gridContainer} container spacing={1}>
          <Grid
            className={classes.imagesContainer}
            item
            container
            xs={12}
            md={6}
          >
            <Carousel
              className={classes.carouselContainer}
              breakPoints={breakpoints}
              renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div>
                    {pages.map((page) => {
                      const isActivePage = activePage === page;
                      return (
                        <div
                          key={page}
                          onClick={() => onClick(page)}
                          active={isActivePage}
                        ></div>
                      );
                    })}
                  </div>
                );
              }}
            >
              {JSON.parse(product.images).map((image) => (
                <img
                  src={image.secure_url}
                  alt=""
                  className={classes.productImg}
                />
              ))}
            </Carousel>
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
      <ProduitsSimilaires similaires={product.similaires} />
    </Container>
  );
}

export default ProductPage;
