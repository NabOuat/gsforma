import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Chip,
  LinearProgress, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, Stack,
  FormControl, InputLabel, Select, MenuItem, IconButton,
} from '@mui/material';
import AddCircleOutlineIcon   from '@mui/icons-material/AddCircleOutline';
import CampaignOutlinedIcon   from '@mui/icons-material/CampaignOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupsOutlinedIcon     from '@mui/icons-material/GroupsOutlined';
import SearchIcon              from '@mui/icons-material/Search';
import CloseIcon               from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageTitle from '../../components/common/PageTitle';

const STATUS_COLOR = { 'En cours': 'warning', 'Terminé': 'success', 'Planifié': 'secondary' };
const CAT_COLOR    = { Sécurité: '#2E8B57', Environnement: '#34495E', Santé: '#FF9800', Foncier: '#4CAF50' };

const INIT = [
  { id:1, titre:'Sécurité Routière Entreprise',   lieu:'Abidjan — Plateau', date:'27 Mars 2026', cible:120, atteint:95,  statut:'En cours', categorie:'Sécurité'     },
  { id:2, titre:'Gestion des Déchets Industriels', lieu:'San Pedro',         date:'15 Mars 2026', cible:80,  atteint:80,  statut:'Terminé',  categorie:'Environnement' },
  { id:3, titre:'Prévention Incendie',             lieu:'Bouaké',            date:'05 Avr 2026',  cible:60,  atteint:0,   statut:'Planifié', categorie:'Sécurité'     },
  { id:4, titre:'Santé au Travail',                lieu:'Yamoussoukro',      date:'20 Avr 2026',  cible:100, atteint:0,   statut:'Planifié', categorie:'Santé'        },
  { id:5, titre:'Droits Fonciers Ruraux',          lieu:'Daloa',             date:'10 Mars 2026', cible:150, atteint:140, statut:'Terminé',  categorie:'Foncier'      },
  { id:6, titre:'Protection des Cultures',         lieu:'Korhogo',           date:'01 Mai 2026',  cible:90,  atteint:0,   statut:'Planifié', categorie:'Environnement' },
];

const EMPTY = { titre:'', lieu:'', date:'', cible:'', categorie:'Sécurité', statut:'Planifié' };
const validate = (f) => {
  const e = {};
  if (!f.titre.trim()) e.titre = 'Titre requis';
  if (!f.lieu.trim())  e.lieu  = 'Lieu requis';
  if (!f.date.trim())  e.date  = 'Date requise';
  if (!f.cible || isNaN(f.cible)) e.cible = 'Cible valide requise';
  return e;
};

const Sensibilisation = () => {
  const [data,   setData]   = useState(INIT);
  const [search, setSearch] = useState('');
  const [open,   setOpen]   = useState(false);
  const [form,   setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const filtered = data.filter(c =>
    c.titre.toLowerCase().includes(search.toLowerCase()) ||
    c.lieu.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setData(d => [...d, { ...form, id: d.length + 1, atteint: 0, cible: Number(form.cible) }]);
    setOpen(false); setForm(EMPTY); setErrors({});
  };

  return (
    <Box>
      <PageTitle
        title="Sensibilisation"
        subtitle="Campagnes de sensibilisation et de prévention AFOR"
        breadcrumbs={[{ label: 'Sensibilisation', path: '/sensibilisation' }]}
      >
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon/>} onClick={() => setOpen(true)}>
          Nouvelle campagne
        </Button>
      </PageTitle>

      {/* Barre recherche */}
      <Box sx={{ mb: 3 }}>
        <TextField
          size="small" placeholder="Rechercher par titre ou lieu…"
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" color="action"/></InputAdornment> }}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Cards */}
      <Grid container spacing={2.5}>
        {filtered.map((c) => {
          const pct = c.cible > 0 ? Math.round((c.atteint / c.cible) * 100) : 0;
          const catColor = CAT_COLOR[c.categorie] || '#34495E';
          return (
            <Grid item xs={12} sm={6} lg={4} key={c.id}>
              <Card elevation={0} sx={{ height: '100%', transition: 'all .2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={c.categorie} size="small" sx={{ bgcolor: `${catColor}14`, color: catColor, fontWeight: 700, fontSize: '11px', border: `1px solid ${catColor}30` }}/>
                      <Chip label={c.statut} size="small" color={STATUS_COLOR[c.statut]}/>
                    </Box>
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(46,139,87,0.08)', color: '#2E8B57' }}>
                      <CampaignOutlinedIcon fontSize="small"/>
                    </Box>
                  </Box>

                  <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2, lineHeight: 1.4 }}>{c.titre}</Typography>

                  <Stack spacing={.75} sx={{ mb: 2.5 }}>
                    {[
                      { icon: <LocationOnOutlinedIcon sx={{ fontSize: 15 }}/>, text: c.lieu },
                      { icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 15 }}/>, text: c.date },
                      { icon: <GroupsOutlinedIcon sx={{ fontSize: 15 }}/>, text: `${c.atteint} / ${c.cible} personnes` },
                    ].map((row, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: .75 }}>
                        <Box sx={{ color: 'text.secondary' }}>{row.icon}</Box>
                        <Typography variant="body2" color="text.secondary">{row.text}</Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: .75 }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary' }}>Progression</Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 700, color: catColor }}>{pct}%</Typography>
                    </Box>
                    <Box sx={{ height: 6, borderRadius: 3, bgcolor: `${catColor}18`, overflow: 'hidden' }}>
                      <Box sx={{ height: '100%', width: `${pct}%`, borderRadius: 3, bgcolor: catColor }}/>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" color="primary" sx={{ flex: 1 }}>Détails</Button>
                    <Button size="small" variant="contained" color="primary" sx={{ flex: 1 }}>Modifier</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Montserrat', fontWeight: 700, color: 'secondary.main' }}>
          Nouvelle campagne
          <IconButton size="small" onClick={() => setOpen(false)}><CloseIcon/></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField fullWidth name="titre" label="Titre de la campagne" value={form.titre} onChange={handleChange}
              error={!!errors.titre} helperText={errors.titre} placeholder="Ex : Sécurité Routière"
              InputProps={{ endAdornment: form.titre && !errors.titre ? <CheckCircleOutlineIcon sx={{ color: '#4CAF50', fontSize: 18 }}/> : null }}
            />
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField fullWidth name="lieu" label="Lieu" value={form.lieu} onChange={handleChange}
                  error={!!errors.lieu} helperText={errors.lieu} placeholder="Ex : Abidjan — Cocody"/>
              </Grid>
              <Grid item xs={5}>
                <TextField fullWidth name="cible" label="Cible (personnes)" type="number" value={form.cible}
                  onChange={handleChange} error={!!errors.cible} helperText={errors.cible} placeholder="Ex : 120"/>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth name="date" label="Date" type="date" value={form.date}
                  onChange={handleChange} error={!!errors.date} helperText={errors.date} InputLabelProps={{ shrink: true }}/>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select name="categorie" value={form.categorie} label="Catégorie" onChange={handleChange}>
                    {Object.keys(CAT_COLOR).map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select name="statut" value={form.statut} label="Statut" onChange={handleChange}>
                {['Planifié','En cours','Terminé'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sensibilisation;
