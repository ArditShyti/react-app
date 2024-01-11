import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Import Chart from 'chart.js/auto'
import LineChart from './linechart';

const BarChart = () => {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2017, count: 48 },
    { year: 2018, count: 88 },
    { year: 2019, count: 18 },
    { year: 2020, count: 30 },
    { year: 2021, count: 28 },
    { year: 2022, count: 18 },
    { year: 2023, count: 88 },
    { year: 2024, count: 98 },
    { year: 2025, count: 70 },
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2017, count: 48 },
    { year: 2018, count: 88 },
    { year: 2019, count: 18 },
    { year: 2020, count: 30 },
    { year: 2021, count: 28 },
    { year: 2022, count: 18 },
    { year: 2023, count: 88 },

  ];

  const chartData = {
    labels: data.map(row => row.year),
    datasets: [
      {
        label: 'Income',
        data: data.map(row => row.count),
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor: 'rgba(255, 0, 0, 1)',
      },
      {
        label: 'Expense',
        data: data.map(row => row.count),
        backgroundColor: 'rgba(0, 0, 255, 1)',
        borderColor: 'rgba(0, 0, 255, 1)',
      },
    ],
  };

  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create the chart instance using canvasRef
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && chartData?.labels && chartData?.datasets) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
      });
    }

    // Ensure proper cleanup when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return(
  <>
  <canvas ref={canvasRef} />
  <LineChart />
  </> 
  )
};

export default BarChart;
