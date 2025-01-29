import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import {
  Star,
  StarBorder,
  Download,
  AddCircleOutline,
} from "@mui/icons-material";

function Reports() {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [reports, setReports] = useState([]);

  // Fetch reports dynamically from an API or local storage
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(storedReports);

    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    setRecentlyViewed(JSON.parse(localStorage.getItem("recentlyViewed")) || []);
  }, []);

  // Search filter
  const filteredReports =
    tabIndex === 1
      ? reports.filter((report) => recentlyViewed.includes(report.id))
      : tabIndex === 2
      ? reports.filter((report) => favorites.includes(report.id))
      : reports.filter((report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Favorite a report
  const toggleFavorite = (id) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites.push(id);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Track Recently Viewed
  const handleReportClick = (id) => {
    let updatedRecentlyViewed = [...recentlyViewed];
    if (!recentlyViewed.includes(id)) {
      updatedRecentlyViewed.unshift(id);
    }
    setRecentlyViewed(updatedRecentlyViewed);
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updatedRecentlyViewed)
    );
  };

  // Download reports as JSON
  const downloadReports = () => {
    const json = JSON.stringify(reports);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Add new report dynamically
  const addNewReport = () => {
    const reportName = prompt("Enter Report Name:");
    const description = prompt("Enter Report Description:");
    const category = prompt("Enter Report Category:");

    if (reportName && description && category) {
      const newReport = {
        id: reports.length + 1,
        name: reportName,
        description,
        category,
      };

      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      localStorage.setItem("reports", JSON.stringify(updatedReports));
    }
  };

  return (
    <Box m="20px">
      {/* Reports Page Heading */}
      <Typography
        variant="h5"
        mb="20px"
        sx={{ fontWeight: "bold", fontSize: "24px" }}
      >
        Reports
      </Typography>

      {/* Tabs for Categories */}
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="All Reports" />
        <Tab label="Recently Viewed" />
        <Tab label="Favorites" />
      </Tabs>

      {/* Search, Download, and Add Report */}
      <Box mt="20px" display="flex" justifyContent="space-between">
        <TextField
          label="Search Reports"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, marginRight: "10px" }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#000", color: "#fff", marginRight: "10px" }}
          onClick={downloadReports}
          startIcon={<Download />}
        >
          DOWNLOAD LOGS
        </Button>
        <IconButton onClick={addNewReport}>
          <AddCircleOutline />
        </IconButton>
      </Box>

      {/* Reports Table */}
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Report Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report, index) => (
              <TableRow
                key={report.id}
                onClick={() => handleReportClick(report.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(report.id);
                    }}
                  >
                    {favorites.includes(report.id) ? (
                      <Star color="primary" />
                    ) : (
                      <StarBorder />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Reports;
