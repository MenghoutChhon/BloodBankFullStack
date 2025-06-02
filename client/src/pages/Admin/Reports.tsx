// src/pages/Admin/Reports.tsx
import React, { useState, useEffect } from "react";
// Make sure you have installed react-chartjs-2 and chart.js
import { Bar } from 'react-chartjs-2';
import { Button } from "react-bootstrap";
import './Reports.css';
import axios from "axios";


const Reports: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/admin/stats/bloodunits").then(res => {
      setData({
        labels: res.data.labels,
        datasets: [{
          label: 'Units Available',
          data: res.data.data,
          backgroundColor: 'rgba(220,38,38,0.7)'
        }]
      });
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="reports-root">
      <h1 className="mb-4">Reports & Analytics</h1>
      <div className="reports-chart-container mb-4">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <Button className="mt-2" variant="primary">
        Export as CSV
      </Button>
    </div>
  );
};

export default Reports;
