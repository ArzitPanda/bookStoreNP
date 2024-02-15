import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid, Typography, Paper } from '@mui/material';
import { createCustomer} from '@/store/Customer/CustomerApi'; // Import the createCustomer action from your customer slice

const CreateCustomerForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = () => {
    dispatch(createCustomer(formData)); // Dispatch the createCustomer action with the form data
    setFormData({ // Reset form fields after submission
      name: '',
      email: '',
      address: '',
      phone_number: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create Customer
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Address"
            fullWidth
            value={formData.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone_number"
            label="Phone Number"
            fullWidth
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateCustomerForm;
