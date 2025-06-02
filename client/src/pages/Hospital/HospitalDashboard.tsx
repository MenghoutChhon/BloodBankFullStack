// src/pages/Hospital/HospitalDashboard.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const LOW_STOCK_THRESHOLD = 5;

type BloodStock = { [type: string]: number };
type Request = {
  _id?: string;
  type: string;
  units: number;
  status: string;
  date: string;
};
type Donor = {
  name: string;
  type: string;
  units: number;
  date: string;
};

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [bloodStock, setBloodStock] = useState<BloodStock>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [requests, setRequests] = useState<Request[]>([]);
  const [recentDonors, setRecentDonors] = useState<Donor[]>([]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // For request modals
  const [modalBloodType, setModalBloodType] = useState("");
  const [modalUnits, setModalUnits] = useState(1);

  // For editing a request
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // For stock edit
  const [stockModalType, setStockModalType] = useState("");
  const [stockModalUnits, setStockModalUnits] = useState(0);

  // Fetch from backend
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      axios.get("/api/hospitals/me/stock", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("/api/hospitals/me/requests", { headers: { Authorization: `Bearer ${token}` } }),
      // This endpoint should return recent donors for this hospital
      axios.get("/api/hospitals/me/recent-donors", { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(([stockRes, reqRes, donorsRes]) => {
      setBloodStock(stockRes.data || {});
      setRequests(reqRes.data || []);
      setRecentDonors(donorsRes.data || []);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  // Request blood from backend
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalBloodType || modalUnits < 1) return;
    try {
      const res = await axios.post(
        "/api/bookings",
        { type: modalBloodType, units: modalUnits },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(prev => [res.data, ...prev]);
      setShowRequestModal(false);
    } catch {
      alert("Failed to submit request");
    }
  };

  // Edit request in backend
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex === null || !requests[editIndex]?._id) return;
    try {
      const res = await axios.put(
        `/api/bookings/${requests[editIndex]._id}`,
        { type: modalBloodType, units: modalUnits },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(rs => rs.map((r, i) => (i === editIndex ? res.data : r)));
      setShowEditModal(false);
    } catch {
      alert("Failed to edit request");
    }
  };

  // Cancel request in backend
  const handleCancelRequest = async (index: number) => {
    if (!requests[index]?._id) return;
    if (window.confirm("Are you sure you want to cancel this request?")) {
      try {
        await axios.delete(`/api/bookings/${requests[index]._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(rs => rs.filter((_, i) => i !== index));
      } catch {
        alert("Failed to cancel request");
      }
    }
  };

  // Update stock in backend
  const handleStockUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/hospitals/me/stock",
        { type: stockModalType, units: Math.max(0, Number(stockModalUnits)) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBloodStock(prev => ({
        ...prev,
        [stockModalType]: Math.max(0, Number(stockModalUnits))
      }));
      setShowStockModal(false);
      setLastUpdated(new Date().toLocaleString());
    } catch {
      alert("Failed to update stock");
    }
  };

  // UI open/close helpers
  const openRequestModal = () => {
    setModalBloodType("");
    setModalUnits(1);
    setShowRequestModal(true);
  };
  const closeRequestModal = () => setShowRequestModal(false);

  const openEditModal = (i: number) => {
    setEditIndex(i);
    setModalBloodType(requests[i].type);
    setModalUnits(requests[i].units);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const openStockModal = (type: string) => {
    setStockModalType(type);
    setStockModalUnits(bloodStock[type] ?? 0);
    setShowStockModal(true);
  };
  const closeStockModal = () => setShowStockModal(false);

  // Logout
  const handleLogout = () => {
    window.location.href = "/hospital/login";
  };

  const totalUnits = Object.values(bloodStock).reduce((a, b) => a + b, 0);
  const lowStockTypes = BLOOD_TYPES.filter(type => (bloodStock[type] ?? 0) <= LOW_STOCK_THRESHOLD);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #fff 65%, #ffe5eb 100%)",
        px: { xs: 1, sm: 3, md: 5 },
        py: 5,
      }}
    >
      <Box sx={{ maxWidth: 1300, mx: "auto" }}>
        {/* Top Controls */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("/donor/register")}
            sx={{ borderRadius: 2, fontWeight: 600, px: 3, minWidth: 150 }}
          >
            Register Donor
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={openRequestModal}
            sx={{ borderRadius: 2, fontWeight: 600, px: 3, minWidth: 150 }}
          >
            Request Blood
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ borderRadius: 2, fontWeight: 600, px: 4, minWidth: 120 }}
          >
            Logout
          </Button>
        </Stack>

        <Typography color="text.secondary" align="right" mb={3}>
          Last updated: {lastUpdated || "..."}
        </Typography>

        {/* Summary Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 4,
          }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: 1, textAlign: "center" }}>
            <Typography fontWeight={600} color="primary" mb={1}>
              Total Units Available
            </Typography>
            <Typography variant="h3" fontWeight={800} color="error">
              {totalUnits}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: 2, textAlign: "center" }}>
            <Typography fontWeight={600} color="primary" mb={1}>
              Low Stock Alerts
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
              {lowStockTypes.length ? (
                lowStockTypes.map(type => (
                  <Chip
                    key={type}
                    label={type}
                    color="error"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: "1.12rem", my: 0.5 }}
                  />
                ))
              ) : (
                <Chip
                  label="All Sufficient"
                  color="success"
                  sx={{ fontWeight: 700, fontSize: "1.12rem", my: 0.5 }}
                />
              )}
            </Stack>
          </Paper>
        </Box>

        {/* Main Content: Stock & Requests/Donors */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Blood Stock */}
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, flex: 1, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
              Current Blood Stock
            </Typography>
            {loading ? (
              <Typography color="text.secondary">Loading stock data...</Typography>
            ) : (
              <Box sx={{ width: "100%" }}>
                {/* Table Head */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 700,
                    color: "#475569",
                    borderBottom: "1px solid #e0e0e0",
                    pb: 1,
                    fontSize: "1.06rem"
                  }}
                >
                  <Box sx={{ flex: 1, textAlign: "left", pl: 1 }}>Type</Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>Units</Box>
                  <Box sx={{ width: 64, textAlign: "center" }}>Action</Box>
                </Box>
                {/* Table Body */}
                {BLOOD_TYPES.map(type => {
                  const isLow = (bloodStock[type] ?? 0) <= LOW_STOCK_THRESHOLD;
                  return (
                    <Box
                      key={type}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #f2f2f2",
                        py: 1,
                        background: isLow ? "#ffebee" : "#fafbfc"
                      }}
                    >
                      <Box sx={{ flex: 1, pl: 1 }}>
                        <Chip
                          label={type}
                          size="small"
                          color={isLow ? "error" : "default"}
                          sx={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            minWidth: 44,
                            background: isLow ? "#f87171" : "#e5e7eb",
                            color: isLow ? "#fff" : "#22223b",
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          fontWeight={800}
                          fontSize="1.22rem"
                          color={isLow ? "error" : "primary"}
                        >
                          {bloodStock[type] ?? 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: 64, textAlign: "center" }}>
                        <Tooltip title={`Update ${type} stock`}>
                          <IconButton size="small" color="primary" onClick={() => openStockModal(type)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Paper>

          {/* Requests and Donors */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Blood Requests */}
            <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
                Recent Blood Requests
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 700,
                  color: "#475569",
                  pb: 1,
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "1.06rem"
                }}
              >
                <Box sx={{ flex: 2, pl: 1 }}>Request</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Status</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Date</Box>
                <Box sx={{ width: 80, textAlign: "center" }}>Actions</Box>
              </Box>
              <Divider sx={{ mb: 1 }} />
              {requests.map((req, i) => (
                <Box
                  key={req._id || i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  <Box sx={{ flex: 2, pl: 1 }}>
                    <span>
                      {req.units} unit{req.units > 1 ? "s" : ""} of <b>{req.type}</b>
                    </span>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Chip
                      label={req.status}
                      color={req.status === "Approved" ? "success" : "warning"}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 700, minWidth: 90 }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Typography color="text.secondary" fontSize="0.99rem">
                      {req.date}
                    </Typography>
                  </Box>
                  <Box sx={{ width: 80, display: "flex", justifyContent: "center", gap: 1 }}>
                    <Tooltip title="Edit Request">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => openEditModal(i)}
                        sx={{ mr: 0.5 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel Request">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleCancelRequest(i)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Recent Donors */}
            <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
                Recent Donors
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 700,
                  color: "#475569",
                  pb: 1,
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "1.06rem"
                }}
              >
                <Box sx={{ flex: 2, pl: 1 }}>Donor</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Blood Type</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Units</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Date</Box>
              </Box>
              <Divider sx={{ mb: 1 }} />
              {recentDonors.map((donor, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  <Box sx={{ flex: 2, pl: 1 }}>
                    <Typography fontWeight={700} color="primary.dark">
                      {donor.name}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Chip
                      label={donor.type}
                      color="error"
                      size="small"
                      sx={{ fontWeight: 700, minWidth: 44, fontSize: "1.06rem" }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Typography color="success.main" fontWeight={700}>
                      {donor.units} unit{donor.units > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Typography color="text.secondary" fontSize="0.99rem">
                      {donor.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Modal for Request Blood */}
      <Dialog open={showRequestModal} onClose={closeRequestModal} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700} color="primary">
          Request Blood Units
        </DialogTitle>
        <form onSubmit={handleRequestSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                select
                label="Blood Type"
                value={modalBloodType}
                onChange={e => setModalBloodType(e.target.value)}
                required
                fullWidth
              >
                <MenuItem value="">Select Type</MenuItem>
                {BLOOD_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Units Needed"
                type="number"
                inputProps={{ min: 1, max: 100 }}
                value={modalUnits}
                onChange={e => setModalUnits(Number(e.target.value))}
                required
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRequestModal} color="inherit" variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" sx={{ borderRadius: 2 }}>
              Submit Request
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal for Edit Request */}
      <Dialog open={showEditModal} onClose={closeEditModal} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700} color="primary">
          Edit Blood Request
        </DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                select
                label="Blood Type"
                value={modalBloodType}
                onChange={e => setModalBloodType(e.target.value)}
                required
                fullWidth
              >
                {BLOOD_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Units Needed"
                type="number"
                inputProps={{ min: 1, max: 100 }}
                value={modalUnits}
                onChange={e => setModalUnits(Number(e.target.value))}
                required
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditModal} color="inherit" variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" sx={{ borderRadius: 2 }}>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal for Update Stock */}
      <Dialog open={showStockModal} onClose={closeStockModal} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700} color="primary">
          Update Stock for {stockModalType}
        </DialogTitle>
        <form onSubmit={handleStockUpdate}>
          <DialogContent>
            <TextField
              label="Units in Stock"
              type="number"
              inputProps={{ min: 0, max: 1000 }}
              value={stockModalUnits}
              onChange={e => setStockModalUnits(Number(e.target.value))}
              required
              fullWidth
              autoFocus
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeStockModal} color="inherit" variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" sx={{ borderRadius: 2 }}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default HospitalDashboard;
