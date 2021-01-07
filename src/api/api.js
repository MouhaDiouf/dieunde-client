import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const fetchProducts = () => {
  return axios.get(`${baseUrl}/produits`);
};

export const registerUser = (newUserCredentials) => {
  return axios.post('http://localhost:3001/auth', newUserCredentials);
};

export const createUserHelper = (user) => {
  return axios.post(`http://localhost:3001/auth`, {
    ...user,
    confirm_success_url: `http://localhost:3000/account-confirmation`,
  });
};

export const createProduct = (formData) => {
  return fetch(`${baseUrl}/produits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
};

export const getOneProduct = (id) => {
  return axios.get(`${baseUrl}/produits/${id}`);
};

export const signInUserHelper = (email, password) => {
  return axios.post(`http://localhost:3001/auth/sign_in/`, {
    email,
    password,
  });
};

export const logoutUserHelper = () => {
  const data = JSON.parse(sessionStorage.user);

  return axios.delete(`${baseUrl}/auth/sign_out`, {
    params: {
      'access-token': data['access-token'],
      client: data.client,
      uid: data.uid,
    },
  });
};

export const connectUserOnLoadHelper = () => {
  const data = JSON.parse(sessionStorage.user);

  return axios.get(`${baseUrl}/auth/validate_token`, {
    params: {
      'access-token': data['access-token'],
      client: data.client,
      uid: data.uid,
    },
  });
};

export const addToFavoritesHelper = (params) => {
  return axios.post(`${baseUrl}/create_liker`, { ...params });
};

export const getFavoritesHelper = (id) => {
  return axios.get(`${baseUrl}/favorites`, {
    params: { id },
  });
};

export const removeFavoriteHelper = (params) => {
  return axios.delete(`${baseUrl}/favorites`, {
    params: {
      ...params,
    },
  });
};

export const updatePasswordHeloper = (params) => {
  const data = JSON.parse(sessionStorage.user);

  return axios.put(`${baseUrl}/auth/password`, {
    ...data,
    ...params,
  });
};

export const deleteAccountHelper = () => {
  const data = JSON.parse(sessionStorage.user);
  return axios.delete(`${baseUrl}/auth`, {
    params: {
      'access-token': data['access-token'],
      client: data.client,
      uid: data.uid,
    },
  });
};

export const getUserProductsHelper = (id) => {
  return axios.get(`${baseUrl}/user/${id}/products`);
};

export const deleteProductHelper = (id) => {
  return axios.delete(`${baseUrl}/produits/${id}`);
};

export const recoverPasswordHelper = (email) => {
  return axios.post(`${baseUrl}/auth/password`, {
    email,
    redirect_url: `http://localhost:3000/new-password`,
  });
};

export const resetPasswordEmailHelper = (params) => {
  return axios.put(`${baseUrl}/auth/password`, {
    ...params,
  });
};
