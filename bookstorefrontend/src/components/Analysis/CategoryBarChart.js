"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const CategoryBarChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics/category-sales?year=2024&month=2');
        const data = await response.data;
        console.log(data);
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: salesData.map(ele=>ele.name), // Ensure that labels are strings representing categories
    datasets: [
      {
        label: 'Total Quantity',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: salesData.map(item => parseInt(item.total_quantity))
      }
    ]
  };
  

  return (
    <div >
      <h2>Sales Chart</h2>
      <Bar
        data={chartData}
       
      />
    </div>
  );
};

export default CategoryBarChart;
