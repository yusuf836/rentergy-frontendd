import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Form.module.css';

const Form = () => {
  const [appliances, setAppliances] = useState('');
  const [hours, setHours] = useState('');
  const [bill, setBill] = useState('');
  const [email, setEmail] = useState('');
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        appliances,
        hours,
        bill,
        email,
      });
      setTips(response.data.tips);
      window.gtag('event', 'submit', { event_category: 'Form' });
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section id="quiz" className={styles.quiz}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Get Your Personalized Tips</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="appliances">Number of major appliances</label>
            <input
              type="number"
              id="appliances"
              value={appliances}
              onChange={(e) => setAppliances(e.target.value)}
              min="0"
              required
              aria-label="Number of major appliances"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="hours">Average hours per day appliances run</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="0"
              max="24"
              required
              aria-label="Average hours per day appliances run"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bill">Average monthly electricity bill ($)</label>
            <input
              type="number"
              id="bill"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min="0"
              required
              aria-label="Average monthly electricity bill in dollars"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Your email address"
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Loading...' : 'Get Tips'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {tips && (
          <div className={styles.tips} dangerouslySetInnerHTML={{ __html: tips }} />
        )}
      </div>
    </section>
  );
};

export default Form;