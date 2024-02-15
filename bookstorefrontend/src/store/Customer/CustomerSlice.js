import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/store/Customer/CustomerApi';

const initialState = {
    customers: [],
    status: 'idle',
    error: null,
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const { id, ...updatedCustomer } = action.payload;
                const existingCustomerIndex = state.customers.findIndex((customer) => customer.id === id);
                if (existingCustomerIndex !== -1) {
                    state.customers[existingCustomerIndex] = { id, ...updatedCustomer };
                }
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter((customer) => customer.id !== action.payload);
            });
    },
});

export const {...actions} =customerSlice;

export default customerSlice.reducer;
