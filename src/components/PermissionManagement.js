import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Breadcrumbs,
  Link
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { GridToolbar } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";

const screenPermissions = [
  { id: 1, name: "Dashboard", read: false, write: false, delete: false },
  { id: 2, name: "Kullanıcı Yönetimi", read: false, write: false, delete: false },
  { id: 3, name: "Departman Yönetimi", read: false, write: false, delete: false },
  { id: 4, name: "Raporlar", read: false, write: false, delete: false },
  { id: 5, name: "Ayarlar", read: false, write: false, delete: false },
];

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState(screenPermissions);
  const [, setSelectedRows] = useState([]);

  const handlePermissionChange = (id, permissionType) => {
    setPermissions(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item };
        
        if (permissionType === 'delete') {
          updatedItem.delete = !item.delete;
          if (updatedItem.delete) {
            updatedItem.write = true;
            updatedItem.read = true;
          }
        } 
        else if (permissionType === 'write') {
          updatedItem.write = !item.write;
          if (updatedItem.write) {
            updatedItem.read = true;
          } else {
            updatedItem.delete = false;
          }
        }
        else if (permissionType === 'read') {
          updatedItem.read = !item.read;
          if (!updatedItem.read) {
            updatedItem.write = false;
            updatedItem.delete = false;
          }
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const handleSelectAll = (permissionType, value) => {
    setPermissions(prev => prev.map(item => {
      const updatedItem = { ...item };
      
      if (permissionType === 'read') {
        updatedItem.read = value;
        if (!value) {
          updatedItem.write = false;
          updatedItem.delete = false;
        }
      } 
      else if (permissionType === 'write') {
        updatedItem.write = value;
        if (value) {
          updatedItem.read = true;
        } else {
          updatedItem.delete = false;
        }
      }
      else if (permissionType === 'delete') {
        updatedItem.delete = value;
        if (value) {
          updatedItem.write = true;
          updatedItem.read = true;
        }
      }
      
      return updatedItem;
    }));
  };

  const handleSave = () => {
    console.log("Kaydedilen yetkiler:", permissions);
    alert("Yetkiler başarıyla kaydedildi!");
  };

  const columns = [
    { 
      field: "name", 
      headerName: "Ekran Adı", 
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="medium">{params.value}</Typography>
      )
    },
    { 
      field: "read", 
      headerName: "Okuma", 
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handlePermissionChange(params.row.id, 'read')}
          color="primary"
        />
      )
    },
    { 
      field: "write", 
      headerName: "Yazma", 
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handlePermissionChange(params.row.id, 'write')}
          color="primary"
        />
      )
    },
    { 
      field: "delete", 
      headerName: "Silme", 
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handlePermissionChange(params.row.id, 'delete')}
          color="primary"
        />
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Link color="inherit" href="/dashboard">Dashboard</Link>
        <Link color="inherit" href="/settings">Ayarlar</Link>
        <Typography color="text.primary">Yetki Yönetimi</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Yetki Yönetimi</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
          Yetkileri Kaydet
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mb: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Typography variant="subtitle1">Toplu Yetkilendirme:</Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleSelectAll('read', e.target.checked)}
              indeterminate={permissions.some(p => p.read) && !permissions.every(p => p.read)}
            />
          }
          label="Tümünü Oku"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleSelectAll('write', e.target.checked)}
              checked={permissions.every(p => p.write)}
              indeterminate={permissions.some(p => p.write) && !permissions.every(p => p.write)}
            />
          }
          label="Tümünü Yaz"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleSelectAll('delete', e.target.checked)}
              checked={permissions.every(p => p.delete)}
              indeterminate={permissions.some(p => p.delete) && !permissions.every(p => p.delete)}
            />
          }
          label="Tümünü Sil"
        />
      </Box>

      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={permissions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          sx={{ '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
        />
      </Box>
    </Box>
  );
}