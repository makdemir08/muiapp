import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  useTheme,
  MenuItem // Bu satırı ekleyin
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Settings() {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "tr",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Ayarları kaydetme işlemi
    console.log("Ayarlar kaydedildi:", settings);
    // Burada API çağrısı yapabilirsiniz
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SettingsIcon sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h4">Sistem Ayarları</Typography>
      </Box>

      <Box sx={{ 
        bgcolor: theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 800,
        mx: 'auto'
      }}>
        <Typography variant="h6" gutterBottom>Genel Ayarlar</Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={handleChange}
              name="darkMode"
              color="primary"
            />
          }
          label="Koyu Tema"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications}
              onChange={handleChange}
              name="notifications"
              color="primary"
            />
          }
          label="Bildirimleri Aç"
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Dil Seçeneği"
          name="language"
          value={settings.language}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="tr">Türkçe</MenuItem>
          <MenuItem value="en">İngilizce</MenuItem>
          <MenuItem value="de">Almanca</MenuItem>
        </TextField>

        <TextField
          label="Email Bildirim Adresi"
          name="email"
          value={settings.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Ayarları Kaydet
        </Button>
      </Box>
    </Box>
  );
}