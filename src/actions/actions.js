import axios from 'axios';
import {
  addToFavoritesHelper,
  changeProfileInfoHelper,
  connectUserOnLoadHelper,
  createProduct,
  createUserHelper,
  deleteAccountHelper,
  deleteProductHelper,
  fetchProducts,
  getFavoritesHelper,
  getOneProduct,
  getUserProductsHelper,
  logoutUserHelper,
  recoverPasswordHelper,
  registerUser,
  removeFavoriteHelper,
  resetPasswordEmailHelper,
  signInUserHelper,
  updatePasswordHeloper,
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
export const FAVORITES_FETCH_SUCCESS = 'FAVORITES_FETCH_SUCCESS';
export const SIGNIN_ON_LOAD_SUCCESS = 'SIGNIN_ON_LOAD_SUCCESS';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATING_PASSWORD = 'UPDATING_PASSWORD';
export const ACCOUNT_REMOVAL_SUCCESS = 'ACCOUNT_REMOVAL_SUCCESS';
export const GETTING_USER_PRODUCTS = 'GETTING_USER_PRODUCTS';
export const FETCH_USER_PRODUCTS_SUCCESS = 'FETCH_USER_PRODUCTS_SUCCESS';
export const PRODUCT_EDIT_SUCCESS = ' PRODUCT_EDIT_SUCCESS';
export const PRODUCT_EDIT_FAILURE = 'PRODUCT_EDIT_FAILURE';
export const UPDATING_PRODUCT = 'UPDATING_PRODUCT';
export const REDIRECT = 'REDIRECT';
export const STOP_REDIRECT = 'STOP_REDIRECT';
export const DELETING_USER_PRODUCT = 'DELETING_USER_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const RESETING_PASSWORD = 'RESETING_PASSWORD';
export const RESET_PASSWORD_EMAIL_SENT = 'RESET_PASSWORD_EMAIL_SENT';
export const RESET_PASSWORD_EMAIL_UNSENT = 'RESET_PASSWORD_EMAIL_UNSENT';
export const PASSWORD_RESET_FROM_EMAIL_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FROM_EMAIL_FAILURE = 'PASSWORD_RESET_FAILURE';

export const getAllProducts = (admin = false) => async (dispatch) => {
  const { data } = await fetchProducts(admin);
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

export const signInUser = (email, password, remember) => async (dispatch) => {
  dispatch({
    type: SIGNING_ATTEMPT,
  });
  try {
    const res = await signInUserHelper(email, password);
    const { data, headers } = res;
    remember &&
      localStorage.setItem(
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
    if (error.response) {
      dispatch({
        type: SIGNIN_ERROR,
        payload: error.response.data.errors,
      });
    }
  }
};

export const createUser = (user) => async (dispatch) => {
  dispatch({
    type: SIGNUP_ATTEMPT,
  });

  try {
    const res = await createUserHelper(user);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    const { data, headers } = res;
    localStorage.setItem(
      'user',
      JSON.stringify({
        'access-token': headers['access-token'],
        client: headers['client'],
        uid: data.data.uid,
      })
    );
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data.errors.full_messages,
      });
    }
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await logoutUserHelper();
    if (data.success) {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
      localStorage.removeItem('user');
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
  try {
    const { data } = await connectUserOnLoadHelper();
    dispatch({
      type: SIGNIN_ON_LOAD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToFavorites = (params) => async (dispatch) => {
  try {
    const { data } = await addToFavoritesHelper(params);
    dispatch({
      type: FAVORITE_CREATED,
      payload: params.produit_id,
    });
    dispatch({
      type: FAVORITES_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeProfileInfo = (user) => async (dispatch) => {
  try {
    const { data } = await changeProfileInfoHelper(user);
  } catch (error) {}
};

export const getFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await getFavoritesHelper(id);
    dispatch({
      type: FAVORITES_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorite = (params) => async (dispatch) => {
  try {
    const { data } = await removeFavoriteHelper(params);
    dispatch({
      type: FAVORITES_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (params) => async (dispatch) => {
  dispatch({
    type: UPDATING_PASSWORD,
  });
  try {
    const { data } = await updatePasswordHeloper(params);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
    });
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      const { full_messages } = data.errors;
      dispatch({
        type: UPDATE_PASSWORD_ERROR,
        payload: full_messages,
      });
    }
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    const { data } = await deleteAccountHelper();
    dispatch({
      type: ACCOUNT_REMOVAL_SUCCESS,
    });
  } catch (error) {}
};

export const getUserProducts = (id) => async (dispatch) => {
  dispatch({
    type: GETTING_USER_PRODUCTS,
  });
  try {
    const { data } = await getUserProductsHelper(id);
    console.log(data);
    dispatch({
      type: FETCH_USER_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: DELETING_USER_PRODUCT,
  });
  try {
    const { data } = await deleteProductHelper(id);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
    });
  }
};

export const updateProduct = (formData, id) => async (dispatch) => {
  dispatch({
    type: UPDATING_PRODUCT,
  });
  try {
    const response = await fetch(`http://localhost:3001/produits/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const resp = await response.json();
    if (resp.status === 'updated') {
      dispatch({
        type: PRODUCT_EDIT_SUCCESS,
      });
      redirect(dispatch);
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAILURE,
    });
  }
};

export const recoverPassword = (email) => async (dispatch) => {
  dispatch({
    type: RESETING_PASSWORD,
  });
  try {
    const { data } = await recoverPasswordHelper(email);
    dispatch({
      type: RESET_PASSWORD_EMAIL_SENT,
      payload: data.message,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
    dispatch({
      type: RESET_PASSWORD_EMAIL_UNSENT,
      payload: error.response.data.errors,
    });
  }
};

export const resetPasswordEmail = (params) => async (dispatch) => {
  try {
    const { data } = await resetPasswordEmailHelper(params);
    dispatch({
      type: PASSWORD_RESET_FROM_EMAIL_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: PASSWORD_RESET_FROM_EMAIL_FAILURE,
        payload: error.response.data.errors.full_messages,
      });
    }
  }
};
const redirect = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: REDIRECT,
    });
    dispatch({
      type: STOP_REDIRECT,
    });
  }, 2000);
};
