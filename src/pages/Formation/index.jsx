import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Grid, Chip,
  TextField, InputAdornment, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Pagination, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stack,
} from '@mui/material';
import SearchIcon              from '@mui/icons-material/Search';
import AddCircleOutlineIcon    from '@mui/icons-material/AddCircleOutline';
import EditOutlinedIcon        from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon       from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon  from '@mui/icons-material/VisibilityOutlined';
import FilterListIcon           from '@mui/icons-material/FilterList';
import CloseIcon                from '@mui/icons-material/Close';
import CheckCircleOutlineIcon  from '@mui/icons-material/CheckCircleOutline';
import PageTitle from '../../components/common/PageTitle';

const ROWS_OPTIONS = [5, 10, 20];

const FORMATIONS = [
  { id: 1, titre: 'Hygiène & Sécurité au Travail',       participants: 45, date: '27/03/2026', statut: 'En cours', duree: '3 jours', region: 'Abidjan'      },
  { id: 2, titre: 'Premiers Secours (PSC1)',              participants: 30, date: '18/03/2026', statut: 'Planifié', duree: '1 jour',  region: 'Bouaké'       },
  { id: 3, titre: 'Incendie & Évacuation',                participants: 60, date: '10/03/2026', statut: 'Terminé',  duree: '2 jours', region: 'San Pedro'    },
  { id: 4, titre: 'Gestion des Risques Professionnels',  participants: 25, date: '05/03/2026', statut: 'Terminé',  duree: '5 jours', region: 'Yamoussoukro' },
  { id: 5, titre: 'Travaux en Hauteur',                   participants: 18, date: '28/02/2026', statut: 'Terminé',  duree: '2 jours', region: 'Daloa'        },
  { id: 6, titre: 'Manipulation des Produits Chimiques', participants: 35, date: '20/02/2026', statut: 'Terminé',  duree: '3 jours', region: 'Abidjan'      },
  { id: 7, titre: 'Gestes et Postures au Travail',       participants: 50, date: '15/02/2026', statut: 'Terminé',  duree: '1 jour',  region: 'Bouaké'       },
  { id: 8, titre: 'Formation des Formateurs',            participants: 20, date: '10/04/2026', statut: 'Planifié', duree: '5 jours', region: 'Abidjan'      },
];

const STATUS_COLOR = { 'En cours': 'warning', 'Planifié': 'secondary', 'Terminé': 'success' };

const EMPTY_FORM = { titre: '', participants: '', date: '', duree: '', region: '', statut: 'Planifié' };

/* ─── Validation simple ─────────────────────────────────────── */
const validate = (form) => {
  const errs = {};
  if (!form.titre.trim())        errs.titre        = 'Titre requis';
  if (!form.participants || isNaN(form.participants)) errs.participants = 'Nombre valide requis';
  if (!form.date.trim())         errs.date         = 'Date requise';
  if (!form.duree.trim())        errs.duree        = 'Durée requise';
  if (!form.region.trim())       errs.region       = 'Région requise';
  return errs;
};

/* ═══════════════════════════════════════════════════════════════ */
const Formation = () => {
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('Tous');
  const [page,     setPage]     = useState(1);
  const [rowsPP,   setRowsPP]   = useState(5);
  const [open,     setOpen]     = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [errors,   setErrors]   = useState({});
  const [data,     setData]     = useState(FORMATIONS);

  const filtered = useMemo(() => data.filter((r) => {
    const matchSearch = r.titre.toLowerCase().includes(search.toLowerCase()) ||
                        r.region.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Tous' || r.statut === filter;
    return matchSearch && matchFilter;
  }), [data, search, filter]);

  const totalPages = Math.ceil(filtered.length / rowsPP);
  const paginated  = filtered.slice((page - 1) * rowsPP, page * rowsPP);

  const handleOpen  = () => { setForm(EMPTY_FORM); setErrors({}); setOpen(true); };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setData(d => [...d, { ...form, id: d.length + 1, participants: Number(form.participants) }]);
    setOpen(false);
  };

  const kpi = [
    { label: 'Total',     value: data.length,                                    color: '#34495E' },
    { label: 'En cours',  value: data.filter(f => f.statut === 'En cours').length,  color: '#FF9800' },
    { label: 'Planifiées',value: data.filter(f => f.statut === 'Planifié').length,  color: '#607D8B' },
    { label: 'Terminées', value: data.filter(f => f.statut === 'Terminé').length,   color: '#4CAF50' },
  ];

  return (
    <Box>
      <PageTitle
        title="Formation"
        subtitle="Gestion des sessions de formation AFOR"
        breadcrumbs={[{ label: 'Formation', path: '/formation' }]}
      >
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}>
          Nouvelle formation
        </Button>
      </PageTitle>

      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpi.map((s) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Card elevation={0}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '28px', color: s.color }}>{s.value}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#607D8B', textTransform: 'uppercase', letterSpacing: '.5px' }}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tableau */}
      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>

          {/* Barre recherche + filtres */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              size="small" placeholder="Rechercher par titre ou région…"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" color="action"/></InputAdornment> }}
              sx={{ width: 280 }}
            />
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <FilterListIcon sx={{ color: '#607D8B', fontSize: 20 }}/>
              {['Tous','En cours','Planifié','Terminé'].map((f) => (
                <Chip
                  key={f} label={f} size="small"
                  onClick={() => { setFilter(f); setPage(1); }}
                  color={filter === f ? 'primary' : 'default'}
                  variant={filter === f ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer', fontWeight: 600 }}
                />
              ))}
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <InputLabel>Lignes</InputLabel>
                <Select value={rowsPP} label="Lignes" onChange={e => { setRowsPP(e.target.value); setPage(1); }}>
                  {ROWS_OPTIONS.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Table avec sticky header */}
          <TableContainer sx={{ maxHeight: 420, borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {['#','Titre','Région','Participants','Durée','Date','Statut','Actions'].map(h => (
                    <TableCell key={h} sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#607D8B', fontStyle: 'italic' }}>
                      Aucun résultat trouvé
                    </TableCell>
                  </TableRow>
                ) : paginated.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ color: '#607D8B', fontWeight: 600, fontSize: '12px' }}>{row.id}</TableCell>
                    <TableCell sx={{ fontWeight: 500, maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.titre}</TableCell>
                    <TableCell>{row.region}</TableCell>
                    <TableCell align="center">{row.participants}</TableCell>
                    <TableCell>{row.duree}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>
                    <TableCell><Chip label={row.statut} size="small" color={STATUS_COLOR[row.statut]}/></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: .25 }}>
                        <Tooltip title="Voir">
                          <IconButton size="small" color="primary"><VisibilityOutlinedIcon sx={{ fontSize: 16 }}/></IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier">
                          <IconButton size="small" sx={{ color: '#FF9800' }}><EditOutlinedIcon sx={{ fontSize: 16 }}/></IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton size="small" color="error"><DeleteOutlineIcon sx={{ fontSize: 16 }}/></IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} — page {page} / {totalPages || 1}
            </Typography>
            <Pagination count={totalPages || 1} page={page} onChange={(_, v) => setPage(v)} color="primary" size="small" shape="rounded"/>
          </Box>
        </CardContent>
      </Card>

      {/* ── Modal Nouvelle Formation ── */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Montserrat', fontWeight: 700, color: 'secondary.main', pb: 1 }}>
          Nouvelle formation
          <IconButton size="small" onClick={handleClose}><CloseIcon/></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth name="titre" label="Titre de la formation" value={form.titre}
              onChange={handleChange} error={!!errors.titre} helperText={errors.titre}
              placeholder="Ex : Hygiène & Sécurité au Travail"
              InputProps={{ endAdornment: form.titre && !errors.titre ? <CheckCircleOutlineIcon sx={{ color: '#4CAF50', fontSize: 18 }}/> : null }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth name="participants" label="Participants" type="number"
                  value={form.participants} onChange={handleChange}
                  error={!!errors.participants} helperText={errors.participants}
                  placeholder="Ex : 30"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth name="duree" label="Durée" value={form.duree}
                  onChange={handleChange} error={!!errors.duree} helperText={errors.duree}
                  placeholder="Ex : 2 jours"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth name="date" label="Date" type="date" value={form.date}
                  onChange={handleChange} error={!!errors.date} helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth name="region" label="Région" value={form.region}
                  onChange={handleChange} error={!!errors.region} helperText={errors.region}
                  placeholder="Ex : Abidjan"
                />
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
          <Button variant="outlined" color="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Formation;
