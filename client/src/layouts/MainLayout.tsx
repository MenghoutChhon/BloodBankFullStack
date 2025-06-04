import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.heart}>❤</span>
            <span className={styles.logoText}>BloodDonate</span>
          </div>
          <nav>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
            <Link to="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.footerHeart}>❤</span>
            <span className={styles.footerLogoText}>BloodDonate</span>
          </div>

          <div className={styles.footerText}>
            <p>Connecting donors with those in need since 2023</p>
            <p>© 2025 BloodDonate. All rights reserved.</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>
              Privacy
            </a>
            <a href="/terms" className={styles.footerLink}>
              Terms
            </a>
            <a href="/contact" className={styles.footerLink}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
