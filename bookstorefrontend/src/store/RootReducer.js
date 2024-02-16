import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './Category/CategorySlice';
import authorReducer from './Author/AuthorSlice'
import bookReducer from './Book/BookSlice'
import customerReducer from './Customer/CustomerSlice';
import orderReducer from './Order/OrderSlice';
import NotificationReducer from './NotificationSlice'

const rootReducer = combineReducers({
  categories: categoryReducer,
  authors:authorReducer,
  books:bookReducer,
  customers:customerReducer,
  orders:orderReducer,
  notification:NotificationReducer,
  // Add other reducers here if needed
});

export default rootReducer;