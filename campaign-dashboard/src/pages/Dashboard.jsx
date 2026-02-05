import { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, Box, AppBar, Toolbar, Button } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { api } from "../../api/client";
import { useNavigate } from "react-router-dom";
import MetricCard from "../components/MetricCard";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();

  const [statusData, setStatusData] = useState({});
  const [budgetData, setBudgetData] = useState({});
  const [quote, setQuote] = useState("");

  useEffect(() => {
    api.get("/dashboard/status-summary").then(res => setStatusData(res.data));
    api.get("/dashboard/budget-summary").then(res => setBudgetData(res.data));
    api.get("/external/marketing-quote").then(res => setQuote(res.data.quote));
  }, []);

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Campaign Tracker</Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/campaigns")}>Campaigns</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" mb={3}>
          Dashboard
        </Typography>

        {/* Quote */}
        <Card sx={{ p: 2, mb: 4, bgcolor: "#f5f5f5", maxWidth: 600, mx: "auto" }}>
          <Typography variant="subtitle1" color="text.secondary">Marketing Quote</Typography>
          <Typography variant="h6" sx={{ fontStyle: "italic", mt: 1 }}>
            {quote || "Loading..."}
          </Typography>
        </Card>

        {/* Metrics */}
        <Grid container spacing={3} justifyContent="center" mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Total Budget" value={`$${budgetData.total_budget || 0}`} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Total Spent" value={`$${budgetData.total_spent || 0}`} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Active Campaigns" value={statusData[0]?.[1] || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Inactive Campaigns" value={statusData[2]?.[1] || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Paused Campaigns" value={statusData[1]?.[1] || 0} />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" mb={2}>Campaign Status Distribution</Typography>
              <Box sx={{ minHeight: 300 }}>
                <Pie
                  data={{
                    labels: Array.isArray(statusData)
                      ? statusData.map(item => item[0])
                      : [],
                    datasets: [{
                      data: Array.isArray(statusData)
                        ? statusData.map(item => item[1])
                        : [],
                      backgroundColor: ["#1976d2", "#9c27b0", "#ed6c02", "#388e3c"]
                    }]
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" mb={2}>Budget vs Spent</Typography>
              <Box sx={{ minHeight: 300 }}>
                <Bar
                  data={{
                    labels: ["Budget", "Spent"],
                    datasets: [{
                      label: "Amount ($)",
                      data: [budgetData?.total_budget || 0, budgetData?.total_spent || 0],
                      backgroundColor: ["#1976d2", "#9c27b0"]
                    }]
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
