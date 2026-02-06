import { useEffect, useState } from "react";
import {
  Container, Grid, Typography, Card, CardContent,
  Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Box,
  AppBar, Toolbar, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import { } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { api } from "../../api/client";

import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import CampaignEditDialog from "../components/CampaignEditDialog";
import CampaignDetailsDialog from "../components/CampaignDetailsDialog";

export default function Campaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({
    name: "", platform: "", status: "", budget: "", spent: ""
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fetch all campaigns
  const fetchCampaigns = () => {
    api.get("/campaigns/").then(res => setCampaigns(res.data));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Create new campaign
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post("/campaigns/", form).then(() => {
      setForm({ name: "", platform: "", status: "", budget: "", spent: "" });
      fetchCampaigns();
    });
  };

  // Open Delete Dialog
  const openDeleteDialog = (campaign) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    api.delete(`/campaigns/${selectedCampaign[0]}`).then(() => {
      setDeleteDialogOpen(false);
      setSelectedCampaign(null);
      fetchCampaigns();
    });
  };

  // Open Edit Dialog (fetch by ID for prefill)
  const openEditDialog = (campaign) => {
    api.get(`/campaigns/${campaign[0]}`).then(res => {
      setSelectedCampaign(res.data); // Prefill with fresh data
      setEditDialogOpen(true);
    });
  };

  // Save updated campaign
  const saveEdit = (updatedData) => {
    api.put(`/campaigns/${selectedCampaign[0]}`, updatedData).then(() => {
      setEditDialogOpen(false);
      setSelectedCampaign(null);
      fetchCampaigns();
    });
  };

  // Open Details Dialog
  const openDetailsDialog = (campaign) => {
    setSelectedCampaign(campaign);
    setDetailsDialogOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Campaign Tracker</Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/campaigns")}>Campaigns</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Campaigns</Typography>

        {/* Create Campaign Form */}
        <Card sx={{ mb: 3, p: 2 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} display="grid">
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Platform" name="platform" value={form.platform} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={form.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Budget" name="budget" type="number" value={form.budget} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Spent" name="spent" type="number" value={form.spent} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6} md={4} display="flex" alignItems="center">
                <Button type="submit" variant="contained" fullWidth sx={{ height: "56px" }}>
                  Create Campaign
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>

        {/* Campaigns Table */}
        <TableContainer component={Paper}>
          <Table aria-label="campaigns table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Spent</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign[0]}>
                  <TableCell>{campaign[1]}</TableCell>
                  <TableCell>{campaign[2]}</TableCell>
                  <TableCell>{campaign[3]}</TableCell>
                  <TableCell>${campaign[4]}</TableCell>
                  <TableCell>${campaign[5]}</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <Button size="small" startIcon={<VisibilityIcon />} onClick={() => openDetailsDialog(campaign)} sx={{ mr: 1 }}>
                      View
                    </Button>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => openEditDialog(campaign)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    {console.log({ campaign })}
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => openDeleteDialog(campaign)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No campaigns found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialogs */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          campaignName={selectedCampaign?.[1]}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />

        <CampaignEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          campaign={selectedCampaign}
          onSave={saveEdit}
        />

        <CampaignDetailsDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          campaign={selectedCampaign}
        />
      </Container>
    </>
  );
}
