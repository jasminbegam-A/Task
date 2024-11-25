import axios from 'axios';

const API_URL = 'https://crud-mern-8pvs.onrender.com/products';

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const createProduct = async (product) => {
  return await axios.post(API_URL, product);
};

export const updateProduct = async (id, product) => {
  return await axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
