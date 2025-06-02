import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import styles from './Login.module.css';

const HospitalLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await axios.post("/api/hospitals/login", { email, password });
      login(res.data.user, res.data.token); // This is the right way!
      navigate("/hospital/dashboard");
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    }
    setIsLoading(false);
  };

  // Forgot password stub handler (update to real logic if needed)
  const handleForgotPassword = () => {
    alert("Forgot password feature coming soon!");
    // You can replace this with real logic: open modal, navigate, etc.
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hospital Login</h1>
        {errorMsg && (
          <div className={styles.errorMsg} tabIndex={-1} aria-live="polite">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <div className={styles.pwdWrapper}>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.showPwdBtn}
                aria-label={showPwd ? "Hide password" : "Show password"}
                onClick={() => setShowPwd(v => !v)}
                tabIndex={0}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinnerWrapper}>
                <span className={styles.spinner}></span>
                <span className={styles.spinnerText}>Logging in...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className={styles.loginBottom}>
          <button
            className={styles.linkBtn}
            onClick={handleForgotPassword}
            type="button"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
