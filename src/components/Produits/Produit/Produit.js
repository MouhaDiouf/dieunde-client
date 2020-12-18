import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
function Produit({ nom, description }) {
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper>
        <Typography variant="h5">{nom}</Typography>
      </Paper>
    </Grid>
  );
}

export default Produit;
