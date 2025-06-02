import React from "react";
import styles from "./About.module.css";

const impactMetrics = [
  { value: "15,000+", label: "Units of Blood Collected", icon: "🩸" },
  { value: "5,000+", label: "Active Donors", icon: "🤝" },
  { value: "50+", label: "Partner Hospitals", icon: "🏥" },
  { value: "20+", label: "Annual Blood Drives", icon: "🚑" },
];

const About: React.FC = () => (
  <div className={styles.aboutBg}>
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About Our Project</h1>
      <p className={styles.aboutSubtitle}>
        <strong>Blood Bank Management System</strong> is a full-stack web application
        designed and developed by 4th-year Data Science students at the Institute of Technology of Cambodia.
      </p>
      <p className={styles.aboutBody}>
        Our goal is to reimagine blood donation and inventory management across Cambodia. Utilizing modern web
        technologies, our platform demonstrates how hospitals could manage blood stocks in real-time, enable seamless
        donor registration, and streamline the coordination of life-saving blood supplies.
      </p>
      <p className={styles.aboutBody}>
        Built with <strong>React</strong> (frontend) and <strong>Node.js</strong> (backend), this system emphasizes
        <strong> data analytics</strong>, <strong>automation</strong>, and an intuitive user experience. Although
        academic, it showcases the potential to save lives and inspire a culture of voluntary donation.
      </p>

      <div className={styles.metricsGrid}>
        {impactMetrics.map(({ icon, value, label }, idx) => (
          <div className={styles.metricCard} key={idx}>
            <div className={styles.metricIcon} aria-hidden="true">{icon}</div>
            <div className={styles.metricValue}>{value}</div>
            <div className={styles.metricLabel}>{label}</div>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why This Project?</h2>
        <ul className={styles.list}>
          <li>Bridges hospitals, donors, and the community</li>
          <li>Enables data-driven blood management</li>
          <li>Real-time stock updates and instant notifications</li>
          <li>Prioritizes user privacy and data security</li>
          <li>Cultivates voluntary blood donation nationwide</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>DevOps & CI/CD Practices</h2>
        <ul className={styles.list}>
          <li>Automated integration and deployment with GitHub Actions</li>
          <li>Dockerized services for consistency and scalability</li>
          <li>Rapid, reliable feature delivery for hospitals and donors</li>
        </ul>
      </section>

      <div className={styles.teamNote}>
        <strong>Team Lead:</strong> CHHON Menghout<br />
        <strong>Developers:</strong> BO Sane, CHUM Ratanakchentria, CHHORN Solita, EN Srey Toch<br />
        <strong>Academic Year:</strong> 2024–2025
      </div>
    </div>
  </div>
);

export default About;
