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
function Search({ voitures, setsearchnom, setsearchmarque, setmaxprix }) {
  const classes = useStyles();

  let marques = [];
  console.log(voitures);
  if (voitures) {
    marques = voitures.map((voiture) => {
      return voiture.marque;
    });
    marques = [...new Set(marques), 'Tout'];
  }

  const [selectMarques, setselectMarques] = useState('Tout');
  const [range, setrange] = useState([0, 900000]);
  const handleChangeMarque = (e) => {
    setsearchmarque(e.target.value);
    setselectMarques(e.target.value);
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
