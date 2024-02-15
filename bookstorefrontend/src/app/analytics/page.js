import React from 'react';
import { Grid } from '@mui/material';
import CategoryBarChart from '@/components/Analysis/CategoryBarChart'; // Import your CategoryBarChart component
import TopNBarChart from '@/components/Analysis/TopNBooksChart';

const Page = () => {
  return (
    <div className='lg:ml-[350px]'>
      <Grid container spacing={3}>
        {/* Left side with three charts */}
        <Grid item xs={12} md={4} >
          <CategoryBarChart />
        </Grid>
        <Grid item xs={12} md={4}>
            <TopNBarChart />
          {/* Add another chart component here */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Add another chart component here */}
        </Grid>

        {/* Right side with four charts */}
        <Grid item xs={12} md={3}>
          {/* Add another chart component here */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Add another chart component here */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Add another chart component here */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Add another chart component here */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Page;
