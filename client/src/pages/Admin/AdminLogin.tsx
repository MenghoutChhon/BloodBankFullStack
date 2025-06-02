import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await axios.post("/api/admin/login", { email, password });

      if (!res.data.admin) {
        setErrorMsg("This account is not an admin.");
        setIsLoading(false);
        return;
      }

      login({ 
        id: res.data.admin._id, 
        email: res.data.admin.email, 
        role: "admin",
        name: res.data.admin.name || '',
      }, res.data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: 410, marginTop: 90 }}>
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
