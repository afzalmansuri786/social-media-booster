import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography
} from "@mui/material";

export default function CampaignEditDialog({ open, onClose, campaign, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    status: "",
    budget: "",
    spent: "",
  });

  useEffect(() => {
    if (campaign) {
      // Prefill form with campaign data
      setFormData({
        name: campaign[1] || "",
        platform: campaign[2] || "",
        status: campaign[3] || "",
        budget: campaign[4] || 0,
        spent: campaign[5] || 0,
      });
    }
  }, [campaign]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Only send updated data to parent
    onSave(formData);
  };

  if (!campaign) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Campaign</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Spent"
              name="spent"
              type="number"
              value={formData.spent}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Read-only Created/Updated Dates */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Created At"
              value={campaign[5] ? new Date(campaign[5]).toLocaleString() : "-"}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              label="Updated At"
              value={campaign.updated_date ? new Date(campaign.updated_date).toLocaleString() : "-"}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid> */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
