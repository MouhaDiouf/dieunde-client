import axios from 'axios';
import {
  addToFavoritesHelper,
  connectUserOnLoadHelper,
  createProduct,
  createUserHelper,
  fetchProducts,
  getOneProduct,
  logoutUserHelper,
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
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const FAVORITE_CREATED = 'FAVORITE_CREATED';
export const CREATING_FAVORITE = 'CREATING_FAVORITE';

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
    const res = await signInUserHelper(email, password);
    console.log(res);
    const { data, headers } = res;
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        'access-token': headers['access-token'],
        client: headers['client'],
        uid: data.data.uid,
      })
    );
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

export const createUser = (user) => (dispatch) => {
  dispatch({
    type: SIGNUP_ATTEMPT,
  });
  axios
    .post(`http://localhost:3001/auth`, {
      ...user,
    })
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      const { data, headers } = res;
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          'access-token': headers['access-token'],
          client: headers['client'],
          uid: data.data.uid,
        })
      );
    })

    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SIGNUP_ERROR,
          payload: error.response.data.errors.full_messages,
        });
      }
    });
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await logoutUserHelper();
    if (data.success) {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
      sessionStorage.removeItem('user');
    } else {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectUser = () => async (dispatch) => {
  const { data } = await connectUserOnLoadHelper();
  console.log(data);
};

export const addToFavorites = (params) => async (dispatch) => {
  try {
    const { data } = await addToFavoritesHelper(params);
    console.log(data);
    dispatch({
      type: FAVORITE_CREATED,
      payload: params.produit_id,
    });
  } catch (error) {
    console.log(error);
  }
};
