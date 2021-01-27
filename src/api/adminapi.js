import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const validateProductHelper = (id) => {
  return axios.post(`${baseUrl}/admin/validate_product/${id}`);
};

export const addToSelectionHelper = (id) => {
  return axios.post(`${baseUrl}/admin/add_to_selection/`, { id });
};
