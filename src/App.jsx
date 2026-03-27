import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { AppProvider, useAppContext } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import Login from './pages/Login';
import './styles/globalStyles.css';

// Guard : redirige vers /login si non authentifié
const PrivateRoutes = () => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <AppRoutes /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<PublicRoute />} />
            <Route path="/*" element={<PrivateRoutes />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

// Redirige vers / si déjà connecté
const PublicRoute = () => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
};

export default App;
