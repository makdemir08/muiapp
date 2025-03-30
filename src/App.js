import React from "react";
import { createTheme } from '@mui/material/styles';
import { 
  Box, 
  Typography 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import PaletteIcon from '@mui/icons-material/Palette';
import LockIcon from '@mui/icons-material/Lock';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskManagement from './components/TaskManagement';
import Settings from './components/Settings';
import DepartmentManagement from './components/Department';
import PermissionManagement from './components/PermissionManagement';
import TestEditor from './components/TestEditor';
import SelectContent from "./components/SelectContent";

const CustomLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <img src="/logo.png" alt="Şirket Logosu" style={{ height: 40 }} />
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
      ŞİRKET ADI
    </Typography>
  </Box>
);

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'tasks',
    title: 'İş Yönetimi',
    icon: <ListAltIcon />,
  },
  {
    segment: 'departments',
    title: 'Departmanlar',
    icon: <GroupsIcon />,
  },
  {
    segment: 'settings',
    title: 'Ayarlar',
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'permissions',
        title: 'Yetkiler',
        icon: <LockIcon fontSize="small" />,
      },
      {
        segment: 'editor',
        title: 'Test Editör',
        icon: <LockIcon fontSize="small" />,
      },
      {
        segment: 'system-settings',
        title: 'Sistem Ayarları',
        icon: <SettingsIcon fontSize="small" />,
      },
      {
        segment: 'user-management',
        title: 'Kullanıcı Yönetimi',
        icon: <PeopleIcon fontSize="small" />,
      },
      {
        segment: 'appearance',
        title: 'Görünüm',
        icon: <PaletteIcon fontSize="small" />,
      },
      {
        segment: 'periods',
        title: 'Dönemler',
        icon: <PaletteIcon fontSize="small" />,
      },
      {
        segment: 'units',
        title: 'Birimler',
        icon: <PaletteIcon fontSize="small" />,
      }      
    ],
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

function RouterIntegration() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => navigate(String(path)),
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout logo={<CustomLogo />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/departments" element={<DepartmentManagement />} />
          <Route path="/settings">
            <Route index element={<Settings />} />
            <Route path="permissions" element={<PermissionManagement />} />
            <Route path="editor" element={<TestEditor />} />
            <Route path="system-settings" element={<div>Sistem Ayarları Sayfası</div>} />
            <Route path="user-management" element={<div>Kullanıcı Yönetimi Sayfası</div>} />
            <Route path="appearance" element={<div>Görünüm Ayarları Sayfası</div>} />
            <Route path="periods" element={<div>Dönemler</div>} />
            <Route path="units" element={<div>Birimler</div>} />
          </Route>
        </Routes>
        
      </DashboardLayout>
    </AppProvider>
  );
}

export default function App() {
  return (
    <Router>
      <RouterIntegration />
    </Router>
  );
}