import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const fetchProducts = () => {
  return axios.get(`${baseUrl}/produits`);
};

export const registerUser = (newUserCredentials) => {
  return axios.post('http://localhost:3001/api/v1/auth', newUserCredentials);
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
  console.log('sigingUserHelper called!');
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
