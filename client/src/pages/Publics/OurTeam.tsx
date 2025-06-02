import React, { useState } from "react";
import styles from "./OurTeam.module.css";

// Team data
const teamMembers = [
  {
    name: "CHHON Menghout",
    role: "Team Lead & Data Scientist",
    image: "/assets/team/Menghout.jpg",
    skills: [
      "Python & SQL",
      "Data Engineering",
      "React",
      "ETL & Data Pipelines",
      "Leadership",
      "Cloud & DevOps"
    ],
    linkedin: "https://www.linkedin.com/in/menghout-chhon/",
    instagram: "https://www.instagram.com/devin_lorne_/",
    facebook: "https://www.facebook.com/meng.hout.942455",
  },
  {
    name: "BO Sane",
    role: "Frontend Developer & Data Visualization",
    image: "/assets/team/Sane.jpg",
    skills: [
      "React & JavaScript",
      "Data Visualization",
      "UI/UX Design",
      "Looker Studio",
      "Responsive Design",
      "Team Collaboration"
    ],
    linkedin: "https://www.linkedin.com/in/bo-sane-7818ab2b5/",
    instagram: "https://www.instagram.com/sa.ne.44?igsh=NDQzazNnaXltdjVs",
    facebook: "https://www.facebook.com/share/1EYvUYWzXu/?mibextid=wwXIfr",
  },
  {
    name: "CHUM Ratanakchentria",
    role: "Full Stack Developer & Data Analyst",
    image: "/assets/team/Chantria.jpg",
    skills: [
      "Full-Stack Development",
      "SQL & Database Design",
      "Data Analysis",
      "React & Express",
      "Report Automation",
      "Problem Solving"
    ],
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
  {
    name: "CHHORN Solita",
    role: "Backend Developer & Machine Learning Engineer",
    image: "/assets/team/Solita.jpg",
    skills: [
      "Node.js & Express",
      "Machine Learning",
      "API Design",
      "Model Deployment",
      "Python & TensorFlow",
      "Automation"
    ],
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
  {
    name: "EN Srey Toch",
    role: "Data Quality & QA Specialist",
    image: "/assets/team/SreyToch.jpg",
    skills: [
      "Data Cleaning",
      "Quality Assurance",
      "Testing Automation",
      "Python",
      "Documentation",
      "Attention to Detail"
    ],
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
];

const lecturers = [
  { name: "Mr. Ngin Kimlong", note: "(Course)" },
  { name: "Mr. Khean Visal", note: "(TP)" },
];

const OurTeam: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % teamMembers.length);

  const member = teamMembers[current];

  return (
    <div className={styles.teamBgLarge}>
      <div className={styles.teamContainerLarge}>
        <h1 className={styles.teamTitleLarge}>Team 2</h1>
        <p className={styles.teamSubtitleLarge}>Database and Admin</p>
        <div className={styles.profileCardLarge}>
          <div className={styles.avatarWrapLarge}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.avatarLarge}
              loading="lazy"
            />
          </div>
          <div className={styles.profileContentLarge}>
            <h3 className={styles.cardNameLarge}>{member.name}</h3>
            <div className={styles.cardRoleLarge}>{member.role}</div>
            <div className={styles.skillsListLarge}>
              {member.skills.map((skill, si) => (
                <span className={styles.skillBadgeLarge} key={si}>
                  {skill}
                </span>
              ))}
            </div>
            <div className={styles.socialLinksLarge}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLarge}
                title="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLarge}
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLarge}
                title="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
          <div className={styles.navBtnsLarge}>
            <button className={styles.navBtnLarge} onClick={handlePrev} title="Previous">
              &#8592; Prev
            </button>
            <span className={styles.memberCounterLarge}>
              {current + 1} / {teamMembers.length}
            </span>
            <button className={styles.navBtnLarge} onClick={handleNext} title="Next">
              Next &#8594;
            </button>
          </div>
        </div>
        <div className={styles.lecturersSectionLarge}>
          <h2 className={styles.lecturersTitleLarge}>Lecturers</h2>
          <div className={styles.lecturersListLarge}>
            {lecturers.map((lect, i) => (
              <div key={i} className={styles.lecturerItemLarge}>
                <span>{lect.name}</span>
                <span className={styles.lecturerNoteLarge}>{lect.note}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerNoteLarge}>
          <span>Academic Year: 2024-2025</span>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
