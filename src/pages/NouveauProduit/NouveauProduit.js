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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { marques } from '../../data';
import axios from 'axios';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',

    marginBottom: '30px',
  },
  fileInput: {
    display: 'none',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80%',
  },
  photoLimitTitle: {
    margin: '10px auto',
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
  imagePreview: {
    width: '100px',
    height: '100px',
    contentFit: 'contain',
    maxWidth: '100%',
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

  title: {
    marginBottom: '20px',
  },
  addPictures: {
    cursor: 'pointer',
    border: '1px dashed blue',
    padding: '15px',
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  right: {
    height: '100vh',
    backgroundImage:
      'url(https://res.cloudinary.com/mouhamadou/image/upload/v1611505756/n1u045fftdelinmlpnld.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  submitBtn: {
    marginBottom: '20px',
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

function NouveauProduit() {
  const history = useHistory();
  const [imageError, setimageError] = useState('');
  const dispatch = useDispatch();
  const filesContainer = useRef(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [marque, setmarque] = useState('smartphones');
  const [images, setimages] = useState([]);
  let [uploadings, setuploadings] = useState([]);
  const [année, setannée] = useState('');
  const [kilométrage, setkilométrage] = useState('');
  const [etat, setetat] = useState('');
  const onImageChange = async (e) => {
    setimageError('');
    const file = e.target.files[0];
    if (file?.size > 1048576) {
      setimageError(
        "L'image est trop grande! Utilisez des images en dessous de 1MB"
      );

      return;
    }
    setuploadings((uploadings) => [...uploadings, 1]);

    if (images.length + uploadings.length >= 4) {
      setimageError(
        'Vous pouvez avoir 4 images au maximum. Remplacez les images précédentes ou supprimez les.'
      );
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch(`${process.env.REACT_APP_API_URL}/upload_image`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const remainingUploadings = [...uploadings];
        remainingUploadings.pop();
        const { secure_url, public_id } = res;
        setuploadings(remainingUploadings);
        setimages((images) => [...images, { secure_url, public_id }]);

        filesContainer.current.value = '';
      });
  };
  const handleRemoveImage = (e, public_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete_image`, {
        data: {
          public_id,
        },
      })
      .then(() => {
        let remainingImages = [...images];
        remainingImages = remainingImages.filter(
          (image) => image['public_id'] !== public_id
        );

        setimages(remainingImages);
        setuploadings(uploadings);
      });
  };

  const {
    creatingProduct,
    productCreated,
    productCreationErrors,
  } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.userReducer);
  const { redirectAfterCreatingProduct } = useSelector(
    (state) => state.products
  );

  const classes = useStyles();

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('marque', marque);
    formData.append('prix', prix);
    formData.append('images', JSON.stringify(images));
    formData.append('user_id', user.id);
    formData.append('etat', etat);
    formData.append('kilométrage', kilométrage);
    formData.append('année', année);
    dispatch(newProduct(formData));
  };
  if (redirectAfterCreatingProduct) {
    history.replace('/');
  }
  return (
    <Grid container className={classes.root}>
      <Grid item md={7} xs={false} sm={5} className={classes.right}></Grid>
      <Grid
        item
        md={5}
        xs={12}
        sm={7}
        component={Paper}
        elevation={6}
        className={classes.left}
      >
        {productCreated && (
          <AlertMessage message="Votre produit a été créé. Nous le mettrons en ligne après révision." />
        )}
        {productCreationErrors &&
          productCreationErrors.map((error) => (
            <AlertMessage message={error} />
          ))}
        <Typography variant="h4" className={classes.title}>
          Vendez votre voiture
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
                setNom(e.target.value);
              }}
              label="Modèle"
              variant="outlined"
            />{' '}
            <br />
            <textarea
              rows="7"
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              cols="7"
            />
            <br />
            <NumberFormat
              thousandSeparator={' '}
              customInput={TextField}
              name="prix"
              id="prix"
              onChange={(e) =>
                setPrix(parseInt(e.target.value.replace(/ /g, '')))
              }
              label="Prix (CFA)"
              variant="outlined"
            />
            <br />
            <NumberFormat
              customInput={TextField}
              type="text"
              name="année"
              id="année"
              label="Année"
              variant="outlined"
              format="####"
              onChange={(e) => setannée(e.target.value)}
            />
            <br />
            <NumberFormat
              customInput={TextField}
              type="text"
              name="kilométrage"
              id="kilométrage"
              label="Kilométrage"
              variant="outlined"
              thousandSeparator={' '}
              onChange={(e) => setkilométrage(e.target.value)}
            />
            <br />
            <FormControl fullWidth>
              <InputLabel>Etat</InputLabel>
              <Select
                name="etat"
                id="etat"
                onChange={(e) => setetat(e.target.value)}
                value={etat}
              >
                <MenuItem value="neuf">Neuf</MenuItem>
                <MenuItem value="occasion">Occasion</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel id="marque">Marque</InputLabel>
              <Select
                name="marque"
                id="marque"
                onChange={(e) => setmarque(e.target.value)}
                value={marque}
              >
                {marques.map((marque) => (
                  <MenuItem value={marque}>{marque}</MenuItem>
                ))}
              </Select>{' '}
              <br />
            </FormControl>
            <input
              className={classes.fileInput}
              type="file"
              id="files"
              ref={filesContainer}
              accept="image/*"
              onChange={onImageChange}
              data-buttonText="Your label here"
            />
            {imageError && <AlertMessage message={imageError} type="error" />}
            <label htmlFor="files" className={classes.addPictures}>
              <PhotoLibraryIcon /> Cliquez pour l'ajout d'images
            </label>
            <div>
              {images.length > 0 && (
                <Typography className={classes.photoLimitTitle}>
                  Vous pouvez ajouter jusqu'à 4 photos
                </Typography>
              )}
              <div className={classes.previewsParent}>
                {images.map((img, key) => {
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
            </div>
          </FormControl>
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.submitBtn}
            disabled={creatingProduct || uploadings.length}
          >
            {creatingProduct || uploadings.length ? 'Patientez...' : 'Vendre'}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default NouveauProduit;
