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
import './ProductPage.css';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import 'react-image-gallery/styles/css/image-gallery.css';
import Carousel from 'react-elastic-carousel';
import CurrencyFormat from 'react-currency-format';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  sliderContainer: {
    width: '100%',
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

  imgContainer: {
    width: '100%',
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
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const whatsappLink = useRef(null);
  const pageUrl = window.location.href;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/produits/${id}`
        );
        const data = await response.json();
        if (data) {
          setProduct(data);
          setLoading(false);
          setPictures(JSON.parse(data.images));
          console.log(data.images);
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
          {product.nom}
        </Typography>
        <Grid className={classes.gridContainer} container spacing={1}>
          <Grid
            className={classes.imagesContainer}
            item
            container
            xs={12}
            xl={12}
          >
            {/* <Carousel
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
            </Carousel> */}

            <div className={classes.sliderContainer}>
              <Slider {...settings}>
                {JSON.parse(product.images).map((image, idx) => (
                  <div className={classes.imgContainer}>
                    <img
                      src={image.secure_url}
                      alt=""
                      key={idx}
                      className={classes.productImg}
                    />
                  </div>
                ))}
              </Slider>
            </div>
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
                url={pageUrl}
                title="J'ai trouvé ceci sur dakarvoitures.com"
                separator=": "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={pageUrl}
                title="J'ai trouvé ceci sur dakarvoitures.com"
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
