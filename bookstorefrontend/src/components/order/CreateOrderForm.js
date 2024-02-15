import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createNewOrder } from '@/store/Order/OrderSlice'; // Assuming you have an API function for creating orders
import { fetchAllBooks } from '@/store/Book/BookSlice';


const CreateOrderForm = ({bookSelected,setBookSelected,context}) => {


    const dispatch = useDispatch();

    const books = useSelector((state)=>state.books.books);
  const [formData, setFormData] = useState({
    book_id: '',
    quantity: 0,
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch books when the component mounts
    dispatch(fetchAllBooks());
  }, [dispatch]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleAddItem = (e) => {
        const books =[...bookSelected,formData];
    setBookSelected(books)
    setSuccessMessage('sucessfully added in order to buy');
    setFormData({
    
        book_id: '',
        quantity: 0,
      });

      console.log(bookSelected)
  };


 

  return (
    <Box>
     
      <div >
        <div>
        <TextField
          label="user_id"
          name="userid"
          type="number"
          fullWidth
          value={context.user.userId}
          onChange={(e)=>{context.user.SetuserId(e.target.value)}}
        />

    

        </div>


        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="book_id">Select Book</InputLabel>
          <Select
            id="book_id"
            name="book_id"
            value={formData.book_id}
            onChange={handleInputChange}
          >
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>{book.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          fullWidth
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
      </div>
      {successMessage && <Typography variant="body1" color="success">{successMessage}</Typography>}
      {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
    </Box>
  );
};

export default CreateOrderForm;
