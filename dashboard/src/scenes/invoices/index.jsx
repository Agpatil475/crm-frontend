import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Invoices = () => {
  const [campaigns, setCampaigns] = useState(() => {
    const savedCampaigns = localStorage.getItem("campaigns");
    return savedCampaigns ? JSON.parse(savedCampaigns) : [];
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);

  useEffect(() => {
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  const handleDelete = (id) => {
    const updatedCampaigns = campaigns.filter((campaign) => campaign.id !== id);
    setCampaigns(updatedCampaigns);
  };

  const handleEditOpen = (campaign) => {
    setEditCampaign(campaign);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditCampaign({ ...editCampaign, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === editCampaign.id ? editCampaign : campaign
    );
    setCampaigns(updatedCampaigns);
    setEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "pipeline", headerName: "Pipeline", flex: 1, editable: true },
    { field: "agents", headerName: "Agents", flex: 1 },
    { field: "leadDistribution", headerName: "Lead Distribution", flex: 1 },
    { field: "priority", headerName: "Priority", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditOpen(params.row)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Created Campaigns
      </Typography>
      <Box height="75vh">
        <DataGrid
          rows={campaigns.map((campaign, index) => ({
            id: campaign.id || Date.now() + index, // Ensure unique ID
            ...campaign,
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </Box>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: "8px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Campaign
          </Typography>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={editCampaign?.name || ""}
            onChange={handleEditChange}
            margin="dense"
          />
          <TextField
            fullWidth
            name="pipeline"
            label="Pipeline"
            value={editCampaign?.pipeline || ""}
            onChange={handleEditChange}
            margin="dense"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEditSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Invoices;
