import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CurrencyFormat from 'react-currency-format';
import { marques } from '../../data';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
const useStyles = makeStyles({
  root: {
    height: '100vh',
    textAlign: 'center',
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
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  submitBtn: {
    marginBottom: '20px',
  },
  avatar: {
    marginBottom: '10px',
    backgroundColor: 'red',
  },
});

function NouveauProduit() {
  const [imageError, setimageError] = useState('');
  const dispatch = useDispatch();
  const filesContainer = useRef(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [marque, setmarque] = useState('smartphones');
  const [images, setimages] = useState([]);
  const [uploadings, setuploadings] = useState([]);
  const [année, setannée] = useState('');
  const [kilométrage, setkilométrage] = useState('');
  const [etat, setetat] = useState('');
  const onImageChange = async (e) => {
    setimageError('');
    const file = e.target.files[0];
    console.log(file);
    if (file?.size > 10485760) {
      setimageError(
        "L'image est trop grande! Utilisez des images en dessous de 1MB"
      );

      return;
    }
    if (images.length >= 4) {
      setimageError(
        'Vous pouvez avoir 4 images au maximum. Remplacez les images précédentes ou supprimez les.'
      );
      return;
    }
    await setuploadings((uploadings) => [...uploadings, 1]);

    const formData = new FormData();
    formData.append('image', file);
    // formData.append('upload_preset', 'upload');
    // axios
    //   .post('https://api.cloudinary.com/v1_1/mouhamadou/image/upload', formData)
    //   .then((res) => {
    //     const { data } = res;
    //     console.log(res);
    //     console.log(data);
    //     const { url, asset_id } = data;
    //     setimages((images) => [...images, url]);
    //   });
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
        setimages((images) => [...images, { secure_url, public_id }]);
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
        let remainingImages = [...images];
        remainingImages = remainingImages.filter(
          (image) => image['public_id'] !== public_id
        );

        setimages(remainingImages);
        setuploadings(uploadings);
      });
  };

  const { creatingProduct, productCreated } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.userReducer);

  const classes = useStyles();

  const handleCreateProduct = (e) => {
    e.preventDefault();
    console.log(images);
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
        {imageError && <AlertMessage message={imageError} type="error" />}
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
              placeholder="Description du produit"
              cols="7"
            />
            <br />
            <TextField
              type="number"
              name="prix"
              id="prix"
              onChange={(e) => setPrix(e.target.value)}
              label="Prix (CFA)"
              variant="outlined"
            />
            <br />
            <TextField
              type="text"
              name="année"
              id="année"
              label="Aneée"
              variant="outlined"
              onChange={(e) => setannée(e.target.value)}
            />
            <br />
            <TextField
              type="text"
              name="année"
              id="année"
              label="Kilométrage"
              variant="outlined"
              onChange={(e) => setkilométrage(e.target.value)}
            />
            <br />
            <FormControl fullWidth>
              <InputLabel>Etat</InputLabel>
              <Select
                name="etat"
                id="etat"
                onChange={(e) => setetat(e.target.value)}
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
                {images.map((img) => {
                  const { secure_url, public_id } = img;
                  return (
                    <div className={classes.imagePreviewContainer}>
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

                {uploadings.map((uploading) => (
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
            disabled={creatingProduct}
          >
            {creatingProduct ? 'Patientez...' : 'Vendre'}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default NouveauProduit;
