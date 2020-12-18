import {
  CREATING_PRODUCT,
  FETCH_ALL_PRODUCTS,
  PRODUCT_CREATION_FAILURE,
  PRODUCT_CREATION_SUCCESS,
} from '../actions/actions';
const products = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.payload;
    case CREATING_PRODUCT:
      return { ...state, creatingProduct: true };
    case PRODUCT_CREATION_SUCCESS:
      return { ...state, product: action.payload };
    case PRODUCT_CREATION_FAILURE:
      return { ...state, productCreationErro: action.payload };
    default:
      return state;
  }
};

export default products;
