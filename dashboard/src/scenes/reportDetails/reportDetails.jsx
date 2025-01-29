import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ReportDetail() {
  const { id } = useParams(); // Get report id from URL
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const reportData = JSON.parse(localStorage.getItem(`report_${id}`)) || []; // Fetch report data by id
    if (reportData.length > 0) {
      const generatedColumns = Object.keys(reportData[0]).map((key) => ({
        field: key,
        headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
        flex: 1,
      }));
      setColumns(generatedColumns);
      setRows(reportData);
    }
  }, [id]);

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px" color="#1976d2">
        {`${id} Report Detail`}
      </Typography>
      <Box sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" },
          }}
        />
      </Box>
    </Box>
  );
}

export default ReportDetail;
