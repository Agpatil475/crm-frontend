import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Tooltip,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const tabs = [
  "Users",
  "Preference",
  "Accessibility",
  "Pipelines",
  "Profile",
  "Roles and Permission",
  "Automatic Report",
  "Manage Columns",
  "Retry Setting",
  "Lead Priority",
];

const Settings = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
    password: "",
    role: "",
    email: "",
    employeeId: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://us-central1-crm-hosting-6fac7.cloudfunctions.net/api/users"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.userName ||
        !formData.contactNumber ||
        !formData.password ||
        !formData.email ||
        !formData.employeeId
      ) {
        alert("Please fill in all fields.");
        return;
      }

      if (selectedUser) {
        await axios.put(
          `http://us-central1-crm-hosting-6fac7.cloudfunctions.net/api/users/${selectedUser._id}`,
          {
            name: formData.userName,
            email: formData.email,
            phone: formData.contactNumber,
            role: formData.role,
            employeeId: formData.employeeId,
          }
        );
      } else {
        await axios.post(
          "http://us-central1-crm-hosting-6fac7.cloudfunctions.net/api/add-user",
          {
            name: formData.userName,
            email: formData.email,
            phone: formData.contactNumber,
            password: formData.password,
            role: formData.role,
            employeeId: formData.employeeId,
          }
        );
      }

      setOpenModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user");
    }
  };

  const handleClick = (event, user) => {
    setSelectedUser(user);
    setFormData({
      userName: user.name,
      contactNumber: user.phone,
      role: user.role,
      email: user.email,
      employeeId: user.employeeId,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box m="20px">
      {/* Main Heading */}
      <Typography variant="h4" fontWeight="600">
        Settings
      </Typography>

      {/* Navigation Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>

      {/* Sub Heading for Active Tab */}
      <Typography variant="h5" fontWeight="500" mt={2}>
        {tabs[activeTab]}
      </Typography>

      {/* User Management Section (Only visible when 'Users' tab is active) */}
      {activeTab === 0 && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => {
                setOpenModal(true);
                setSelectedUser(null);
                setFormData({
                  userName: "",
                  contactNumber: "",
                  password: "",
                  role: "",
                  email: "",
                  employeeId: "",
                });
              }}
            >
              <AccountCircleIcon sx={{ mr: "10px" }} />
              Add User
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleClick(e, user)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => {
                            setOpenModal(true);
                            handleClose();
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem>Deactivate</MenuItem>
                        <MenuItem>Change Password</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Add/Edit User Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            variant="outlined"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          {!selectedUser && (
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedUser ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
