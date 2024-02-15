import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './OrderApi';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const orders = await api.fetchOrders();
  return orders;
});

export const createNewOrder = createAsyncThunk('orders/createNewOrder', async (orderData) => {
  const newOrder = await api.createOrder(orderData);
  return newOrder;
});

export const updateExistingOrder = createAsyncThunk('orders/updateExistingOrder', async ({ orderId, orderData }) => {
  const updatedOrder = await api.updateOrder(orderId, orderData);
  return updatedOrder;
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async (orderId) => {
  await api.deleteOrder(orderId);
  return orderId;
});

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateExistingOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExistingOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        const existingOrderIndex = state.orders.findIndex((order) => order.id === updatedOrder.id);
        if (existingOrderIndex !== -1) {
          state.orders[existingOrderIndex] = updatedOrder;
        }
      })
      .addCase(updateExistingOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const orderId = action.payload;
        state.orders = state.orders.filter((order) => order.id !== orderId);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default orderSlice.reducer;
