import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the API
const baseURL = 'http://localhost:3000/api/customers';

// Fetch all customers from the server
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await axios.get(baseURL);
    return response.data;
});

// Create a new customer on the server
export const createCustomer = createAsyncThunk('customers/createCustomer', async (customerData) => {
    const response = await axios.post(baseURL, customerData);
    return response.data;
});

// Update a customer on the server
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, customerData }) => {
    const response = await axios.put(`${baseURL}/${id}`, customerData);
    return response.data;
});

// Delete a customer from the server
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId) => {
    await axios.delete(`${baseURL}/${customerId}`);
    return customerId;
});
