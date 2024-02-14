import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers'; // Import your root reducer

const store = configureStore({
reducer: rootReducer,
//   middleware: [thunk], // Apply Redux Thunk middleware
});

export default store;