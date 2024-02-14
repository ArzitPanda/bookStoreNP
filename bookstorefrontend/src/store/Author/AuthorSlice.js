import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthors, createAuthor, updateAuthor, deleteAuthor } from './AuthorApi';

export const fetchAuthorsAsync = createAsyncThunk(
  'authors/fetchAuthors',
  async () => {
    const authors = await fetchAuthors();
    return authors;
  }
);

export const createAuthorAsync = createAsyncThunk(
  'authors/createAuthor',
  async (authorData) => {
    const newAuthor = await createAuthor(authorData);
    return newAuthor;
  }
);

export const updateAuthorAsync = createAsyncThunk(
  'authors/updateAuthor',
  async ({ authorId, authorData }) => {
    const updatedAuthor = await updateAuthor(authorId, authorData);
    return updatedAuthor;
  }
);

export const deleteAuthorAsync = createAsyncThunk(
  'authors/deleteAuthor',
  async (authorId) => {
    await deleteAuthor(authorId);
    return authorId;
  }
);

const initialState = {
  authors: [],
  status: 'idle',
  error: null,
};

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthorsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload;
      })
      .addCase(fetchAuthorsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAuthorAsync.fulfilled, (state, action) => {
        state.authors.push(action.payload);
      })
      .addCase(updateAuthorAsync.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingAuthor = state.authors.find((author) => author.id === id);
        if (existingAuthor) {
          Object.assign(existingAuthor, action.payload);
        }
      })
      .addCase(deleteAuthorAsync.fulfilled, (state, action) => {
        state.authors = state.authors.filter((author) => author.id !== action.payload);
      });
  },
});
export const {...actions} =authorSlice; 
export default authorSlice.reducer;
