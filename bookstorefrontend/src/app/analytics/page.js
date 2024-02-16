import React from 'react';
import { Box, Grid } from '@mui/material';
import CategoryBarChart from '@/components/Analysis/CategoryBarChart';
import TopNBarChart from '@/components/Analysis/TopNBooksChart';
import TimeSeriesChart from '@/components/Analysis/TotalPayble';
import PieChart from '@/components/Analysis/PieAuthor';
import SalesByYearChart from '@/components/Analysis/BookSalesMothWise';

const Page = () => {
  return (
<div class="ml-[350px] grid grid-cols-1 md:grid-cols-3 gap-5 ">
  <div className='col-span-3 grid grid-cols-1 md:grid-cols-12 px-12 rounded-3xl shadow-lg mr-6 mt-6'>
  <div className="col-span-12 md:col-span-5">
    <CategoryBarChart />
  </div>
  <div className="col-span-12 md:col-span-5 my-auto ml-32">
    <TopNBarChart />
  </div>
  </div>

 
 <div className='col-span-3 grid grid-cols-1 md:grid-cols-12 px-12 rounded-3xl shadow-lg mr-6 mt-6'>
 <div className="col-span-12 md:col-span-5 p-6">
    <SalesByYearChart />
  </div>
  <div className="col-span-12 md:col-span-4 my-auto">
  <TimeSeriesChart />
  </div>
  <div className="col-span-12 md:col-span-3 md:row-span-3 flex items-center justify-center h-full">
    <PieChart />
  </div>
 </div>
</div>

  );
}

export default Page;
