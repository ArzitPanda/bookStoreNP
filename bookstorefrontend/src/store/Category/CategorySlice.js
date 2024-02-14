// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories as fetchCategoriesAPI ,createCategory as createCategoryAPI,deleteCategory as deleteCategoryAPI,updateCategory as updateCategoryAPI} from './CategoryApi'; // Import your API function

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};





export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return await fetchCategoriesAPI();
  }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryName) => {
      return await createCategoryAPI(categoryName);
    }
  );
  
  // Async thunk for deleting a category
  export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId) => {
      await deleteCategoryAPI(categoryId);
      return categoryId; // Return the deleted category ID
    }
  );
  
  // Async thunk for updating a category
  export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, categoryName }) => {
      return await updateCategoryAPI(categoryId, categoryName);
    }
  );




const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Define other reducers if needed
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const index = state.categories.findIndex(category => category.id === id);
        if (index !== -1) {
          state.categories[index].name = name;
        }
      });
  },
});

export const { ...actions } = categorySlice;
export default categorySlice.reducer;
