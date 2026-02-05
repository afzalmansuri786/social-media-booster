import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";

export default function CampaignForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    platform: "",
    status: "",
    budget: "",
    spent: "",
  });

  return (
    <Stack spacing={2}>
      {Object.keys(form).map(key => (
        <TextField
          key={key}
          label={key.toUpperCase()}
          value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <Button
        variant="contained"
        onClick={() => onSubmit(form)}
      >
        Create Campaign
      </Button>
    </Stack>
  );
}
