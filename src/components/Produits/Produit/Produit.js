import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../../actions/actions';
import AlertMessage from '../../AlertMessage/AlertMessage';
import {
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import produitStyles from './Produit.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 290,
    height: 380,
    margin: '10px',
    textAlign: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    height: 90,
    textOverflow: 'ellipsis',
  },
}));

function Produit({ nom, description, images, id }) {
  // console.log(JSON.parse(images)[0]);
  const classes = useStyles();
  const { user } = useSelector((state) => state.userReducer);
  const { creatingFavorite, favoriteCreated, productAddedId } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const userId = user?.id;

  const handleAddToFavorites = () => {
    const params = {
      user_id: userId,
      produit_id: id,
    };
    user && !creatingFavorite && dispatch(addToFavorites(params));
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          className={`${classes.cardHeader} ${produitStyles.cardHeader}`}
          // avatar={
          //   <Avatar aria-label="recipe" className={classes.avatar}>
          //     P
          //   </Avatar>
          // }

          title={`${nom}`}
          // subheader="September 14, 2016"
        />

        <CardMedia
          className={classes.media}
          image={images && JSON.parse(images)[0].secure_url}
          title={nom}
        />
        <CardContent>
          {productAddedId === id && favoriteCreated && (
            <AlertMessage message="Ajouté aux favoris" />
          )}

          {/* <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography> */}
        </CardContent>

        <CardActions className={classes.cardActions}>
          {/* {user && (
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
            disabled={creatingFavorite}
          >
            <FavoriteIcon />
          </IconButton>
        )} */}
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}

          <Button
            component={Link}
            to={`/produits/${id}`}
            variant="contained"
            color="secondary"
          >
            Consulter
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Produit;
