import React, { useState } from "react";
import styles from "./Contact.module.css";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const defaultForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validate fields
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Network response was not ok");

      setSuccess("Thank you! Your message was sent.");
      setForm(defaultForm);
    } catch (error) {
      setSuccess("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactBg}>
      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.contactTitle}>Contact Our Team</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            placeholder="Your full name"
            title="Please enter your full name"
            onChange={e => setForm({ ...form, name: e.target.value })}
            className={errors.name ? styles.inputError : ""}
            disabled={loading}
            required
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            title="Please enter a valid email address"
            onChange={e => setForm({ ...form, email: e.target.value })}
            className={errors.email ? styles.inputError : ""}
            disabled={loading}
            required
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            placeholder="Subject of your message"
            title="Please enter the subject"
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className={errors.subject ? styles.inputError : ""}
            disabled={loading}
            required
          />
          {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            value={form.message}
            placeholder="Type your message here..."
            title="Please enter your message"
            onChange={e => setForm({ ...form, message: e.target.value })}
            className={errors.message ? styles.inputError : ""}
            rows={6}
            disabled={loading}
            required
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
        {success && <div className={styles.successMsg}>{success}</div>}
      </form>
    </div>
  );
};

export default Contact;
