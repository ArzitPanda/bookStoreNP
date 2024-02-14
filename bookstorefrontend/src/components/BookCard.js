import React from 'react';
import { Grid, Paper, Typography, Button, Avatar } from '@mui/material';

const TailwindMuiCard = ({book}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Paper elevation={3} className="card">
        <div className="card__img bg-gray-300 rounded-t-lg">
          <Avatar alt={book.title} src={book.img_url} className="w-full h-full" />
        </div>
        <div className="card__avatar bg-white rounded-full flex justify-center items-center"></div>
        <Typography variant="h6" className="card__title mt-12 font-semibold text-black">{book.title}</Typography>
        <Typography className="card__subtitle mt-2 text-gray-600">{book.name}</Typography>
        <Typography className="card__subtitle mt-2 text-gray-600">Price: ${book.price}</Typography>
        <Typography className="card__subtitle mt-2 text-gray-600">Category: {book.category_name}</Typography>
        <div className="card__wrapper mt-4">
          <Button variant="outlined" className="card__btn">Details</Button>
          <Button variant="contained" className="card__btn card__btn-solid ml-2">Buy Now</Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default TailwindMuiCard;
