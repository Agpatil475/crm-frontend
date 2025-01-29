import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignPage = () => {
  const navigate = useNavigate();

  // In-line styles
  const styles = {
    container: {
      backgroundColor: '#f4eaff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
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
      cursor: 'pointer',
      marginRight: '10px',
      color: '#6a4c93',
    },
    title: {
      fontSize: '20px',
      color: '#6a4c93',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '40px',
      width: '100%',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      marginRight: '10px',
    },
    clearButton: {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#aaa',
    },
    noCampaigns: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    noCampaignsIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '20px',
    },
    noCampaignsText: {
      color: '#6a4c93',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          &lt;
        </button>
        <h1 style={styles.title}>My Campaigns</h1>
      </div>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search Campaign"
          style={styles.input}
        />
        <button style={styles.clearButton}>X</button>
      </div>

      {/* No Campaigns Section */}
      <div style={styles.noCampaigns}>
        <img
          src="./src/assets/campaign-icon.png" // Replace with your icon URL or path
          alt="No Campaigns"
          style={styles.noCampaignsIcon}
        />
        <p style={styles.noCampaignsText}>No campaigns found.</p>
      </div>
    </div>
  );
};

export default CampaignPage;
