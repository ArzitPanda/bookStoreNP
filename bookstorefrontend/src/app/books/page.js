"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBooks,
  addBook,
  modifyBook,
  removeBook,
} from "@/store/Book/BookSlice";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Modal,
  AppBar,
  Menu,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateNewFolderRounded, CreateRounded } from "@mui/icons-material";

const BookComponent = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    category_id: "",
    price: "",
    img_url: "",
  });
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateBook = () => {
    dispatch(addBook(formData));
    setFormData({
      title: "",
      author_id: "",
      category_id: "",
      price: "",
      img_url: "",
    });
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateBook = () => {
    dispatch(modifyBook(selectedBook.id, formData));
    handleCloseModal();
  };

  const handleDeleteBook = () => {
    dispatch(removeBook(selectedBook.id));
    handleCloseModal();
  };
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <div className="lg:ml-[350px]">

   <div className="w-full flex items-center justify-end  h-32  bg-blue-500 p-6">
    <div onClick={()=>{setOpenCreateModal(true)}}>    <CreateRounded /></div>

   </div>
      <Modal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <div className="bg-white p-4 w-auto">
          <Typography variant="h3" gutterBottom>
            Books
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <form onSubmit={handleCreateBook}>
                  <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Author ID"
                    name="author_id"
                    value={formData.author_id}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Category ID"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Image URL"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Add Book
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Author ID"
            name="author_id"
            value={formData.author_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Category ID"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="img_url"
            value={formData.img_url}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleUpdateBook}>
            Update
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteBook}>
            Delete
          </Button>
        </div>
      </Modal>
      <Grid container spacing={2} justifyContent="center">
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6}>
            <Paper elevation={3} className="p-4">
              <Typography variant="h6">{book.title}</Typography>
              <Typography>Author ID: {book.author_id}</Typography>
              <Typography>Category ID: {book.category_id}</Typography>
              <Typography>Price: {book.price}</Typography>
              <Typography>Image URL: {book.img_url}</Typography>
              <IconButton onClick={() => handleOpenModal(book)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteBook(book.id)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookComponent;
