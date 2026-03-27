import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PageTitle from '../../components/common/PageTitle';

const SectionTitle = ({ icon, title }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
    <Box sx={{ color: '#2E8B57' }}>{icon}</Box>
    <Typography variant="h5" color="secondary.main">{title}</Typography>
  </Box>
);

const Parametres = () => {
  const [notifs, setNotifs] = useState({ email: true, sms: false, push: true });

  return (
    <Box>
      <PageTitle
        title="Paramètres"
        subtitle="Configuration générale de l'application"
        breadcrumbs={[{ label: 'Paramètres', path: '/parametres' }]}
      />

      <Grid container spacing={2.5}>
        {/* Profil */}
        <Grid item xs={12} md={8}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle icon={<PersonOutlineIcon />} title="Profil utilisateur" />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
                <Avatar sx={{ width: 72, height: 72, bgcolor: '#2E8B57', fontSize: '24px', fontWeight: 700 }}>A</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '16px', color: 'secondary.main' }}>Administrateur AFOR</Typography>
                  <Typography variant="body2" color="text.secondary">admin@afor.ci</Typography>
                  <Chip label="Administrateur" size="small" sx={{ mt: 0.5, bgcolor: 'rgba(46,139,87,0.1)', color: '#2E8B57', fontWeight: 600, fontSize: '11px' }} />
                </Box>
                <Button variant="outlined" size="small" sx={{ ml: 'auto' }}>Changer photo</Button>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: 'Prénom', value: 'Administrateur', col: 6 },
                  { label: 'Nom', value: 'AFOR', col: 6 },
                  { label: 'Email', value: 'admin@afor.ci', col: 6 },
                  { label: 'Téléphone', value: '+225 07 00 00 00', col: 6 },
                  { label: 'Organisation', value: 'AFOR — Côte d\'Ivoire', col: 12 },
                ].map((f) => (
                  <Grid item xs={12} sm={f.col} key={f.label}>
                    <TextField fullWidth label={f.label} defaultValue={f.value} size="small" />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
                <Button variant="contained" color="primary" startIcon={<SaveOutlinedIcon />}>
                  Enregistrer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ mb: 2.5 }}>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle icon={<NotificationsNoneIcon />} title="Notifications" />
              {[
                { key: 'email', label: 'Notifications par email' },
                { key: 'sms', label: 'Notifications par SMS' },
                { key: 'push', label: 'Notifications push' },
              ].map((n) => (
                <Box key={n.key}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifs[n.key]}
                        onChange={(e) => setNotifs(prev => ({ ...prev, [n.key]: e.target.checked }))}
                        color="primary"
                      />
                    }
                    label={<Typography sx={{ fontSize: '14px', color: 'secondary.main' }}>{n.label}</Typography>}
                    sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mb: 0.5 }}
                    labelPlacement="start"
                  />
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle icon={<SecurityOutlinedIcon />} title="Sécurité" />
              <Button fullWidth variant="outlined" color="secondary" sx={{ mb: 1.5 }}>
                Changer le mot de passe
              </Button>
              <Button fullWidth variant="outlined" color="error">
                Déconnexion
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Apparence */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <SectionTitle icon={<PaletteOutlinedIcon />} title="Apparence" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth select label="Langue" defaultValue="fr" size="small" SelectProps={{ native: true }}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth select label="Thème" defaultValue="light" size="small" SelectProps={{ native: true }}>
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Parametres;
