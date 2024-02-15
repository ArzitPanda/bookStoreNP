'use client'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import axios from 'axios';

const TimeSeriesChart = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics/total-payable-by-date');
        console.log(response.data)
        setTimeSeriesData(response.data);
      } catch (error) {
        console.error('Error fetching time series data:', error);
      }
    };

    fetchData();
  }, []);
 
  // Process the data to extract labels and data points
  const labels = timeSeriesData.map(entry => entry.date); // Format the date
  const dataPoints = timeSeriesData.map(entry => entry.total_payable_amount);

  // Function to format the date


  // Chart data
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Payable Amount',
        data: dataPoints,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Total Payable Amount Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default TimeSeriesChart;
