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
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PageTitle from '../../components/common/PageTitle';

const SYSTEM_STATUS = [
  { label: 'Base de données', value: 92, color: '#4CAF50', status: 'Optimal' },
  { label: 'Stockage', value: 67, color: '#FF9800', status: 'Normal' },
  { label: 'Mémoire (RAM)', value: 45, color: '#4CAF50', status: 'Optimal' },
  { label: 'CPU', value: 28, color: '#4CAF50', status: 'Optimal' },
];

const TASKS = [
  { id: 1, label: 'Nettoyage des fichiers temporaires', icon: <DeleteSweepOutlinedIcon />, desc: 'Supprime les fichiers cache et temporaires', lastRun: 'Il y a 3 jours', type: 'clean' },
  { id: 2, label: 'Sauvegarde de la base de données', icon: <BackupOutlinedIcon />, desc: 'Sauvegarde complète vers le cloud', lastRun: 'Hier à 03h00', type: 'backup' },
  { id: 3, label: 'Optimisation des tables', icon: <StorageOutlinedIcon />, desc: 'Optimise les tables de la base de données', lastRun: 'Il y a 7 jours', type: 'optimize' },
  { id: 4, label: 'Test de performance', icon: <SpeedOutlinedIcon />, desc: 'Analyse les performances du système', lastRun: 'Il y a 2 jours', type: 'perf' },
];

const LOGS = [
  { msg: 'Sauvegarde automatique effectuée avec succès', time: '03:00', level: 'success' },
  { msg: 'Nettoyage cache : 124 Mo libérés', time: '02:30', level: 'info' },
  { msg: 'Connexion base de données : 1500ms (élevé)', time: '01:15', level: 'warning' },
  { msg: 'Optimisation tables terminée', time: '00:45', level: 'success' },
];

const Maintenance = () => {
  const [running, setRunning] = useState(null);

  const handleRun = (id) => {
    setRunning(id);
    setTimeout(() => setRunning(null), 2500);
  };

  return (
    <Box>
      <PageTitle
        title="Maintenance"
        subtitle="Supervision et maintenance du système GSFORMA"
        breadcrumbs={[{ label: 'Maintenance', path: '/maintenance' }]}
      >
        <Tooltip title="Actualiser">
          <IconButton color="primary" sx={{ border: '1px solid', borderColor: 'primary.main' }}>
            <RefreshOutlinedIcon />
          </IconButton>
        </Tooltip>
      </PageTitle>

      <Alert
        severity="info"
        sx={{ mb: 3, fontSize: '13px' }}
        action={<Button size="small" color="inherit">Planifier</Button>}
      >
        Prochaine maintenance planifiée : <strong>Dimanche 29 Mars 2026 à 02h00</strong>
      </Alert>

      <Grid container spacing={2.5}>
        {/* Santé système */}
        <Grid item xs={12} md={5}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <BuildOutlinedIcon sx={{ color: '#34495E' }} />
                <Typography variant="h5" color="secondary.main">Santé du système</Typography>
                <Chip label="En ligne" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(76,175,80,0.1)', color: '#4CAF50', fontWeight: 700 }} />
              </Box>

              {SYSTEM_STATUS.map((s) => (
                <Box key={s.label} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {s.value >= 80
                        ? <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#4CAF50' }} />
                        : <WarningAmberOutlinedIcon sx={{ fontSize: 14, color: '#FF9800' }} />
                      }
                      <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'secondary.main' }}>{s.label}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={s.status} size="small" sx={{ fontSize: '10px', bgcolor: s.color + '15', color: s.color, fontWeight: 600 }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 700, color: s.color }}>{s.value}%</Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={s.value}
                    sx={{
                      height: 7,
                      borderRadius: 4,
                      bgcolor: s.color + '20',
                      '& .MuiLinearProgress-bar': { bgcolor: s.color, borderRadius: 4 },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Logs */}
          <Card elevation={0} sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" color="secondary.main" sx={{ mb: 2 }}>Logs du jour</Typography>
              <List dense disablePadding>
                {LOGS.map((log, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      {log.level === 'success' && <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#4CAF50' }} />}
                      {log.level === 'warning' && <WarningAmberOutlinedIcon sx={{ fontSize: 16, color: '#FF9800' }} />}
                      {log.level === 'info' && <BuildOutlinedIcon sx={{ fontSize: 16, color: '#607D8B' }} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography sx={{ fontSize: '12px', color: 'secondary.main' }}>{log.msg}</Typography>}
                      secondary={<Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{log.time}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Tâches de maintenance */}
        <Grid item xs={12} md={7}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" color="secondary.main" sx={{ mb: 2.5 }}>Tâches de maintenance</Typography>
              <Grid container spacing={2}>
                {TASKS.map((task) => (
                  <Grid item xs={12} sm={6} key={task.id}>
                    <Card
                      elevation={0}
                      sx={{
                        border: '1px solid #f0f0f0',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#2E8B57', boxShadow: '0 4px 16px rgba(46,139,87,0.1)' },
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                          <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(46,139,87,0.08)', color: '#2E8B57' }}>
                            {task.icon}
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'secondary.main', lineHeight: 1.3 }}>
                              {task.label}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '12px' }}>
                          {task.desc}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                          Dernière exécution : {task.lastRun}
                        </Typography>
                        {running === task.id ? (
                          <Box>
                            <Typography sx={{ fontSize: '12px', color: '#4CAF50', fontWeight: 600, mb: 0.5 }}>En cours...</Typography>
                            <LinearProgress sx={{ height: 5, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: '#4CAF50' } }} />
                          </Box>
                        ) : (
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<PlayArrowOutlinedIcon />}
                            onClick={() => handleRun(task.id)}
                          >
                            Exécuter
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Maintenance;
