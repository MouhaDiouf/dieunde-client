import {
  Container,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

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
  voitures,
  setsearchnom,
  setsearchmarque,
  setmaxPrix,
  setminPrix,
  minPrix,
  maxPrix,
}) {
  const classes = useStyles();
  let marques = [];
  if (voitures) {
    marques = voitures.map((voiture) => {
      return voiture.marque;
    });
    marques = [...new Set(marques), 'Toutes les marques'];
  }

  const [selectMarques, setselectMarques] = useState('Toutes les marques');
  const handleChangeMarque = (e) => {
    setsearchmarque(e.target.value);
    setselectMarques(e.target.value);
  };

  const handleMaxPrix = (e) => {
    const number = e.target.value.replace(/ /g, '');
    setmaxPrix(number);
  };

  const handleMinPrix = (e) => {
    const number = e.target.value.replace(/ /g, '');
    setminPrix(number);
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
        name="marques"
        id="marques"
        value={selectMarques}
        onChange={handleChangeMarque}
      >
        {marques.map((marque, idx) => (
          <MenuItem name={marque} key={idx} value={marque}>
            {marque}
          </MenuItem>
        ))}
      </Select>
      {/* <PriceSlider /> */}
      {/* <PriceSlider /> */}
      <Typography>Prix:</Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <NumberFormat
            thousandSeparator={' '}
            customInput={TextField}
            label="min"
            onChange={handleMinPrix}
          />
          {/* </TextField> */}
        </Grid>
        <Grid item md={6} xs={12}>
          <NumberFormat
            thousandSeparator={' '}
            customInput={TextField}
            label="max"
            onChange={handleMaxPrix}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default Search;
