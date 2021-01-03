import {
  Button,
  Container,
  FormControl,
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
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
function NouveauProduit() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [catégorie, setcatégorie] = useState('smartphones');
  const [image, setimage] = useState(null);
  const onImageChange = (e) => {
    setimage(e.target.files[0]);
  };
  const { creatingProduct, productCreated } = useSelector(
    (state) => state.products
  );

  const classes = useStyles();
  const handleCreateProduct = (e) => {
    console.log('submitted');
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('catégorie', catégorie);
    formData.append('image', image);
    formData.append('prix', prix);
    formData.append('user_id', 1);
    dispatch(newProduct(formData));
  };

  return (
    <Container className={classes.root}>
      {productCreated && (
        <AlertMessage message="Product created successfully. We will review and approve it if it's valid" />
      )}

      <Typography variant="h2">Créer Produit</Typography>
      <form onSubmit={handleCreateProduct}>
        <FormControl>
          <TextField
            id="titre"
            type="text"
            onChange={(e) => {
              setNom(e.target.value);
            }}
            label="Product name"
            variant="outlined"
          />{' '}
          <br />
          <TextareaAutosize
            rowsMax={7}
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
            cols="7"
          />
          <br />
          <TextField
            type="number"
            name="prix"
            id="prix"
            onChange={(e) => setPrix(e.target.value)}
            label="Price (CFA)"
            variant="outlined"
          />{' '}
          <br />
          <TextField
            type="file"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          />
          <InputLabel id="catégorie">Category</InputLabel>
          <Select
            name="categorie"
            id="catégorie"
            onChange={(e) => setcatégorie(e.target.value)}
          >
            <MenuItem value="smartphones">smartphones</MenuItem>
            <MenuItem value="ordinateurs">ordinateurs</MenuItem>
            <MenuItem value="habillement">habillement</MenuItem>
            <MenuItem value="électroménager">électroménager</MenuItem>
            <MenuItem value="livres">livres</MenuItem>
            <MenuItem value="jouets">jouets</MenuItem>
          </Select>{' '}
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            disabled={creatingProduct}
          >
            {creatingProduct ? 'Creation Produit' : 'Créer Produit'}
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default NouveauProduit;
