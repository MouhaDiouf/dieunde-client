import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import { updateProduct } from '../../actions/actions';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
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
        setLoading(false);
        setproductNom(data.nom);
        setproductDescription(data.description);
        setproductPrix(data.prix);
        setproductcatégorie(data.catégorie);
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
  const [productcatégorie, setproductcatégorie] = useState('');
  const [productimage, seproductimage] = useState(null);
  const history = useHistory();

  const onImageChange = (e) => {
    seproductimage(e.target.files[0]);
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
    if (!productcatégorie) {
      setproductcatégorie(catégorie);
    }
    console.log(productnom, productdescription, productcatégorie, productprix);
    const formData = new FormData();
    formData.append('nom', productnom);
    formData.append('description', productdescription);
    formData.append('catégorie', productcatégorie);
    if (productimage) formData.append('image', productimage);
    formData.append('prix', productprix);
    formData.append('user_id', user.id);

    dispatch(updateProduct(formData, id));
  };

  if (loading) {
    return 'Loading...';
  }
  let { nom, image, description, catégorie, prix } = productToEdit;
  redirect && history.goBack();
  return (
    <Grid container className={classes.root}>
      <Grid item md={6} xs={false} sm={5} className={classes.right}>
        <img src={image.url} className={classes.img} alt={nom} />
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
          <AlertMessage message="Product edited successfully" type="success" />
        )}

        {productEditFailure && (
          <AlertMessage
            message="Failed Updating Your Product. Please try again"
            type="error"
          />
        )}

        <Typography variant="h4" className={classes.title}>
          Update {nom}
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
              label="Product name"
              variant="outlined"
              value={productnom}
            />{' '}
            <br />
            <textarea
              rows="7"
              name="description"
              id="description"
              onChange={(e) => setproductDescription(e.target.value)}
              placeholder="Product description"
              cols="7"
              value={productdescription}
            />
            <br />
            <TextField
              type="number"
              name="prix"
              id="prix"
              onChange={(e) => setproductPrix(e.target.value)}
              label="Price (CFA)"
              variant="outlined"
              value={productprix}
            />{' '}
            <br />
            <TextField
              type="file"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="catégorie">Category</InputLabel>
            <Select
              name="categorie"
              id="catégorie"
              onChange={(e) => setproductcatégorie(e.target.value)}
              value={productcatégorie}
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
              disabled={updatingProduct}
            >
              {updatingProduct ? 'Updating Product' : 'Update'}
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}

export default EditProduct;
