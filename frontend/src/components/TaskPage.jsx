import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f4eaff',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: '20px',
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#6a4c93',
      cursor: 'pointer',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: '40px',
      borderBottom: '2px solid #6a4c93',
    },
    tabButton: {
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#6a4c93',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '4px solid #6a4c93',
    },
    noTasks: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    noTasksIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '20px',
    },
    noTasksText: {
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
        <h1 style={{ color: '#6a4c93', fontSize: '20px', flex: 1, textAlign: 'center' }}>
          My Tasks
        </h1>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{ ...styles.tabButton, ...styles.activeTab }}>
          ASSIGNED TO ME
        </button>
        <button style={styles.tabButton}>REPORTED BY ME</button>
      </div>

      {/* No Tasks Found Section */}
      <div style={styles.noTasks}>
        <img
          src="./src/assets/task-icon.png" // Replace with your task icon URL/path
          alt="No Tasks"
          style={styles.noTasksIcon}
        />
        <p style={styles.noTasksText}>No tasks found.</p>
      </div>
    </div>
  );
};

export default TaskPage;
