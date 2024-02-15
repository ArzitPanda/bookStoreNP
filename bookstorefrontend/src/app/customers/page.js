"use client"
import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import CreateCustomerForm from '@/components/customer/CreateCustomerForm';
import CustomerList from '@/components/customer/CustomerList';

const CustomerCrudPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
 <div className='lg:ml-[350px] lg:p-12'>
       <Box sx={{ flexGrow: 1 }}>
    
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="customer crud tabs" 
       sx={{color: 'primary.main'}}
        
        >
          <Tab label="Create Customer" />
          <Tab label="Get Customers" />
        </Tabs>
     
      <TabPanel value={currentTab} index={0}>
        <CreateCustomerForm />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <CustomerList />
      </TabPanel>
    </Box>
 </div>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default CustomerCrudPage;
