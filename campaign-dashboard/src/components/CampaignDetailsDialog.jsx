import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from "@mui/material";

export default function CampaignDetailsDialog({ open, onClose, campaign }) {
  if (!campaign) return null;

  // Format the created date nicely
  const createdDate = campaign[6] ? new Date(campaign[6]).toLocaleString() : "N/A";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth >
      <DialogTitle>Campaign Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} display="grid">
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">ID</Typography>
            <Typography variant="body1">{campaign[0]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Name</Typography>
            <Typography variant="body1">{campaign[1]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Platform</Typography>
            <Typography variant="body1">{campaign[2]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Status</Typography>
            <Typography variant="body1">{campaign[3]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Budget</Typography>
            <Typography variant="body1">${campaign[4]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Spent</Typography>
            <Typography variant="body1">${campaign[5]}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Created Date</Typography>
            <Typography variant="body1">{createdDate}</Typography>
          </Grid>

          {/* Updated Date not available */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
