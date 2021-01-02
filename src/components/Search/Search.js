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

  const handleRangeChange = (event, newValue) => {
    setrange(newValue);
  };
  function valuetext(value) {
    return `${value} CFA`;
  }
  let catégories = [];

  if (produits) {
    catégories = produits.map((produit) => {
      return produit.catégorie;
    });
    catégories = [...new Set(catégories), 'All'];
  }

  const [selectCatégorie, setselectCatégorie] = useState('All');
  const [range, setrange] = useState([0, 900000]);
  const handleChangeCat = (e) => {
    setselectCatégorie(e.target.value);
  };
  return (
    <FormControl className={classes.formContainer}>
      <TextField
        type="search"
        name="search"
        id="search"
        onChange={(e) => setsearchnom(e.target.value)}
        label="Search"
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
        <Typography id="range-slider" gutterBottom>
          Prix
        </Typography>
        <Slider
          value={range}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    </FormControl>
  );
}

export default Search;
