import {
  Avatar,
  Button,
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
import { Image } from 'cloudinary-react';

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
  imagePreview: {
    width: '100px',
    height: '100px',
    contentFit: 'contain',
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
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  avatar: {
    marginBottom: '10px',
    backgroundColor: 'red',
  },
  imagePreview: {
    width: '100px',
  },
});

function NouveauProduit() {
  const [imageUploaded, setimageUploaded] = useState(null);
  const [imageError, setimageError] = useState('');
  const dispatch = useDispatch();
  const filesContainer = useRef(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [marque, setmarque] = useState('smartphones');
  const [images, setimages] = useState([]);

  const onImageChange = (e) => {
    setimageError('');
    const file = e.target.files[0];
    console.log(file);
    if (file.size > 1048576) {
      setimageError(
        "L'image est trop grande! Utilisez des images en dessous de 1MB"
      );

      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload');
    axios
      .post('https://api.cloudinary.com/v1_1/mouhamadou/image/upload', formData)
      .then((res) => {
        const { data } = res;
        console.log(data);
        const { url, asset_id } = data;
        setimages((images) => [...images, { url, asset_id }]);
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
    formData.append('user_id', user.id);
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
              label="Nom"
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
            <input
              className="files"
              type="file"
              id="file"
              ref={filesContainer}
              accept="image/*"
              onChange={onImageChange}
              data-buttonText="Your label here"
            />
          </FormControl>

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
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={creatingProduct}
            >
              {creatingProduct ? 'Patientez...' : 'Vendre'}
            </Button>
          </FormControl>
        </form>
        <div>
          {images.map((img) => (
            <img src={img.url} alt="" className={classes.imagePreview} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default NouveauProduit;
