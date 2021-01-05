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
