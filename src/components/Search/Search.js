import {
  Container,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  range: {
    width: 300,
  },
  formContainer: {
    width: '300px',
    display: 'flex',
    margin: '0 auto',
  },
});
function Search({
  produits,
  setsearchnom,
  setminprix,
  setmaxprix,
  setsearchcat,
}) {
  const classes = useStyles();
  let Allproduits = useSelector((state) => state.products);

  let catégories = [];

  if (Allproduits) {
    Allproduits = Allproduits.produits[0];

    catégories = Allproduits.map((produit) => {
      return produit.catégorie;
    });
    catégories = [...new Set(catégories), 'Tout'];
  }

  const [selectCatégorie, setselectCatégorie] = useState('Tout');
  const [range, setrange] = useState([0, 900000]);
  const handleChangeCat = (e) => {
    setselectCatégorie(e.target.value);
    setsearchcat(e.target.value);
  };
  return (
    <FormControl className={classes.formContainer}>
      <TextField
        type="search"
        name="search"
        id="search"
        onChange={(e) => setsearchnom(e.target.value)}
        label="Rechercher"
      />{' '}
      <br />
      <Select
        name="catégories"
        id="catégories"
        value={selectCatégorie}
        onChange={handleChangeCat}
      >
        {catégories.map((catégorie, idx) => (
          <MenuItem name={catégorie} key={idx} value={catégorie}>
            {catégorie}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.root}>
        {/* <Typography id="range-slider" gutterBottom>
          Prix
        </Typography>
        <Slider
          value={range}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        /> */}
      </div>
    </FormControl>
  );
}

export default Search;
