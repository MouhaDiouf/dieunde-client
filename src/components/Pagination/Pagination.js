import { Container, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '30px 0',
  },
}));

function PaginationController({ productsPerPage, totalProducts, paginate }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };

  const numberOfPages = Math.ceil(totalProducts / productsPerPage);
  console.log('number of pages is ', numberOfPages);
  return (
    <Container className={classes.root} maxWidth="xl">
      <Pagination count={numberOfPages} page={page} onChange={handleChange} />
    </Container>
  );
}

export default PaginationController;
