import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

function Integration() {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [campaignType, setCampaignType] = useState("new");
  const [campaignName, setCampaignName] = useState("");
  const [campaigns, setCampaigns] = useState(["April Leads", "May Leads"]);
  const [fieldMappings, setFieldMappings] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({ apiKey: API_KEY, clientId: CLIENT_ID, scope: SCOPES });
    });
  }, []);

  const handleGoogleAuth = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        setAlertMessage("Google Authentication Successful!");
        setOpenAlert(true);
      });
  };

  const handleUpload = async () => {
    if (!googleSheetUrl) {
      setAlertMessage("Please enter a valid Google Sheet URL.");
      setOpenAlert(true);
      return;
    }

    const campaign = campaignType === "new" ? campaignName : campaignType;
    if (!campaign) {
      setAlertMessage("Please enter a campaign name.");
      setOpenAlert(true);
      return;
    }

    setAlertMessage("Google Sheet successfully integrated with " + campaign);
    setOpenAlert(true);
    setOpenDialog(false);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        Google Sheets Integration
      </Typography>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Integrate Google Sheets
      </Button>

      {/* Google Sheets Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Integrate Google Sheet</DialogTitle>
        <DialogContent>
          <Button variant="contained" onClick={handleGoogleAuth}>
            Sign in with Google
          </Button>
          <TextField
            label="Google Sheet URL"
            fullWidth
            margin="normal"
            value={googleSheetUrl}
            onChange={(e) => setGoogleSheetUrl(e.target.value)}
          />

          <Typography variant="h6">Select Campaign</Typography>
          <Select
            fullWidth
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
          >
            <MenuItem value="new">Create a new Campaign</MenuItem>
            {campaigns.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          {campaignType === "new" && (
            <TextField
              label="Campaign Name"
              fullWidth
              margin="normal"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          )}

          <Typography variant="h6">Field Mapping</Typography>
          <TextField
            label="Contact Name Column"
            fullWidth
            margin="normal"
            onChange={(e) =>
              setFieldMappings({ ...fieldMappings, name: e.target.value })
            }
          />
          <TextField
            label="Phone Number Column"
            fullWidth
            margin="normal"
            onChange={(e) =>
              setFieldMappings({ ...fieldMappings, phone: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpload} color="primary">
            Upload Google Sheet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </Box>
  );
}

export default Integration;
