import { Card, CardContent, Typography } from "@mui/material";

export default function MetricCard({ title, value }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
}
