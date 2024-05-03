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
  Input,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Avatar,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutlineRounded, AddCircleTwoTone, CloseTwoTone, CreateNewFolderRounded, CreateRounded } from "@mui/icons-material";
import { fetchAuthorsAsync } from "@/store/Author/AuthorSlice";
import { fetchCategories } from "@/store/Category/CategorySlice";


const BookComponent = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const { authors } = useSelector((state) => state.authors);
  const {categories} =useSelector((state)=>state.categories)
  const data = useSelector((state) => state);
  console.log(data)
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
    dispatch(fetchAuthorsAsync())
    dispatch(fetchCategories())
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
    setFormData({...book})
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateBook = () => {
    dispatch(modifyBook(selectedBook?.id, formData));
    handleCloseModal();
  };

  const handleDeleteBook = (id) => {
    dispatch(removeBook(id));
    handleCloseModal();
  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="lg:ml-[350px]">
    <Box
      variant="contained"
     
      

      onClick={()=>{setOpenCreateModal(true)}}
      sx={{
        backgroundColor: 'primary.dark',
        color:"secondary.main",
        borderRadius: '50px',
        height:'80px',
        display:"flex",
        alignItems:"center",
        justifyContent:'center',
        width:"80px",
        padding: '8px 16px',
        position: 'absolute',
        bottom: '70px',
        right: '6px',
        zIndex: 1000, 
        boxShadow:'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
        // Ensure button stays on top
      }}
    >
      <AddCircleTwoTone  sx={{height:'50px',width:'50px'}}/>
    </Box>
      <Modal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" id="modal-title">
            Books
          </Typography>
          <div >
            <TextField
              margin="normal"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
            />
        <Select
            margin="normal"
            label="Author"
            name="author_id"
            value={formData.author_id}
            onChange={handleInputChange}
            fullWidth
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="normal"
            label="Category"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
            <TextField
              margin="normal"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
            />
            <Input
              margin="normal"
              accept="image/*"
              type="file"
              name="img_url"
              onChange={(event) => {
                handleInputChange({
                  target: {
                    name: "image",
                    value: event.target.files[0], // Access the selected file object
                  },
                });
              }}
              fullWidth
            />
            <Button type="button" variant="contained" color="primary" onClick={handleCreateBook}>
              Add Book
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="edit-book-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" id="edit-book-modal">Edit Book</Typography>
        <form onSubmit={handleUpdateBook}>
          <TextField
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Author ID"
            name="author_id"
            value={formData.author_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Category ID"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Image URL"
            name="img_url"
            value={formData.img_url}
            onChange={handleInputChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button  variant="contained" color="primary" onClick={handleUpdateBook}>
              Update
            </Button>
            <IconButton aria-label="delete" onClick={handleCloseModal}>
              <CloseTwoTone/>
            </IconButton>
          </Box>
        </form>
      </Box>
    </Modal>
    <div className="p-12">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Author ID</TableCell>
            <TableCell align="center">Category ID</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
            <TableRow key={book.id}>
              <TableCell align="center">
                <Avatar src={book.img_url} alt={book.title} />
              </TableCell>
              <TableCell align="center">{book.title}</TableCell>
              <TableCell align="center">{book.name}</TableCell>
              <TableCell align="center">{book.category_name}</TableCell>
              <TableCell align="center">{book.price}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleOpenModal(book)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteBook(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={books?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      
      />
    </TableContainer>
    </div>
    </div>
  );
};

export default BookComponent;
