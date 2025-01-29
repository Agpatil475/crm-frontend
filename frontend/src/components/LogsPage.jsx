import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogsPage = () => {
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
      alignItems: 'center',
      justifyContent: 'space-between',
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
    filterIcon: {
      fontSize: '20px',
      color: '#6a4c93',
      cursor: 'pointer',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '40px',
      borderBottom: '2px solid #6a4c93',
    },
    tabButton: {
      flex: 1,
      textAlign: 'center',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#6a4c93',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '4px solid #6a4c93',
    },
    noLogs: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    noLogsIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '20px',
    },
    noLogsText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#6a4c93',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          &lt;
        </button>
        <h1 style={styles.title}>Call Logs</h1>
        <div style={styles.filterIcon}>🔍</div> {/* Placeholder for filter icon */}
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{ ...styles.tabButton, ...styles.activeTab }}>ALL</button>
        <button style={styles.tabButton}>OUTGOING</button>
        <button style={styles.tabButton}>INCOMING</button>
        <button style={styles.tabButton}>MISSED</button>
      </div>

      {/* No Call Logs Section */}
      <div style={styles.noLogs}>
        <img
          src="./src/assets/call-log-icon.png" // Replace with the path to your clipboard icon
          alt="No Call Logs"
          style={styles.noLogsIcon}
        />
        <p style={styles.noLogsText}>No Call Logs</p>
      </div>
    </div>
  );
};

export default LogsPage;
