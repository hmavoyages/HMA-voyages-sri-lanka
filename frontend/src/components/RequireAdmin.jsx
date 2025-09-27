// src/auth/RequireAdmin.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button,
  InputAdornment, IconButton
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ADMIN_PASS = "hmav@2026";

export default function RequireAdmin({ children }) {
  const [ok, setOk] = useState(false);
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_ok") === "1") setOk(true);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) {
      sessionStorage.setItem("admin_ok", "1");
      setOk(true);
    } else {
      setErr("Incorrect password");
    }
  };

  if (ok) return children;

  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper elevation={2} sx={{ p: 3, width: "100%", maxWidth: 360 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <LockRoundedIcon />
          <Typography variant="h6" fontWeight={700}>Admin Access</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter the admin password to continue.
        </Typography>

        <form onSubmit={submit}>
          <TextField
            label="Password"
            fullWidth
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            error={!!err}
            helperText={err || " "}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow((s) => !s)} edge="end">
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained">Enter</Button>
        </form>
      </Paper>
    </Box>
  );
}
