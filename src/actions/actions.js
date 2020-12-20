import {
  createProduct,
  fetchProducts,
  getOneProduct,
  registerUser,
} from '../api/api';
export const CREATE_USER_SUCCESS = 'CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const PRODUCT_CREATION_SUCCESS = 'PRODUCT_CREATION_SUCCESS';
export const PRODUCT_CREATION_FAILURE = 'PRODUCT_CREATION_FAILURE';
export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
export const CREATING_PRODUCT = 'CREATING_PRODUCT';

export const getAllProducts = () => async (dispatch) => {
  const { data } = await fetchProducts();
  dispatch({
    type: FETCH_ALL_PRODUCTS,
    payload: data,
  });
};

export const signUpUser = (newUserCredentials) => async (dispatch) => {
  try {
    const { data } = await registerUser(newUserCredentials);
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_ERROR,
      payload: error.message,
    });
  }
};

export const newProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATING_PRODUCT,
    });
    // const response = await createProduct(formData);
    const response = await fetch('http://localhost:3001/produits/', {
      method: 'POST',
      body: formData,
    });

    const resp = await response.json();
    console.log(resp);
    dispatch({
      type: PRODUCT_CREATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATION_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchOneProduct = (id) => async (dispatch) => {
  const { data } = await getOneProduct(id);
  console.log('one product is ', data);
};
