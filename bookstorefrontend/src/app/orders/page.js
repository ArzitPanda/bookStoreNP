"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import CreateOrderForm from "@/components/order/CreateOrderForm";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "@/store/Order/OrderSlice";
import OrderList from "@/components/order/OrderList";
// import OrderList from './OrderList';

const OrderManagementPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const books = useSelector((state) => state.books.books);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const dispatch = useDispatch();

  const [bookSelected, setBookSelected] = useState([]);

  const [userId, SetuserId] = useState();
  const [discount, setDiscount] = useState();
  const totalPrice = () => {
    return bookSelected.reduce((total, item) => {
      const book = books.find((book) => book.id === item?.book_id);
      if (book) {
        return total + book.price * parseInt(item.quantity);
      }
      return total;
    }, 0);
  };

  const total = useMemo(totalPrice, [bookSelected, setBookSelected]);

  const context = {
    user: { userId, SetuserId },
    discount: { discount, setDiscount },
  };

  const increaseQuantity = (index) => {
    const updatedBookSelected = [...bookSelected];
    updatedBookSelected[index].quantity =
      parseInt(updatedBookSelected[index].quantity) + 1;
    setBookSelected(updatedBookSelected);
  };

  // Function to decrease the quantity of a selected book
  const decreaseQuantity = (index) => {
    const updatedBookSelected = [...bookSelected];
    updatedBookSelected[index].quantity -= 1;
    if (updatedBookSelected[index].quantity <= 0) {
      // Remove the book if quantity becomes zero
      updatedBookSelected.splice(index, 1);
    }
    setBookSelected(updatedBookSelected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to create the order
      const data = { customer_id: userId, books: bookSelected, discount: 0 };

      dispatch(createNewOrder(data));
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="lg:ml-[350px] ">
      <Tabs value={currentTab} onChange={handleChangeTab} centered>
        <Tab label="Create Order" />
        <Tab label="Order List" />
      </Tabs>
      <TabPanel
        value={currentTab}
        index={0}
       
      >
        <div  className="w-full flex flex-col lg:flex-row  items-center lg:items-start justify-between ">
        <div className="w-10/12 lg:w-7/12">
          <Typography variant="h4" sx={{ my: 2 }}>
            Create Order
          </Typography>
          <CreateOrderForm
            bookSelected={bookSelected}
            setBookSelected={setBookSelected}
            context={context}
          />
        </div>
        <div className="lg:w-4/12  w-full bg-white rounded-sm h-[600px] shadow-lg mt-24 mx-auto">
          <Typography variant="h5" align="center" mt={4} mb={2}>
            Selected Books
          </Typography>
          {bookSelected.map((item, index) => {
            const book = books.filter((book) => book.id === item?.book_id);

            return (
              <Card key={index} variant="outlined" className="mb-4 mx-4 ">
                <div className="flex items-center justify-around">
                  <div>
                    <Typography variant="h6">{book[0]?.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {book[0]?.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </div>
                  <Avatar src={book[0]?.img_url} />
                </div>
                <CardActions>
                  <Button size="small" onClick={() => decreaseQuantity(index)}>
                    Decrease
                  </Button>
                  <Button size="small" onClick={() => increaseQuantity(index)}>
                    Increase
                  </Button>
                </CardActions>
              </Card>
            );
          })}

          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              padding: "1rem",
              borderTop: "1px solid #ccc",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total is: {total}
            </Typography>
            <Button onClick={handleSubmit}>Create Order</Button>
          </div>
        </div>
        </div>
      </TabPanel>
      
      <TabPanel value={currentTab} index={1}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Order List
        </Typography>
        <OrderList />
      </TabPanel>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default OrderManagementPage;
