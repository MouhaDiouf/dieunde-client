import {
  createProduct,
  fetchProducts,
  getOneProduct,
  registerUser,
  signInUserHelper,
} from '../api/api';
export const CREATE_USER_SUCCESS = 'CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const PRODUCT_CREATION_SUCCESS = 'PRODUCT_CREATION_SUCCESS';
export const PRODUCT_CREATION_FAILURE = 'PRODUCT_CREATION_FAILURE';
export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
export const CREATING_PRODUCT = 'CREATING_PRODUCT';
export const ONE_PRODUCT_FETCH_SUCCESS = 'ONE_PRODUCT_FETCH_SUCCESS';
export const ONE_PRODUCT_FETCH_ERROR = 'ONE_PRODUCT_FETCH_ERROR';
export const SIGNING_ATTEMPT = 'SIGNING_ATTEMPT';
export const SIGNIN_SUCCESS = 'SIGNING_SUCCESS';
export const SIGNIN_ERROR = 'SIGING_ERROR';

export const getAllProducts = () => async (dispatch) => {
  const { data } = await fetchProducts();
  console.log('data is ', data);
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
  try {
    const { data } = await getOneProduct(id);

    dispatch({
      type: ONE_PRODUCT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONE_PRODUCT_FETCH_ERROR,
      payload: error,
    });
  }
};

export const signInUser = (email, password) => async (dispatch) => {
  console.log(email, password);
  console.log('Singin Called');
  dispatch({
    type: SIGNING_ATTEMPT,
  });
  try {
    const { data } = await signInUserHelper(email, password);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNIN_ERROR,
    });
  }
};
