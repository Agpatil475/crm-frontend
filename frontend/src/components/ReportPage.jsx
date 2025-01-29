import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f4eaff',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#6a4c93',
      cursor: 'pointer',
    },
    title: {
      fontSize: '20px',
      color: '#6a4c93',
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    tabButton: {
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: '#fff',
      color: '#6a4c93',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    activeTab: {
      backgroundColor: '#6a4c93',
      color: '#fff',
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#6a4c93',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '10px',
    },
    card: {
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      textAlign: 'center',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    cardLabel: {
      fontSize: '14px',
      color: '#aaa',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          &lt;
        </button>
        <h1 style={styles.title}>My Reports</h1>
        <div>
          <button style={styles.backButton}>⤴</button>
          <button style={styles.backButton}>⬇</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{ ...styles.tabButton, ...styles.activeTab }}>Today</button>
        <button style={styles.tabButton}>My Report</button>
      </div>

      {/* Sections */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Activity Report</h2>
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <div style={styles.cardNumber}>0</div>
            <div style={styles.cardLabel}>Total Number of Breaks</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>0</div>
            <div style={styles.cardLabel}>Total Break Duration</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>0:00:00</div>
            <div style={styles.cardLabel}>Avg. Break Duration</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>0:00:00</div>
            <div style={styles.cardLabel}>Avg. Calling Time</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardNumber}>0:00:00</div>
            <div style={styles.cardLabel}>Avg. Form Filling Time</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Message Activity Report</h2>
        <div style={styles.card}>
          <div style={styles.cardNumber}>0</div>
          <div style={styles.cardLabel}>Messages</div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
