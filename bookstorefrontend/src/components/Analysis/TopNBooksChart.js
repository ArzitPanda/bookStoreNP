"use client"
import React, { useEffect,useState } from 'react';
import { Bar} from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import axios from 'axios';

const TopNBarChart = () => {
  // Extracting labels and data from the API response
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics/popular-books?limit=5');
        setApiData(response.data);
        console.log("vertical",response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Extracting data for chart
  const labels = apiData.map(item => item.title);
  const data = apiData.map(item => parseInt(item.total_quantity_ordered));

  // Chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Quantity Ordered',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    indexAxis: 'y', // Change the axis to y-axis for horizontal bars
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };

  return (
    <div>
      <h2>Vertical Bar Chart</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TopNBarChart;
