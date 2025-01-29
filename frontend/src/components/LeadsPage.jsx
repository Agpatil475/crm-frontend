import React, { useState, useEffect } from 'react';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    // Fetch all lead data from localStorage
    const allLeads = JSON.parse(localStorage.getItem('leadData')) || [];
    // Filter leads based on agentName
    const filteredLeads = allLeads.filter((lead) => lead.agent === agentName);
    setLeads(filteredLeads);
  }, [agentName]);

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333' }}>
          Employee Dashboard - Uploaded Leads
        </h1>
        <input
          type="text"
          placeholder="Enter Agent Name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '20px',
            width: '100%',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
        {leads.length > 0 ? (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr>
                {Object.keys(leads[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '10px',
                      textAlign: 'left',
                      borderBottom: '2px solid #ddd',
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {Object.values(lead).map((value, idx) => (
                    <td
                      key={idx}
                      style={{
                        padding: '10px',
                        textAlign: 'left',
                      }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: '#777' }}>
            No leads found for the specified agent.
          </p>
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
