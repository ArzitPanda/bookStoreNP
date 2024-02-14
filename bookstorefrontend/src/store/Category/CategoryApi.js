// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your API base URL

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (categoryName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, { name: categoryName });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
};

export const updateCategory = async (categoryId, categoryName) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, { name: categoryName });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
};
