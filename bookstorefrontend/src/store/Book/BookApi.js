import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching book by ID: ' + error.message);
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${BASE_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating book: ' + error.message);
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${BASE_URL}/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating book: ' + error.message);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting book: ' + error.message);
  }
};
