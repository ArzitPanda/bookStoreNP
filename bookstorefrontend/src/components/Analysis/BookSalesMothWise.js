"use client"
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const SalesByYearChart = () => {
  const [salesData, setSalesData] = useState([]);

  // Map of month names
  const monthMap = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/booksByYear/2024');
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  // Process data to include missing months
  const processedData = salesData.reduce((acc, curr) => {
    acc[curr.month] = curr.total_sales;
    return acc;
  }, []);

  // Fill in missing months with zero sales
  for (let i = 1; i <= 12; i++) {
    if (!(i in processedData)) {
      processedData[i] = 0;
    }
  }

  const months = Object.keys(processedData).map(month => monthMap[parseInt(month)]);
  const sales = Object.values(processedData);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total Sales',
        data: sales,
        fill: true,
        backgroundColor: '#1DA1F2',
        borderColor: '#1DA1F2',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h2>Sales By Month</h2>
      <Line data={data} />
    </div>
  );
};

export default SalesByYearChart;
