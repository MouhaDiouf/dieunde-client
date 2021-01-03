import {
  CREATING_PRODUCT,
  FETCH_ALL_PRODUCTS,
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
      return { ...state, product: action.payload };
    case PRODUCT_CREATION_FAILURE:
      return { ...state, productCreationErro: action.payload };
    case ONE_PRODUCT_FETCH_SUCCESS:
      return { ...state, productToShow: action.payload };
    default:
      return state;
  }
};

export default products;
