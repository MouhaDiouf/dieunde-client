import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import { updateProduct } from '../../actions/actions';
import { marques } from '../../data';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80%',
  },

  fileInput: {
    display: 'none',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    contentFit: 'contain',
    maxWidth: '100%',
  },
  addPictures: {
    cursor: 'pointer',
    border: '1px dashed blue',
    padding: '15px',
  },
  title: {
    marginBottom: '20px',
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  right: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    zIndex: '-2',
    height: '100%',
    objectFit: 'contain',
  },
  uploadingDiv: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewsParent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px auto',
    flexWrap: 'wrap',
  },
  imagePreviewContainer: {
    position: 'relative',
    margin: '10px',
  },
  closeIcon: {
    position: 'absolute',
    right: -10,
    top: -15,
    background: 'red',
    color: 'white',
    borderRadius: '25px',
    cursor: 'pointer',
  },
  first: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    height: '100px',
    width: '100px',
  },
  avatar: {
    marginBottom: '10px',
    backgroundColor: 'red',
  },
});

function EditProduct() {
  useEffect(() => {
    axios
      .get(`http://localhost:3001/produits/${id}`)
      .then((res) => {
        const { data } = res;
        setproductToEdit(data);
        setproductNom(data.nom);
        setproductDescription(data.description);
        setproductPrix(data.prix);
        setproductmarque(data.marque);
        setproductimages(JSON.parse(data.images));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const { user } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  const [productToEdit, setproductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [productnom, setproductNom] = useState('');
  const [productdescription, setproductDescription] = useState('');
  const [productprix, setproductPrix] = useState(0);
  const [productmarque, setproductmarque] = useState('');
  const [uploadings, setuploadings] = useState([]);
  const [productimages, setproductimages] = useState([]);
  const history = useHistory();
  const [imageError, setimageError] = useState('');
  const filesContainer = useRef(null);

  const onImageChange = async (e) => {
    setimageError('');
    const file = e.target.files[0];
    if (file?.size > 1048576) {
      setimageError(
        "L'image est trop grande! Utilisez des images en dessous de 1MB"
      );

      return;
    }
    if (productimages.length + uploadings.length >= 4) {
      setimageError(
        'Vous pouvez avoir 4 images au maximum. Remplacez les images précédentes ou supprimez les.'
      );
      return;
    }
    setuploadings((uploadings) => [...uploadings, 1]);

    const formData = new FormData();
    formData.append('image', file);
    console.log('before fetching...');
    fetch('http://localhost:3001/upload_image', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const remainingUploadings = [...uploadings];
        remainingUploadings.pop();
        setuploadings(remainingUploadings);
        const { secure_url, public_id } = res;
        setproductimages((productimages) => [
          ...productimages,
          { secure_url, public_id },
        ]);
        filesContainer.current.value = '';
      });
  };
  const handleRemoveImage = (e, public_id) => {
    axios
      .delete('http://localhost:3001/delete_image', {
        data: {
          public_id,
        },
      })
      .then(() => {
        let remainingImages = [...productimages];
        remainingImages = remainingImages.filter(
          (image) => image['public_id'] !== public_id
        );

        setproductimages(remainingImages);
        // setuploadings(uploadings);
      });
  };
  const {
    productEditSuccess,
    productEditFailure,
    updatingProduct,
    redirect,
  } = useSelector((state) => state.products);

  const classes = useStyles();
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!productnom) {
      setproductNom(nom);
    }
    if (!productdescription) {
      setproductDescription(description);
    }
    if (!productprix) {
      setproductPrix(prix);
    }
    if (!productmarque) {
      setproductmarque(productmarque);
    }

    const formData = new FormData();
    formData.append('nom', productnom);
    formData.append('description', productdescription);
    formData.append('marque', productmarque);
    formData.append('prix', productprix);
    formData.append('user_id', user.id);
    formData.append('images', JSON.stringify(productimages));

    dispatch(updateProduct(formData, id));
  };

  if (loading) {
    return 'Chargement...';
  }

  let { nom, description, prix } = productToEdit;
  redirect && history.goBack();
  return (
    <Grid container className={classes.root}>
      <Grid item md={6} sm={5} className={classes.right}>
        {productimages.length ? (
          <img
            src={productimages[0].secure_url}
            className={classes.img}
            alt={nom}
          />
        ) : (
          ''
        )}
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        sm={7}
        component={Paper}
        elevation={6}
        className={classes.left}
      >
        {productEditSuccess && (
          <AlertMessage message="Modifié avec succès" type="success" />
        )}

        {productEditFailure && (
          <AlertMessage
            message="Erreur lors de la modification de votre produit. Merci de réessayer dans quelques instants."
            type="error"
          />
        )}

        <Typography variant="h4" className={classes.title}>
          Modifier {nom}
        </Typography>
        <Avatar className={classes.avatar}>
          <LocalOfferIcon />
        </Avatar>
        <form onSubmit={handleCreateProduct} className={classes.form}>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="titre"
              type="text"
              onChange={(e) => {
                setproductNom(e.target.value);
              }}
              label="Nom"
              variant="outlined"
              value={productnom}
            />{' '}
            <br />
            <textarea
              rows="7"
              name="description"
              id="description"
              onChange={(e) => setproductDescription(e.target.value)}
              placeholder="Description"
              cols="7"
              value={productdescription}
            />
            <br />
            <NumberFormat
              customInput={TextField}
              thousandSeparator={' '}
              name="prix"
              id="prix"
              // onChange={(e) =>{setproductPrix(e.target.value)}
              onChange={(e) =>
                setproductPrix(parseInt(e.target.value.replace(/ /g, '')))
              }
              label="Prix (CFA)"
              variant="outlined"
              value={productprix}
            />{' '}
            <br />
            {imageError && <AlertMessage message={imageError} type="error" />}
            <TextField
              className={classes.fileInput}
              type="file"
              id="files"
              ref={filesContainer}
              accept="image/*"
              onChange={onImageChange}
              data-buttonText="Your label here"
            />
            <label htmlFor="files" className={classes.addPictures}>
              <PhotoLibraryIcon /> Cliquez pour l'ajout d'images
            </label>
            <div className={classes.previewsParent}>
              {productimages.map((img, key) => {
                const { secure_url, public_id } = img;

                return (
                  <div
                    className={`${key === 0 && classes.first} ${
                      classes.imagePreviewContainer
                    }`}
                  >
                    {key === 0 && (
                      <Chip label="Première image" color="secondary" />
                    )}
                    <HighlightOffIcon
                      className={classes.closeIcon}
                      onClick={(e) => handleRemoveImage(e, public_id)}
                    />
                    <img
                      src={secure_url}
                      alt="produit"
                      className={classes.imagePreview}
                    />
                  </div>
                );
              })}
              {uploadings.map(() => (
                <Paper className={classes.uploadingDiv}>
                  <CircularProgress disableShrink />
                </Paper>
              ))}
            </div>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="marque">Marque</InputLabel>
            <Select
              name="marque"
              id="marque"
              onChange={(e) => setproductmarque(e.target.value)}
              value={productmarque}
            >
              {marques.map((marque) => (
                <MenuItem value={marque}>{marque}</MenuItem>
              ))}
            </Select>{' '}
            <br />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={updatingProduct || uploadings.length}
            >
              {updatingProduct ? 'Patientez' : 'Modifier'}
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}

export default EditProduct;
