import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  Rating,
  Typography,
  useTheme,
  Grid,
  Chip,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const labels = {
  0.5: "Çok Düşük",
  1: "Düşük",
  1.5: "Orta -",
  2: "Orta",
  2.5: "Orta +",
  3: "Yüksek -",
  3.5: "Yüksek",
  4: "Çok Yüksek -",
  4.5: "Çok Yüksek",
  5: "Acil",
};

const initialTasks = [
  { id: 1, title: "Yeni müşteri toplantısı", assignedTo: "Ahmet", priority: 3, status: "Bekliyor", description: "", type: "Genel" },
  { id: 2, title: "Teklif hazırlanması", assignedTo: "Mehmet", priority: 4, status: "Devam Ediyor", description: "", type: "Genel" },
  { id: 3, title: "Sözleşme imzalama", assignedTo: "Ayşe", priority: 2, status: "Tamamlandı", description: "", type: "Önemli" },
  { id: 4, title: "Müşteri geri dönüşü", assignedTo: "Fatma", priority: 1, status: "Bekliyor", description: "", type: "Önemli" },
  { id: 5, title: "Rapor sunumu", assignedTo: "Ali", priority: 5, status: "Devam Ediyor", description: "", type: "Acil" },
  { id: 6, title: "Sistem güncellemesi", assignedTo: "Veli", priority: 3.5, status: "Bekliyor", description: "", type: "Acil" },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const [formData, setFormData] = useState({ 
    id: null, 
    title: "", 
    assignedTo: "", 
    priority: 2.5, 
    status: "",
    description: "",
    type: "Genel"
  });
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Filtrelenmiş görev listeleri
  const generalTasks = tasks.filter(task => task.type === "Genel");
  const importantTasks = tasks.filter(task => task.type === "Önemli");
  const urgentTasks = tasks.filter(task => task.type === "Acil");

  const handleOpen = (task = null) => {
    if (task) {
      setFormData(task);
      setIsEdit(true);
    } else {
      setFormData({ 
        id: null, 
        title: "", 
        assignedTo: "", 
        priority: 2.5, 
        status: "",
        description: "",
        type: "Genel"
      });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePriorityChange = (event, newValue) => setFormData({ ...formData, priority: newValue });

  const handleSave = () => {
    if (isEdit) {
      setTasks(tasks.map((task) => (task.id === formData.id ? formData : task)));
      Swal.fire("Güncellendi!", `İş: ${formData.title} güncellendi.`, "success");
    } else {
      const newId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
      setTasks([...tasks, { ...formData, id: newId }]);
      Swal.fire("Eklendi!", `İş: ${formData.title} eklendi.`, "success");
    }
    handleClose();
  };

  const handleDelete = (task) => {
    Swal.fire({
      title: `"${task.title}" silinsin mi?`,
      text: "Bu işlemi geri alamazsınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((t) => t.id !== task.id));
        Swal.fire("Silindi!", `"${task.title}" başarıyla silindi.`, "success");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "İş Adı", width: 300 },
    { field: "assignedTo", headerName: "Atanan Kişi", width: 150 },
    { field: "status", headerName: "Durum", width: 150,
      renderCell: (params) => {
        if (params.value === "Tamamlandı") {
          return (
            <Chip 
              label={params.value} 
              color="success"
              size="small"
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                minWidth: 100
              }}
            />
          );
        } else if (params.value === "Devam Ediyor") {
          return (
            <Chip 
              label={params.value} 
              color="warning"
              size="small"
              sx={{ 
                fontWeight: 'bold',
                minWidth: 100
              }}
            />
          );
        } else {
          return (
            <Chip 
              label={params.value || "Bekliyor"} 
              color="default"
              size="small"
              sx={{ 
                fontWeight: 'bold',
                minWidth: 100
              }}
            />
          );
        }
      },
     },
    {
      field: "priority",
      headerName: "Aciliyet",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating value={params.value} precision={0.5} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
          <Box sx={{ ml: 1 }}>{labels[params.value]}</Box>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)} sx={{ mr: 1 }}>
            <HistoryIcon />
          </IconButton>
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
        <Typography color="text.primary">İş Listesi</Typography>
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
          <Typography variant="h4">İş Listesi</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />} 
          onClick={() => handleOpen()}
        >
          Ekle
        </Button>
      </Box>

      {/* Accordion ile DataGrid'ler */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            Genel Görevler
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            {generalTasks.length} görev
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={generalTasks}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              checkboxSelection
              pagination
              slots={{ toolbar: GridToolbar }}
              key="general-grid"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            Önemli Görevler
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            {importantTasks.length} görev
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={importantTasks}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              checkboxSelection
              pagination
              slots={{ toolbar: GridToolbar }}
              key="important-grid"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            Acil Görevler
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            {urgentTasks.length} görev
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={urgentTasks}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              checkboxSelection
              pagination
              slots={{ toolbar: GridToolbar }}
              key="urgent-grid"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* JIRA TARZI MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          maxHeight: "90vh",
          bgcolor: theme.palette.background.paper,
          boxShadow: 24,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Başlık Bölümü */}
          <Box sx={{
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === 'dark' ? '#1D2125' : '#F4F5F7',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {formData.title || "Yeni İş"}
              </Typography>
              <Chip 
                label={formData.status || "Bekliyor"} 
                color={
                  formData.status === "Tamamlandı" ? "success" : 
                  formData.status === "Devam Ediyor" ? "warning" : "default"
                }
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ID: {formData.id || "Yeni"}
            </Typography>
          </Box>

          {/* Ana İçerik */}
          <Box sx={{ 
            display: 'flex', 
            flexGrow: 1, 
            overflow: 'hidden' 
          }}>
            <Box sx={{ 
              flex: 1, 
              p: 3, 
              overflowY: 'auto' 
            }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Açıklama
                  </Typography>
                  <TextField
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="İş detaylarını buraya yazın..."
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />

                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Yorumlar
                  </Typography>
                  <Box sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 2,
                    mb: 2
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Henüz yorum yok...
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Yorum ekle..."
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? '#24292E' : '#F4F5F7',
                    borderRadius: 1,
                    p: 2,
                    mb: 2
                  }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      Detaylar
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        İş Adı
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Atanan Kişi
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleFormChange}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Durum
                      </Typography>
                      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                        <Select
                          name="status"
                          value={formData.status}
                          onChange={handleFormChange}
                        >
                          <MenuItem value="Bekliyor">Bekliyor</MenuItem>
                          <MenuItem value="Devam Ediyor">Devam Ediyor</MenuItem>
                          <MenuItem value="Tamamlandı">Tamamlandı</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Görev Türü
                      </Typography>
                      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                        <Select
                          name="type"
                          value={formData.type}
                          onChange={handleFormChange}
                        >
                          <MenuItem value="Genel">Genel</MenuItem>
                          <MenuItem value="Önemli">Önemli</MenuItem>
                          <MenuItem value="Acil">Acil</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Aciliyet
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Rating 
                          name="priority"
                          value={formData.priority} 
                          precision={0.5} 
                          onChange={handlePriorityChange} 
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {labels[formData.priority]}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Footer Bölümü */}
          <Box sx={{ 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.mode === 'dark' ? '#1D2125' : '#F4F5F7',
          }}>
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
              sx={{ ml: 2 }}
            >
              {isEdit ? "Güncelle" : "Oluştur"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}