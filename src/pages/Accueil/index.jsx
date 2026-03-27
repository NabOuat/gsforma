import React from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Button,
  Chip, Divider,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  ArcElement, Tooltip as CTooltip, Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import SchoolOutlinedIcon     from '@mui/icons-material/SchoolOutlined';
import CampaignOutlinedIcon   from '@mui/icons-material/CampaignOutlined';
import EditNoteOutlinedIcon   from '@mui/icons-material/EditNoteOutlined';
import PeopleAltOutlinedIcon  from '@mui/icons-material/PeopleAltOutlined';
import TrendingUpIcon          from '@mui/icons-material/TrendingUp';
import EventNoteOutlinedIcon  from '@mui/icons-material/EventNoteOutlined';
import PageTitle from '../../components/common/PageTitle';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, CTooltip, Legend);

/* ─── KPI ────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Formations',       value: '24',  icon: <SchoolOutlinedIcon    sx={{ fontSize: 26 }}/>, color: '#2E8B57', bg: 'rgba(46,139,87,0.08)',  trend: '+3 ce mois'  },
  { label: 'Sensibilisations', value: '12',  icon: <CampaignOutlinedIcon  sx={{ fontSize: 26 }}/>, color: '#FF9800', bg: 'rgba(255,152,0,0.08)',  trend: '+1 ce mois'  },
  { label: 'Éditions',         value: '8',   icon: <EditNoteOutlinedIcon  sx={{ fontSize: 26 }}/>, color: '#34495E', bg: 'rgba(52,73,94,0.08)',   trend: '+2 ce mois'  },
  { label: 'Participants',     value: '348', icon: <PeopleAltOutlinedIcon sx={{ fontSize: 26 }}/>, color: '#4CAF50', bg: 'rgba(76,175,80,0.08)',  trend: '+47 ce mois' },
];

/* ─── Activités ─────────────────────────────────────────────── */
const ACTIVITIES = [
  { title: 'Formation Hygiène & Sécurité',      date: '27 Mars 2026', status: 'En cours', sc: 'warning'  },
  { title: 'Sensibilisation Environnementale',  date: '25 Mars 2026', status: 'Terminé',  sc: 'success'  },
  { title: 'Édition Rapport Q1 2026',           date: '20 Mars 2026', status: 'Terminé',  sc: 'success'  },
  { title: 'Formation Premiers Secours',        date: '18 Mars 2026', status: 'Planifié', sc: 'secondary' },
  { title: 'Sensibilisation Sécurité Routière', date: '15 Mars 2026', status: 'Terminé',  sc: 'success'  },
];

const DOT_COLORS = { 'En cours': '#FF9800', 'Terminé': '#4CAF50', 'Planifié': '#607D8B' };

/* ─── Graphique Barres ───────────────────────────────────────── */
const barData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
  datasets: [
    { label: 'Formations',       data: [4,6,5,8,7,9], backgroundColor: 'rgba(46,139,87,0.85)', borderRadius: 6, borderSkipped: false },
    { label: 'Sensibilisations', data: [2,3,4,3,5,6], backgroundColor: 'rgba(255,152,0,0.75)', borderRadius: 6, borderSkipped: false },
  ],
};
const barOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { family: 'Open Sans', size: 12 }, color: '#607D8B', boxWidth: 12, padding: 16 }},
    tooltip: { backgroundColor: '#34495E', titleFont: { family: 'Montserrat', weight: 'bold', size: 13 }, bodyFont: { family: 'Open Sans', size: 12 }, padding: 12, cornerRadius: 8 },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: 'Open Sans', size: 12 }, color: '#607D8B' }, border: { display: false } },
    y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Open Sans', size: 12 }, color: '#607D8B', padding: 8 }, border: { display: false } },
  },
};

/* ─── Graphique Donut ────────────────────────────────────────── */
const donutData = {
  labels: ['Hommes', 'Femmes', 'Jeunes'],
  datasets: [{ data: [185, 103, 60], backgroundColor: ['#2E8B57','#FF9800','#4CAF50'], borderColor: '#fff', borderWidth: 3, hoverOffset: 6 }],
};
const donutOpts = {
  responsive: true, maintainAspectRatio: false, cutout: '68%',
  plugins: {
    legend: { position: 'bottom', labels: { font: { family: 'Open Sans', size: 12 }, color: '#607D8B', boxWidth: 12, padding: 14 }},
    tooltip: {
      backgroundColor: '#34495E', titleFont: { family: 'Montserrat', weight: 'bold', size: 13 }, bodyFont: { family: 'Open Sans', size: 12 }, padding: 12, cornerRadius: 8,
      callbacks: { label: (ctx) => ` ${ctx.label} : ${ctx.parsed}` },
    },
  },
};

/* ═══════════════════════════════════════════════════════════════ */
const Accueil = () => (
  <Box>
    <PageTitle title="Tableau de bord" subtitle="Bienvenue sur GSFORMA — Vue d'ensemble de vos activités AFOR"/>

    {/* ── KPI Cards ── */}
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {STATS.map((s) => (
        <Grid item xs={12} sm={6} md={3} key={s.label}>
          <Card elevation={0}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#607D8B', textTransform: 'uppercase', mb: .5 }}>
                    {s.label}
                  </Typography>
                  <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '32px', color: s.color, lineHeight: 1 }}>
                    {s.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mt: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 13, color: '#4CAF50' }}/>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#4CAF50' }}>{s.trend}</Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: s.bg, color: s.color }}>{s.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* ── Graphiques ── */}
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      <Grid item xs={12} md={8}>
        <Card elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
              <Box>
                <Typography variant="h5" color="secondary.main">Activités par mois</Typography>
                <Typography variant="caption">Formations et sensibilisations — 2026</Typography>
              </Box>
              <Chip label="2026" size="small" color="primary"/>
            </Box>
            <Box sx={{ height: 230 }}><Bar data={barData} options={barOpts}/></Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="secondary.main">Répartition</Typography>
              <Typography variant="caption">Participants par genre</Typography>
            </Box>
            <Box sx={{ height: 195, position: 'relative' }}>
              <Doughnut data={donutData} options={donutOpts}/>
              <Box sx={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '22px', color: '#34495E', lineHeight: 1 }}>348</Typography>
                <Typography sx={{ fontSize: '10px', color: '#607D8B', fontWeight: 600 }}>Total</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* ── Activités + Progression ── */}
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={7}>
        <Card elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" color="secondary.main">Activités récentes</Typography>
              <Button size="small" variant="outlined" color="primary">Voir tout</Button>
            </Box>
            {ACTIVITIES.map((a, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: DOT_COLORS[a.status], flexShrink: 0, boxShadow: `0 0 0 3px ${DOT_COLORS[a.status]}22` }}/>
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'secondary.main', lineHeight: 1.3 }}>{a.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mt: .25 }}>
                        <EventNoteOutlinedIcon sx={{ fontSize: 12, color: 'text.secondary' }}/>
                        <Typography variant="caption" color="text.secondary">{a.date}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip label={a.status} size="small" color={a.sc}/>
                </Box>
                {i < ACTIVITIES.length - 1 && <Divider/>}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card elevation={0} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" color="secondary.main" sx={{ mb: 2.5 }}>Progression par module</Typography>
            {[
              { label: 'Formation',       value: 75, total: 24, color: '#2E8B57' },
              { label: 'Sensibilisation', value: 50, total: 12, color: '#FF9800' },
              { label: 'Édition',         value: 88, total: 8,  color: '#34495E' },
            ].map((item) => (
              <Box key={item.label} sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: .75 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: item.color }}/>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'secondary.main' }}>{item.label}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">{item.total} entrées</Typography>
                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: item.color, minWidth: 34 }}>{item.value}%</Typography>
                  </Box>
                </Box>
                <Box sx={{ height: 7, borderRadius: 4, bgcolor: `${item.color}18`, overflow: 'hidden' }}>
                  <Box sx={{ height: '100%', width: `${item.value}%`, borderRadius: 4, bgcolor: item.color }}/>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }}/>
            <Grid container spacing={1.5}>
              {[
                { label: 'Régions',    value: '19',    color: '#2E8B57' },
                { label: 'Formateurs', value: '38',    color: '#FF9800' },
                { label: 'Certifiés',  value: '2 400', color: '#34495E' },
              ].map((s) => (
                <Grid item xs={4} key={s.label}>
                  <Box sx={{ textAlign: 'center', p: 1.25, borderRadius: 2, bgcolor: `${s.color}08`, border: `1px solid ${s.color}18` }}>
                    <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '17px', color: s.color }}>{s.value}</Typography>
                    <Typography sx={{ fontSize: '11px', color: '#607D8B', fontWeight: 600 }}>{s.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default Accueil;
