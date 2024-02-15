import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './Category/CategorySlice';
import authorReducer from './Author/AuthorSlice'
import bookReducer from './Book/BookSlice'
import customerReducer from './Customer/CustomerSlice';
import orderReducer from './Order/OrderSlice';

const rootReducer = combineReducers({
  categories: categoryReducer,
  authors:authorReducer,
  books:bookReducer,
  customers:customerReducer,
  orders:orderReducer
  // Add other reducers here if needed
});

export default rootReducer;