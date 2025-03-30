import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  IconButton,
  Button,
  Typography,
  useTheme,
  Breadcrumbs,
  Link
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { GridToolbar } from "@mui/x-data-grid";

// Başlangıç departman verileri
const initialDepartments = [
  { id: 1, name: "Yazılım Geliştirme", code: "DEV", manager: "Ahmet Yılmaz", employeeCount: 15 },
  { id: 2, name: "İnsan Kaynakları", code: "HR", manager: "Ayşe Demir", employeeCount: 5 },
  { id: 3, name: "Finans", code: "FIN", manager: "Mehmet Kaya", employeeCount: 8 },
  { id: 4, name: "Pazarlama", code: "MKT", manager: "Fatma Şahin", employeeCount: 12 },
];

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [, setSelectedDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    id: null, 
    name: "", 
    code: "", 
    manager: "", 
    employeeCount: 0 
  });
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();

  const handleOpen = (department = null) => {
    if (department) {
      setFormData(department);
      setIsEdit(true);
    } else {
      setFormData({ 
        id: null, 
        name: "", 
        code: "", 
        manager: "", 
        employeeCount: 0 
      });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (isEdit) {
      setDepartments(departments.map((dept) => 
        dept.id === formData.id ? formData : dept
      ));
      Swal.fire("Güncellendi!", `Departman: ${formData.name} güncellendi.`, "success");
    } else {
      const newId = departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1;
      setDepartments([...departments, { ...formData, id: newId }]);
      Swal.fire("Eklendi!", `Departman: ${formData.name} eklendi.`, "success");
    }
    handleClose();
  };

  const handleDelete = (department) => {
    Swal.fire({
      title: `"${department.name}" departmanı silinsin mi?`,
      text: "Bu işlemi geri alamazsınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        setDepartments(departments.filter((d) => d.id !== department.id));
        Swal.fire("Silindi!", `"${department.name}" departmanı silindi.`, "success");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Departman Adı", width: 200 },
    { field: "code", headerName: "Kodu", width: 120 },
    { field: "manager", headerName: "Yönetici", width: 180 },
    { 
      field: "employeeCount", 
      headerName: "Çalışan Sayısı", 
      width: 150,
      type: "number" 
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.paper,
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    color: theme.palette.text.primary,
    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.primary,
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumb Navigasyon */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Link color="inherit" href="/dashboard">
          <HomeIcon />
        </Link>
        <Typography color="text.primary">Departman Yönetimi</Typography>
      </Breadcrumbs>

      {/* Başlık ve Buton */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon sx={{ mr: 2, fontSize: 40 }} />
          <Typography variant="h4">Departman Yönetimi</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />} 
          onClick={() => handleOpen()}
        >
          Ekle
        </Button>
      </Box>

      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={departments}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setSelectedDepartments(newSelection)}
          pagination
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {isEdit ? "Departmanı Güncelle" : "Yeni Departman Ekle"}
          </Typography>
          <TextField 
            label="Departman Adı" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
            required
          />
          <TextField 
            label="Departman Kodu" 
            name="code" 
            value={formData.code} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
            required
          />
          <TextField 
            label="Yönetici" 
            name="manager" 
            value={formData.manager} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Çalışan Sayısı" 
            name="employeeCount" 
            type="number"
            value={formData.employeeCount} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClose}
            >
              İptal
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
            >
              {isEdit ? "Güncelle" : "Kaydet"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}