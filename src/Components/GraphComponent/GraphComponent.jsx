import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraphComponent = () => {
  const [userData, setUserData] = useState({});
  const [bakeryData, setBakeryData] = useState({});
  const [productData, setProductData] = useState({});
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get('http://127.0.0.1:8000/api/graph/user-registrations');
      const bakeryResponse = await axios.get('http://127.0.0.1:8000/api/graph/bakery-registrations');
      const productResponse = await axios.get('http://127.0.0.1:8000/api/graph/product-additions');
      const orderResponse = await axios.get('http://127.0.0.1:8000/api/graph/order-placements');
    
      setUserData(userResponse.data);
      setBakeryData(bakeryResponse.data);
      setProductData(productResponse.data);
      setOrderData(orderResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const userChartData = {
    labels: ['Today', 'This Month', 'Last Month'],
    datasets: [
      {
        label: 'User Registrations',
        data: [
          userData.daily_registrations,
          userData.monthly_registrations,
          userData.last_month_registrations,
        ],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const bakeryChartData = {
    labels: ['Today', 'This Month', 'Last Month'],
    datasets: [
      {
        label: 'Bakery Registrations',
        data: [
          bakeryData.daily_registrations,
          bakeryData.monthly_registrations,
          bakeryData.last_month_registrations,
        ],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const productChartData = {
    labels: ['Today', 'This Month', 'Last Month'],
    datasets: [
      {
        label: 'Product Additions',
        data: [
          productData.daily_additions,
          productData.monthly_additions,
          productData.last_month_additions,
        ],
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: ['Today', 'This Month', 'Last Month'],
    datasets: [
      {
        label: 'Order Placements',
        data: [
          orderData.daily_orders,
          orderData.monthly_orders,
          orderData.last_month_orders,
        ],
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">User Registrations</h2>
        <Line data={userChartData} />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Bakery Registrations</h2>
        <Line data={bakeryChartData} />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Product Additions</h2>
        <Bar data={productChartData} />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Order Placements</h2>
        <Bar data={orderChartData} />
      </div>
    </div>
  );
};

export default GraphComponent;
