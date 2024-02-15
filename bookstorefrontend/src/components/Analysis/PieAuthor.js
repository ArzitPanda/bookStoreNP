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
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ]
    }]
  };

  return (
    <div>
      <h2>Most Loved Authors</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
