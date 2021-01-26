import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const validateProductHelper = (id) => {
  return axios.post(`${baseUrl}/admin/validate_product/${id}`);
};

export const addToSelectionHelper = (id) => {
  return axios.post(`${baseUrl}/admin/add_to_selection/`, { id });
};
