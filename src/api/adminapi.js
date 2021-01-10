import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const validateProductHelper = (id) => {
  return axios.post(`${baseUrl}/admin/validate_product/${id}`);
};
