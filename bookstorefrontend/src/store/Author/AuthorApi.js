import axios from 'axios';

const BASE_URL = 'https://bookstorenp.onrender.com/api'; // Assuming your server is running on this URL

export const fetchAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/authors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/authors`, authorData);
    return response.data;
  } catch (error) {
    console.error('Error creating author:', error);
    throw error;
  }
};

export const updateAuthor = async (authorId, authorData) => {
  try {
    const response = await axios.put(`${BASE_URL}/authors/${authorId}`, authorData);
    return response.data;
  } catch (error) {
    console.error(`Error updating author with ID ${authorId}:`, error);
    throw error;
  }
};

export const deleteAuthor = async (authorId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/authors/${authorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting author with ID ${authorId}:`, error);
    throw error;
  }
};
