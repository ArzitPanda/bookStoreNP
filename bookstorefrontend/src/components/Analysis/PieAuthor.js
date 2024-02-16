"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = () => {
  const [authorsData, setAuthorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics/most-loved-authors');
        setAuthorsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: authorsData.map(item => item.author_name),
    datasets: [{
      data: authorsData.map(item => item.total_quantity_sold),
      backgroundColor: [
        '#6ec6ff', // Lighter Shade
        '#0b7cc6', // Darker Shade
        '#4ebdff', // Lighter Blue
        '#007acc', // Darker Blue
        '#33daff'  // Lighter Turquoise
      ],
    }]
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };
  return (
    <div>
      <h2>Most Loved Authors</h2>
      <Pie data={{...chartData}}  options={options}/>
    </div>
  );
};

export default PieChart;
