/**
 * AppRoutes.jsx
 * ─────────────────────────────────────────────────────────────
 * Fichier principal des routes.
 * Les routes métier sont importées depuis routes/inza/inzaRoutes.jsx
 * (fichier géré par INZA).
 *
 * Pour ajouter un nouveau module :
 *   → Ajouter l'entrée dans inzaRoutes.jsx uniquement.
 * ─────────────────────────────────────────────────────────────
 */

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Layout from '../components/layout/Layout';
import inzaRoutes from './inza/inzaRoutes';

// Fallback de chargement lazy
const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
    }}
  >
    <CircularProgress size={40} sx={{ color: '#2E8B57' }} />
  </Box>
);

const AppRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Routes inza enregistrées dynamiquement */}
          {inzaRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Fallback : page introuvable → redirection accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
