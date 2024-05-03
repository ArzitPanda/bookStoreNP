import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,TextField, IconButton, Modal, Typography, Button, Card, CardContent, Snackbar } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {updateCustomer,deleteCustomer,fetchCustomers } from '@/store/Customer/CustomerApi'; // Import the updateCustomer and deleteCustomer actions from your customer slice

const CustomerList = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);


useEffect(()=>{

dispatch(fetchCustomers());



},[dispatch])



  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleOpenUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenUpdateModal(true);
  };

  const handleOpenDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setSelectedCustomer(null);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    dispatch(updateCustomer(updatedCustomer));
    handleCloseModal();
  };

  const handleDeleteCustomer = () => {
    dispatch(deleteCustomer(selectedCustomer.id));
    handleCloseModal();
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRowClick = (id) => {
    // Copy ID to clipboard
    navigator.clipboard.writeText(id);
    // Show notification
    setSnackbarOpen(true);
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
     <TableContainer>
        <Table>
          <TableHead>
            <TableRow  >
            <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
              <TableRow key={customer.id} onClick={() => handleRowClick(customer.id)}>
                 <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenUpdateModal(customer)}><Edit /></IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(customer)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
 
 <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="ID copied"
      />
      {/* Update Customer Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseModal}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)' }}>
    <Typography variant="h5" style={{ marginBottom: '20px' }}>Update Customer</Typography>
    <form onSubmit={(e) => { e.preventDefault(); handleUpdateCustomer(selectedCustomer); }}>
      <TextField
        name="name"
        label="Name"
        fullWidth
        value={selectedCustomer?.name || ''}
        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        value={selectedCustomer?.email || ''}
        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        name="address"
        label="Address"
        fullWidth
        value={selectedCustomer?.address || ''}
        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, address: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        name="phone_number"
        label="Phone Number"
        fullWidth
        value={selectedCustomer?.phone_number || ''}
        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone_number: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Update</Button>
      <Button variant="contained" color="secondary" onClick={handleCloseModal}>Cancel</Button>
    </form>
  </div>
</Modal>

      
      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseModal} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Card sx={{ borderRadius: 2, minWidth: 300, bgcolor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Are you sure you want to delete this customer?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCustomer}
              sx={{ mr: 1 ,color: 'black' }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
    </Paper>
  );
};

export default CustomerList;
