import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './Category/CategorySlice';
import authorReducer from './Author/AuthorSlice'
import bookReducer from './Book/BookSlice'

const rootReducer = combineReducers({
  categories: categoryReducer,
  authors:authorReducer,
  books:bookReducer
  // Add other reducers here if needed
});

export default rootReducer;