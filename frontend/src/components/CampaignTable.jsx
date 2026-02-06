import {
  Table, TableBody, TableCell, TableHead, TableRow,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CampaignTable({ campaigns, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Platform</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Budget</TableCell>
          <TableCell>Spent</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {campaigns.map(c => (
          <TableRow key={c.id}>
            <TableCell>{c.name}</TableCell>
            <TableCell>{c.platform}</TableCell>
            <TableCell>{c.status}</TableCell>
            <TableCell>${c.budget}</TableCell>
            <TableCell>${c.spent}</TableCell>
            <TableCell>
              <IconButton color="error" onClick={() => onDelete(c.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
