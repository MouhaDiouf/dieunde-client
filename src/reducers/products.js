import {
  CREATING_FAVORITE,
  CREATING_PRODUCT,
  FAVORITES_FETCH_SUCCESS,
  FAVORITE_CREATED,
  FETCH_ALL_PRODUCTS,
  FETCH_USER_PRODUCTS_SUCCESS,
  ONE_PRODUCT_FETCH_SUCCESS,
  PRODUCT_CREATION_FAILURE,
  PRODUCT_CREATION_SUCCESS,
} from '../actions/actions';
const products = (state = { allProductsFetched: false }, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return { ...state, produits: [action.payload], allProductsFetched: true };
    case CREATING_PRODUCT:
      return { ...state, creatingProduct: true };
    case PRODUCT_CREATION_SUCCESS:
      return {
        ...state,
        product: action.payload,
        creatingProduct: false,
        productCreated: true,
      };
    case PRODUCT_CREATION_FAILURE:
      return { ...state, productCreationErro: action.payload };
    case ONE_PRODUCT_FETCH_SUCCESS:
      return { ...state, productToShow: action.payload };
    case CREATING_FAVORITE: {
      return { ...state, creatingFavorite: true, favoriteCreated: false };
    }
    case FAVORITE_CREATED: {
      return {
        ...state,
        favoriteCreated: true,
        creatingFavorite: false,
        productAddedId: action.payload,
      };
    }
    case FAVORITES_FETCH_SUCCESS: {
      return {
        ...state,
        favorites: action.payload,
        favoritesFetched: true,
      };
    }
    case FETCH_USER_PRODUCTS_SUCCESS: {
      return {
        ...state,
        userProducts: action.payload,
        userProductsFetched: true,
      };
    }
    default:
      return state;
  }
};

export default products;
