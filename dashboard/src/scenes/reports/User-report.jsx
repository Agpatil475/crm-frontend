import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { format } from "date-fns";

function UserReport() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [columns, setColumns] = useState([
    { label: "User Name", value: "userName", checked: true },
    { label: "Mobile Number", value: "mobileNumber", checked: true },
    { label: "Date", value: "date", checked: true },
    {
      label: "Total Calls Attempted",
      value: "totalCallsAttempted",
      checked: true,
    },
    {
      label: "Total Calls Connected",
      value: "totalCallsConnected",
      checked: true,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, [dateRange, selectedUsers, selectedManagers]);

  const fetchData = async () => {
    const response = await axios.get("https://api.example.com/user-reports", {
      params: {
        from: dateRange.from,
        to: dateRange.to,
        users: selectedUsers.map((u) => u.value),
        managers: selectedManagers.map((m) => m.value),
      },
    });
    setData(response.data);
  };

  const handleDateChange = (e, type) => {
    setDateRange({ ...dateRange, [type]: e.target.value });
  };

  const toggleColumn = (colValue) => {
    setColumns(
      columns.map((col) =>
        col.value === colValue ? { ...col, checked: !col.checked } : col
      )
    );
  };

  return (
    <div className="container">
      <h1>User Report</h1>

      {/* Date Range Filter */}
      <div className="filter">
        <label>From: </label>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => handleDateChange(e, "from")}
        />
        <label>To: </label>
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => handleDateChange(e, "to")}
        />
      </div>

      {/* User Filter */}
      <Select
        options={[
          { value: "Ayesha", label: "Ayesha" },
          { value: "Usha", label: "Usha" },
        ]}
        isMulti
        onChange={setSelectedUsers}
        placeholder="Select Users"
      />

      {/* Manager Filter */}
      <Select
        options={[
          { value: "Manager1", label: "Manager 1" },
          { value: "Manager2", label: "Manager 2" },
        ]}
        isMulti
        onChange={setSelectedManagers}
        placeholder="Select Reporting Managers"
      />

      {/* Column Selection */}
      <div className="column-selector">
        {columns.map((col) => (
          <label key={col.value}>
            <input
              type="checkbox"
              checked={col.checked}
              onChange={() => toggleColumn(col.value)}
            />
            {col.label}
          </label>
        ))}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {columns
              .filter((col) => col.checked)
              .map((col) => (
                <th key={col.value}>{col.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns
                .filter((col) => col.checked)
                .map((col) => (
                  <td key={col.value}>{row[col.value]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserReport;
