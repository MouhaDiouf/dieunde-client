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
