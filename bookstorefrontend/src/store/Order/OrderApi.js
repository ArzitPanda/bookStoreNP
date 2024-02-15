import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${baseURL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${baseURL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${baseURL}/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${baseURL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

