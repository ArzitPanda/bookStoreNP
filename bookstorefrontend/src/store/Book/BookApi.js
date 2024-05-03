import axios from 'axios';

const BASE_URL = 'https://bookstorenp.onrender.com/api'; // Replace with your API base URL

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
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author_id', bookData.author_id);
    formData.append('category_id', bookData.category_id);
    formData.append('price', bookData.price);
    formData.append('image', bookData.image);

    const response = await axios.post(`${BASE_URL}/books`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
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
