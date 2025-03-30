import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import {
  AttachMoney,
  ShoppingCart,
  People,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';

// Örnek veriler
const salesData = [
  { name: 'Ocak', value: 4000 },
  { name: 'Şubat', value: 3000 },
  { name: 'Mart', value: 5000 },
  { name: 'Nisan', value: 2780 },
  { name: 'Mayıs', value: 1890 },
  { name: 'Haziran', value: 2390 },
];

const pieData = [
  { name: 'Elektronik', value: 35 },
  { name: 'Giyim', value: 25 },
  { name: 'Gıda', value: 20 },
  { name: 'Ev Eşyaları', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentOrders = [
  { id: 1, product: 'Akıllı Telefon', customer: 'Ahmet Y.', status: 'completed', amount: 12000 },
  { id: 2, product: 'Laptop', customer: 'Mehmet K.', status: 'pending', amount: 18500 },
  { id: 3, product: 'Kulaklık', customer: 'Ayşe D.', status: 'completed', amount: 1500 },
  { id: 4, product: 'Tablet', customer: 'Fatma Ş.', status: 'failed', amount: 7500 },
];

const stats = [
  { icon: <AttachMoney />, title: 'Toplam Satış', value: '₺56,342', trend: 'up', change: '12%' },
  { icon: <ShoppingCart />, title: 'Siparişler', value: '1,254', trend: 'up', change: '5%' },
  { icon: <People />, title: 'Yeni Müşteriler', value: '246', trend: 'down', change: '3%' },
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      {/* İstatistik Kartları */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: stat.trend === 'up' ? 'success.light' : 'error.light' }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography 
                    variant="caption" 
                    color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {stat.trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                    {stat.change}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Satış Grafiği - Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Aylık Satışlar</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Satış Tutarı (₺)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Kategori Dağılımı - Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Kategori Dağılımı</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Son Siparişler */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Son Siparişler</Typography>
            <List>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemIcon>
                      {order.status === 'completed' && <CheckCircle color="success" />}
                      {order.status === 'pending' && <Warning color="warning" />}
                      {order.status === 'failed' && <Error color="error" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${order.product} - ${order.customer}`}
                      secondary={`₺${order.amount.toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Performans Metrikleri */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Performans Metrikleri</Typography>
            
            <Typography variant="subtitle2" gutterBottom>
              Satış Hedefi
            </Typography>
            <LinearProgress variant="determinate" value={75} sx={{ height: 10, mb: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Müşteri Memnuniyeti
            </Typography>
            <LinearProgress variant="determinate" value={90} color="success" sx={{ height: 10, mb: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Stok Durumu
            </Typography>
            <LinearProgress variant="determinate" value={30} color="warning" sx={{ height: 10 }} />
            
            {/* Çizgi Grafik */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Haftalık Trafik
              </Typography>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={salesData.slice(0, 5)}>
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}