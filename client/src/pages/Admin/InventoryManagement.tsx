import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const InventoryManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/stats/bloodunits")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load inventory stats."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Blood Inventory Management</h2>
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Units Available</th>
            </tr>
          </thead>
          <tbody>
            {stats.labels.map((type, idx) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{stats.data[idx]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default InventoryManagement;
