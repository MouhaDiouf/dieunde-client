import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    minWidth: 400,
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
}));

function Produit({ nom, description, image, id }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
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
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     P
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${nom}`}
        // subheader="September 14, 2016"
      />

      <CardMedia className={classes.media} image={image?.url} title={nom} />
      <CardContent>
        {productAddedId === id && favoriteCreated && (
          <AlertMessage message="Added to favorites" />
        )}

        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
            disabled={creatingFavorite}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <ButtonGroup>
          <Button
            component={Link}
            to={`/produits/${id}`}
            variant="contained"
            color="secondary"
          >
            Voir Plus
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

export default Produit;
