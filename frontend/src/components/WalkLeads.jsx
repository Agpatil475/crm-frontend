import React from 'react';
import { useNavigate } from 'react-router-dom';

const WalkLeads = () => {
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f4eaff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
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
    calendarIcon: {
      fontSize: '20px',
      color: '#6a4c93',
      cursor: 'pointer',
    },
    noLeads: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      textAlign: 'center',
    },
    noLeadsIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '20px',
    },
    noLeadsText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#6a4c93',
    },
    addLeadButton: {
      backgroundColor: '#6a4c93',
      color: '#fff',
      padding: '15px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '0px',
      textAlign: 'center',
      cursor: 'pointer',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          &lt;
        </button>
        <h1 style={styles.title}>Walk-in Leads</h1>
        <div style={styles.calendarIcon}>📅 Last 7 Days</div>
      </div>

      {/* No Leads Section */}
      <div style={styles.noLeads}>
        <img
          src="./src/assets/walkin-leads-icon.png" // Replace with your walk-in icon path or import the file
          alt="No Walk-in Leads"
          style={styles.noLeadsIcon}
        />
        <p style={styles.noLeadsText}>You don't have any walkin leads yet.</p>
      </div>

      {/* Add Lead Button */}
      <button style={styles.addLeadButton}>Add Lead</button>
    </div>
  );
};

export default WalkLeads;
