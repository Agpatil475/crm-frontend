import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Welcome</h2>
        <p className="employee-name">{loggedInUser.name || 'User'}</p>
        <div className="sidebar-menu">
          <button className="menu-item" onClick={() => navigate('/leads')}>My Leads</button>
          <button className="menu-item" onClick={() => navigate('/task')}>My Tasks</button>
          <button className="menu-item" onClick={() => navigate('/report')}>My Reports</button>
          <button className="menu-item" onClick={() => navigate('/logs')}>Call Logs</button>
          <button className="menu-item" onClick={() => navigate('/walk-in')}>Walk-in Leads</button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <button className="start-btn">Start</button>
          <div className="form-field">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        <div className="cards-container">
          <div className="card purple" onClick={() => navigate('/campaigns')}>My Campaigns</div>
          <div className="card pink" onClick={() => navigate('/leads')}>My Leads</div>
          <div className="card purple" onClick={() => navigate('/task')}>My Tasks</div>
          <div className="card pink" onClick={() => navigate('/report')}>My Reports</div>
          <div className="card purple" onClick={() => navigate('/logs')}>Call Logs</div>
          <div className="card green" onClick={() => navigate('/walk-in')}>Walk-in Leads</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
