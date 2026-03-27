import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Grid, Chip,
  TextField, InputAdornment, IconButton, Tooltip, Divider,
  Pagination, Tabs, Tab,
} from '@mui/material';
import SearchIcon             from '@mui/icons-material/Search';
import AddCircleOutlineIcon   from '@mui/icons-material/AddCircleOutline';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DownloadOutlinedIcon   from '@mui/icons-material/DownloadOutlined';
import ShareOutlinedIcon      from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditNoteOutlinedIcon   from '@mui/icons-material/EditNoteOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PageTitle from '../../components/common/PageTitle';

const TYPE_COLOR = { Rapport:'#2E8B57', Bilan:'#34495E', Attestation:'#4CAF50', PV:'#FF9800', Programme:'#607D8B', Fiche:'#9C27B0' };
const TABS = ['Tous', 'Rapport', 'Bilan', 'Attestation', 'PV', 'Programme', 'Fiche'];

const DOCS = [
  { id:1, titre:'Rapport Annuel 2025',              type:'Rapport',      date:'15 Jan 2026', taille:'2.4 Mo', statut:'Publié',    pages:48 },
  { id:2, titre:'Bilan Q1 2026',                    type:'Bilan',        date:'01 Avr 2026', taille:'1.1 Mo', statut:'Brouillon', pages:22 },
  { id:3, titre:'Attestation Formation Sécurité',   type:'Attestation',  date:'27 Mar 2026', taille:'0.3 Mo', statut:'Publié',    pages:1  },
  { id:4, titre:'Procès-Verbal Sensibilisation',    type:'PV',           date:'20 Mar 2026', taille:'0.5 Mo', statut:'Publié',    pages:4  },
  { id:5, titre:'Programme Formation Q2 2026',      type:'Programme',    date:'25 Mar 2026', taille:'0.8 Mo', statut:'Brouillon', pages:12 },
  { id:6, titre:'Fiche de Présence — Mars 2026',    type:'Fiche',        date:'27 Mar 2026', taille:'0.2 Mo', statut:'Publié',    pages:2  },
  { id:7, titre:'Rapport Sensibilisation Foncière', type:'Rapport',      date:'10 Mar 2026', taille:'1.8 Mo', statut:'Publié',    pages:35 },
  { id:8, titre:'Bilan Formation Terrain 2025',     type:'Bilan',        date:'05 Jan 2026', taille:'0.9 Mo', statut:'Publié',    pages:18 },
];

const ROWS_PER_PAGE = 6;

const Edition = () => {
  const [search, setSearch] = useState('');
  const [tab,    setTab]    = useState(0);
  const [page,   setPage]   = useState(1);

  const filtered = useMemo(() => DOCS.filter(d => {
    const matchSearch = d.titre.toLowerCase().includes(search.toLowerCase());
    const matchTab    = tab === 0 || d.type === TABS[tab];
    return matchSearch && matchTab;
  }), [search, tab]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const kpi = [
    { label: 'Total',      value: DOCS.length,                                 color: '#34495E' },
    { label: 'Publiés',    value: DOCS.filter(d => d.statut==='Publié').length,    color: '#4CAF50' },
    { label: 'Brouillons', value: DOCS.filter(d => d.statut==='Brouillon').length, color: '#FF9800' },
    { label: 'Ce mois',    value: 5,                                             color: '#2E8B57' },
  ];

  return (
    <Box>
      <PageTitle
        title="Édition"
        subtitle="Gestion et génération des documents officiels AFOR"
        breadcrumbs={[{ label: 'Édition', path: '/edition' }]}
      >
        <Button variant="outlined" color="primary" startIcon={<EditNoteOutlinedIcon/>}>Modèles</Button>
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon/>}>Nouveau document</Button>
      </PageTitle>

      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpi.map(s => (
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

      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>
          {/* Tabs + Recherche */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Tabs value={tab} onChange={(_, v) => { setTab(v); setPage(1); }} variant="scrollable" scrollButtons="auto">
              {TABS.map((t, i) => <Tab key={t} label={t} value={i}/>)}
            </Tabs>
            <TextField
              size="small" placeholder="Rechercher un document…"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" color="action"/></InputAdornment> }}
              sx={{ width: 240 }}
            />
          </Box>

          {/* Grille documents */}
          <Grid container spacing={2}>
            {paginated.map(doc => {
              const tc = TYPE_COLOR[doc.type] || '#34495E';
              return (
                <Grid item xs={12} sm={6} md={4} key={doc.id}>
                  <Card elevation={0} sx={{
                    border: '1px solid rgba(0,0,0,0.07)',
                    transition: 'all .2s',
                    '&:hover': { borderColor: '#2E8B57', boxShadow: '0 4px 20px rgba(46,139,87,0.12)', transform: 'translateY(-2px)' },
                  }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: '8px', bgcolor: `${tc}14`, color: tc }}>
                          <PictureAsPdfOutlinedIcon fontSize="small"/>
                        </Box>
                        <Chip
                          label={doc.statut} size="small"
                          color={doc.statut === 'Publié' ? 'success' : 'warning'}
                        />
                      </Box>

                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'secondary.main', mb: .5, lineHeight: 1.4 }}>{doc.titre}</Typography>
                      <Chip label={doc.type} size="small" sx={{ bgcolor: `${tc}12`, color: tc, fontSize: '11px', mb: 1.5, border: `1px solid ${tc}28` }}/>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mb: .25 }}>
                            <CalendarMonthOutlinedIcon sx={{ fontSize: 12, color: 'text.secondary' }}/>
                            <Typography variant="caption" color="text.secondary">{doc.date}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">{doc.pages} pages · {doc.taille}</Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1.5 }}/>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: .5 }}>
                        <Tooltip title="Voir"><IconButton size="small" color="primary"><VisibilityOutlinedIcon sx={{ fontSize: 16 }}/></IconButton></Tooltip>
                        <Tooltip title="Télécharger"><IconButton size="small" sx={{ color: '#2E8B57' }}><DownloadOutlinedIcon sx={{ fontSize: 16 }}/></IconButton></Tooltip>
                        <Tooltip title="Partager"><IconButton size="small" sx={{ color: '#607D8B' }}><ShareOutlinedIcon sx={{ fontSize: 16 }}/></IconButton></Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {filtered.length} document{filtered.length !== 1 ? 's' : ''} — page {page} / {totalPages || 1}
            </Typography>
            <Pagination count={totalPages || 1} page={page} onChange={(_, v) => setPage(v)} color="primary" size="small" shape="rounded"/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Edition;
