import { createSlice } from '@reduxjs/toolkit';
import { getAllBooks, createBook, updateBook, deleteBook } from './BookApi';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getAllBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    getAllBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createBookSuccess: (state, action) => {
      state.loading = false;
      state.books.push(action.payload);
    },
    createBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateBookSuccess: (state, action) => {
      state.loading = false;
      state.books = state.books.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    },
    updateBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    deleteBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllBooksStart,
  getAllBooksSuccess,
  getAllBooksFailure,
  createBookStart,
  createBookSuccess,
  createBookFailure,
  updateBookStart,
  updateBookSuccess,
  updateBookFailure,
  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailure,
} = bookSlice.actions;

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(getAllBooksStart());
  try {
    const books = await getAllBooks();
    dispatch(getAllBooksSuccess(books));
  } catch (error) {
    dispatch(getAllBooksFailure(error.message));
  }
};

export const addBook = (bookData) => async (dispatch) => {
  dispatch(createBookStart());
  try {
    const newBook = await createBook(bookData);
    dispatch(createBookSuccess(newBook));
  } catch (error) {
    dispatch(createBookFailure(error.message));
  }
};

export const modifyBook = (id, bookData) => async (dispatch) => {
  dispatch(updateBookStart());
  try {
    const updatedBook = await updateBook(id, bookData);
    dispatch(updateBookSuccess(updatedBook));
  } catch (error) {
    dispatch(updateBookFailure(error.message));
  }
};

export const removeBook = (id) => async (dispatch) => {
  dispatch(deleteBookStart());
  try {
    await deleteBook(id);
    dispatch(deleteBookSuccess(id));
  } catch (error) {
    dispatch(deleteBookFailure(error.message));
  }
};

export default bookSlice.reducer;
