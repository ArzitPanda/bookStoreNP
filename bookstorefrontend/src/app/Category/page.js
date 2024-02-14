'use client'
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory, updateCategory } from '@/store/Category/CategorySlice';
import { Button, TextField, Typography, Grid, Paper, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Menu } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';






const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    dispatch(createCategory(newCategoryName));
    setNewCategoryName('');
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      dispatch(deleteCategory(selectedCategory.id));
      setSelectedCategory(null);
    }
    setOpenDeleteModal(false);
  };

  const handleUpdateCategory = () => {
    if (selectedCategory) {
      dispatch(updateCategory({ categoryId: selectedCategory.id, categoryName: updatedCategoryName }));
      setSelectedCategory(null);
    }
    setOpenUpdateModal(false);
    setUpdatedCategoryName('');
  };

  return (
    <div className="lg:ml-[350px]  mt-4">
      <Typography variant="h4" align="left" gutterBottom>
        Categories
      </Typography>
      <div className="mb-4 text-center flex items-center gap-2">
        <TextField
          label="New Category"
          className='w-10/12'
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreateCategory} sx={{height:50}}  className="ml-2 ">
          Add Category
        </Button>
      </div>

      <div className='text-lg'>List of Categories</div>
      <Grid container spacing={3} justifyContent="flex-start">
        {categories.map((category) => (
          <Grid item key={category.id}  >
           
              <Paper
                elevation={3}
                className="p-2 rounded cursor-pointer w-64 flex items-center justify-between"
                sx={{ backgroundColor: 'primary.main',color: 'secondary.main' }}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
                <div className='flex gap-2'>
                <Delete  onClick={()=>{setOpenDeleteModal(true)}} />
                <Edit onClick={()=>{setOpenUpdateModal(true)}}/>
                </div>
              </Paper>
        
          </Grid>
        ))}
      </Grid>
      <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            value={updatedCategoryName}
            onChange={(e) => setUpdatedCategoryName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
