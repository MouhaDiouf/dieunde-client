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
import { useSelector } from 'react-redux';
import PriceSlider from '../../components/PriceSlider/PriceSlider';

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
  console.log(voitures);
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
    setmaxPrix(Number(e.target.value));
  };

  const handleMinPrix = (e) => {
    setminPrix(Number(e.target.value));
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
        <Grid item md={5} xs={12}>
          <TextField
            type="number"
            id="min"
            label="min"
            value={minPrix}
            onChange={handleMinPrix}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            type="number"
            id="max"
            label="max"
            value={maxPrix}
            onChange={handleMaxPrix}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default Search;
