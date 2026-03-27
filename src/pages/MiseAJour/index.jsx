import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PageTitle from '../../components/common/PageTitle';

const HISTORIQUE = [
  { version: 'v1.2.3', date: '15 Mar 2026', statut: 'Installée', notes: 'Correction de bugs de performance dans le module Formation.' },
  { version: 'v1.2.2', date: '01 Mar 2026', statut: 'Installée', notes: 'Amélioration de l\'interface Sensibilisation.' },
  { version: 'v1.2.0', date: '10 Fév 2026', statut: 'Installée', notes: 'Ajout du module Édition de documents.' },
  { version: 'v1.1.0', date: '20 Jan 2026', statut: 'Installée', notes: 'Refonte du tableau de bord.' },
];

const MiseAJour = () => {
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpdate = () => {
    setUpdating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUpdating(false);
        setProgress(0);
      }
    }, 400);
  };

  return (
    <Box>
      <PageTitle
        title="Mise à jour"
        subtitle="Gestion des versions et mises à jour du système"
        breadcrumbs={[{ label: 'Mise à jour', path: '/mise-a-jour' }]}
      />

      <Grid container spacing={2.5}>
        {/* Mise à jour disponible */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ border: '2px solid #4CAF50', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: '#4CAF50' }} />
            <CardContent sx={{ p: 3, pt: 3.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(76,175,80,0.1)', color: '#4CAF50' }}>
                  <NewReleasesOutlinedIcon sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h5" color="secondary.main">Nouvelle version</Typography>
                  <Chip label="v1.3.0 disponible" size="small" sx={{ bgcolor: 'rgba(76,175,80,0.1)', color: '#4CAF50', fontWeight: 700, mt: 0.5 }} />
                </Box>
              </Box>

              <Alert severity="success" sx={{ mb: 2, fontSize: '13px' }}>
                Une mise à jour est disponible. Il est recommandé de mettre à jour votre système.
              </Alert>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Nouveautés de la v1.3.0 :</strong>
              </Typography>
              <List dense disablePadding>
                {[
                  'Nouveau module de statistiques avancées',
                  'Export PDF amélioré pour l\'Édition',
                  'Optimisation des performances générales',
                  'Corrections de sécurité critiques',
                ].map((note, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ fontSize: '13px' }}>{note}</Typography>} />
                  </ListItem>
                ))}
              </List>

              {updating && (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Mise à jour en cours...</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#4CAF50' }}>{progress}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: '#4CAF50', borderRadius: 4 } }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<DownloadOutlinedIcon />}
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? 'En cours...' : 'Mettre à jour'}
                </Button>
                <Button variant="outlined" color="secondary" fullWidth disabled={updating}>
                  Plus tard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Version actuelle + Historique */}
        <Grid item xs={12} md={7}>
          {/* Version courante */}
          <Card elevation={0} sx={{ mb: 2.5 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <SystemUpdateAltOutlinedIcon sx={{ color: '#34495E' }} />
                <Typography variant="h5" color="secondary.main">Version installée</Typography>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: 'Version', value: 'v1.2.3' },
                  { label: 'Date d\'installation', value: '15 Mars 2026' },
                  { label: 'Environnement', value: 'Production' },
                  { label: 'Statut', value: 'Stable' },
                ].map((info) => (
                  <Grid item xs={6} key={info.label}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.25 }}>
                      {info.label}
                    </Typography>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'secondary.main' }}>
                      {info.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Historique */}
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ScheduleOutlinedIcon sx={{ color: '#34495E' }} />
                <Typography variant="h5" color="secondary.main">Historique des versions</Typography>
              </Box>
              {HISTORIQUE.map((h, i) => (
                <Box key={h.version}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4CAF50', mt: 0.75, flexShrink: 0 }} />
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '14px', color: 'secondary.main' }}>{h.version}</Typography>
                          <Chip label={h.statut} size="small" sx={{ bgcolor: 'rgba(76,175,80,0.1)', color: '#4CAF50', fontSize: '10px', fontWeight: 600 }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{h.date}</Typography>
                        <Typography sx={{ fontSize: '13px', color: 'text.secondary', mt: 0.5 }}>{h.notes}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {i < HISTORIQUE.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MiseAJour;
