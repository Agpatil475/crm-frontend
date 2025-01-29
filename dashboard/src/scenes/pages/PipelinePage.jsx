import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import * as XLSX from "xlsx";

const PipelinePage = ({ onCampaignCreate }) => {
  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [pipelineType, setPipelineType] = useState("");
  const [leadDistribution, setLeadDistribution] = useState("AI Assignment");
  const [campaignPriority, setCampaignPriority] = useState("Medium");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected!");
      return;
    }
    setSelectedFile(file);
  };

  const distributeLeads = (leads, agents) => {
    const distributedLeads = [];
    const agentCount = agents.length;
    if (agentCount === 0) return leads;

    leads.forEach((lead, index) => {
      const agentIndex = index % agentCount;
      distributedLeads.push({
        ...lead,
        agent: agents[agentIndex],
      });
    });
    return distributedLeads;
  };

  const handleFormSubmit = () => {
    if (
      !selectedFile ||
      selectedAgents.length === 0 ||
      !campaignName ||
      !pipelineType
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonData.length) {
          alert("The Excel file is empty or contains no valid data.");
          return;
        }

        const distributedLeads = distributeLeads(jsonData, selectedAgents);
        const newCampaign = {
          id: Date.now(),
          name: campaignName,
          pipeline: pipelineType,
          agents: selectedAgents.join(", "),
          leadDistribution,
          priority: campaignPriority,
          leads: distributedLeads,
        };

        onCampaignCreate(newCampaign);
        alert("Campaign Created and Leads Distributed Successfully!");
        setAddLeadModalOpen(false);
      } catch (error) {
        console.error("Error parsing the Excel file:", error);
        alert(
          "Failed to parse the Excel file. Ensure it is a valid Excel file."
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Create Campaign
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddLeadModalOpen(true)}
        style={{
          backgroundColor: "purple",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Create Campaign
      </Button>

      <Modal
        open={isAddLeadModalOpen}
        onClose={() => setAddLeadModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="500" mb={2}>
            Create Campaign
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Pipeline"
            value={pipelineType}
            onChange={(e) => setPipelineType(e.target.value)}
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Agents</InputLabel>
            <Select
              multiple
              value={selectedAgents}
              onChange={(e) => setSelectedAgents(e.target.value)}
            >
              <MenuItem value="Agent1">Agent1</MenuItem>
              <MenuItem value="Agent2">Agent2</MenuItem>
              <MenuItem value="Agent3">Agent3</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" fontWeight="500" mt={2}>
            Additional Settings
          </Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel>Lead Distribution</InputLabel>
            <Select
              value={leadDistribution}
              onChange={(e) => setLeadDistribution(e.target.value)}
            >
              <MenuItem value="AI Assignment">AI Assignment</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Campaign Priority</InputLabel>
            <Select
              value={campaignPriority}
              onChange={(e) => setCampaignPriority(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <input
            type="file"
            accept=".xlsx,.xls.csv"
            onChange={handleFileChange}
            style={{ marginTop: "16px" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
            style={{
              backgroundColor: "purple",
              color: "white",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PipelinePage;
