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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../../actions/actions';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CurrencyFormat from 'react-currency-format';
import { marques } from '../../data';
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
});
function NouveauProduit() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [marque, setmarque] = useState('smartphones');
  const [image, setimage] = useState(null);
  const onImageChange = (e) => {
    setimage(e.target.files[0]);
  };
  const { creatingProduct, productCreated } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.userReducer);

  const classes = useStyles();
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('marque', marque);
    formData.append('image', image);
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
            <TextField
              type="file"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
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
      </Grid>
    </Grid>
  );
}

export default NouveauProduit;
