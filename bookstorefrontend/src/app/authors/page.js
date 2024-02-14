'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorsAsync, createAuthorAsync, updateAuthorAsync, deleteAuthorAsync } from '@/store/Author/AuthorSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Modal, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AuthorCrud = () => {
  const dispatch = useDispatch();
  const { authors, status } = useSelector((state) => state.authors);

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [formData, setFormData] = useState({ name: '', biography: '' });

  useEffect(() => {
    dispatch(fetchAuthorsAsync());
  }, [dispatch]);

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setModalData(data);
    console.log(data);
    setFormData({name: data.name,biography: data.biography});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAuthor = () => {
    dispatch(createAuthorAsync(formData));
    setFormData({ name: '', biography: '' });
  };

  const handleUpdateAuthor = () => {
    dispatch(updateAuthorAsync({ authorId: modalData.id, authorData: formData }));
    handleCloseModal();
  };

  const handleDeleteAuthor = (authorId) => {
    dispatch(deleteAuthorAsync(authorId));
  };

  return (
    <div className="lg:ml-[350px] lg:p-20 p-6">
       <div className="p-4 bg-white shadow-lg mb-6 rounded-lg">
  <Typography variant="h4" className="mb-4">Create Author</Typography>
  <div className="flex flex-col gap-4">
    <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" />
    <TextField label="Biography" name="biography" value={formData.biography} onChange={handleInputChange} variant="outlined" multiline rows={4} />
    <Button variant="contained" onClick={handleCreateAuthor} color="primary">Create</Button>
  </div>
</div>



    <div className="p-4 bg-white shadow-lg mb-6 rounded-lg">
    <Typography variant="h5" className="mb-4">Authors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow  sx={{backgroundColor:'primary.main'}}>
              <TableCell sx={{color:'secondary.main',fontWeight:600}}>Name</TableCell>
              <TableCell sx={{color:'secondary.main',fontWeight:600}}>Biography</TableCell>
              <TableCell sx={{color:'secondary.main',fontWeight:600}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.biography}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(author)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteAuthor(author.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>

      

      <Modal open={openModal} onClose={handleCloseModal}>
  <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
    <div className="bg-white rounded-lg p-8 w-96">
      <h2 className="text-xl font-semibold mb-4">Edit Author</h2>
      <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth className="mb-4" />
      <TextField label="Biography" name="biography" value={formData.biography} onChange={handleInputChange} fullWidth multiline rows={4} className="mb-4" />
      <div className="flex justify-end">
        <Button variant="outlined" onClick={handleCloseModal} className="mr-2">Cancel</Button>
        <Button variant="contained" onClick={handleUpdateAuthor} color="primary">Update</Button>
      </div>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default AuthorCrud;
