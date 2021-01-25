import {
  CREATING_FAVORITE,
  CREATING_PRODUCT,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  DELETING_USER_PRODUCT,
  FAVORITES_FETCH_SUCCESS,
  FAVORITE_CREATED,
  FETCH_ALL_PRODUCTS,
  FETCH_USER_PRODUCTS_SUCCESS,
  ONE_PRODUCT_FETCH_SUCCESS,
  PRODUCT_CREATION_FAILURE,
  PRODUCT_CREATION_SUCCESS,
  PRODUCT_EDIT_FAILURE,
  PRODUCT_EDIT_SUCCESS,
  REDIRECT,
  REDIRECT_AFTER_CREATING_PRODUCT,
  STOP_REDIRECT,
  STOP_REDIRECT_AFTER_CREATING_PRODUCT,
  UPDATING_PRODUCT,
} from '../actions/actions';
import {
  PRODUCT_VALIDATE_SUCCESS,
  VALIDATING_PRODUCT,
} from '../actions/adminactions';
const products = (state = { allProductsFetched: false }, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return { ...state, produits: [action.payload], allProductsFetched: true };
    case CREATING_PRODUCT:
      return {
        ...state,
        creatingProduct: true,
        productCreationErrors: [],
        productCreated: false,
      };
    case PRODUCT_CREATION_SUCCESS:
      return {
        ...state,
        product: action.payload,
        creatingProduct: false,
        productCreated: true,
        productCreationErrors: [],
      };
    case PRODUCT_CREATION_FAILURE:
      return {
        ...state,
        productCreationErrors: action.payload,
        productCreated: false,
        creatingProduct: false,
      };
    case REDIRECT_AFTER_CREATING_PRODUCT:
      return {
        ...state,
        redirectAfterCreatingProduct: true,
      };
    case STOP_REDIRECT_AFTER_CREATING_PRODUCT:
      return {
        ...state,
        redirectAfterCreatingProduct: false,
      };

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
    case UPDATING_PRODUCT: {
      return {
        ...state,
        updatingProduct: true,
        productEditSuccess: true,
        productEditFailure: false,
      };
    }
    case PRODUCT_EDIT_SUCCESS: {
      return {
        ...state,
        productEditSuccess: true,
        updatingProduct: false,
        productEditFailure: false,
      };
    }
    case PRODUCT_EDIT_FAILURE: {
      return {
        ...state,
        productEditSuccess: false,
        updatingProduct: false,
        productEditFailure: true,
      };
    }
    case REDIRECT: {
      return {
        ...state,
        redirect: true,
      };
    }
    case STOP_REDIRECT: {
      return {
        ...state,
        redirect: false,
        productEditSuccess: false,
      };
    }
    case DELETING_USER_PRODUCT: {
      return {
        ...state,
        deletingProduct: true,
        productDeleteSuccess: false,
        productDeleteFailure: false,
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        deletingProduct: false,
        productDeleteSuccess: true,
        productDeleteFailure: false,
      };
    }
    case DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        deletingProduct: false,
        productDeleteSuccess: false,
        productDeleteFailure: true,
      };
    }
    case VALIDATING_PRODUCT: {
      return {
        ...state,
        validateSuccess: false,
      };
    }
    case PRODUCT_VALIDATE_SUCCESS:
      return {
        ...state,
        validateSuccess: true,
      };

    default:
      return state;
  }
};

export default products;
