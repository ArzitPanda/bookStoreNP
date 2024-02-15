import React from 'react';
import { Grid } from '@mui/material';
import CategoryBarChart from '@/components/Analysis/CategoryBarChart';
import TopNBarChart from '@/components/Analysis/TopNBooksChart';
import TimeSeriesChart from '@/components/Analysis/TotalPayble';
import PieChart from '@/components/Analysis/PieAuthor';

const Page = () => {
  return (
    <div className="ml-[350px] w-6/12">
      <Grid container spacing={20}>
        <Grid item xs={12} lg={6}>
          <CategoryBarChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TopNBarChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TimeSeriesChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className='w-full h-full flex items-center justify-center'>
          <PieChart />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Page;
