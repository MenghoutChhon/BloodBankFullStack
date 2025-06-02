import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

interface Request {
  _id: string;
  donor?: string;
  hospital?: string;
  type?: string;
  units?: number;
  status: string;
  createdAt?: string;
}

const RequestManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setRequests(res.data))
      .catch(() => setError("Failed to load requests."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Blood Requests Management</h2>
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req._id}</td>
                <td>{req.type || "-"}</td>
                <td>{req.units || "-"}</td>
                <td>{req.status}</td>
                <td>{req.createdAt ? new Date(req.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RequestManagement;
