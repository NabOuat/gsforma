import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
  Avatar,
  Button,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAppContext } from '../../context/AppContext';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  {
    section: 'Principal',
    items: [
      { label: 'Accueil', icon: <HomeOutlinedIcon />, path: '/' },
    ],
  },
  {
    section: 'Modules',
    items: [
      { label: 'Formation', icon: <SchoolOutlinedIcon />, path: '/formation' },
      { label: 'Sensibilisation', icon: <CampaignOutlinedIcon />, path: '/sensibilisation' },
      { label: 'Édition', icon: <EditNoteOutlinedIcon />, path: '/edition' },
    ],
  },
  {
    section: 'Système',
    items: [
      { label: 'Paramètres', icon: <SettingsOutlinedIcon />, path: '/parametres' },
      { label: 'Mise à jour', icon: <SystemUpdateAltOutlinedIcon />, path: '/mise-a-jour' },
      { label: 'Maintenance', icon: <BuildOutlinedIcon />, path: '/maintenance' },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, setPageTitle, user, logout } = useAppContext();

  const handleNav = (item) => {
    navigate(item.path);
    setPageTitle(item.label);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #1a3d28 0%, #1a2e3d 60%, #2d1a0e 100%)',
        color: '#fff',
      }}
    >

      {/* Profil utilisateur */}
      <Box
        sx={{
          mx: 1.5,
          my: 1.5,
          p: 1.5,
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #1d6b3e, #2E8B57)',
            fontSize: '14px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {user?.avatar || 'A'}
        </Avatar>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.nom || 'Administrateur'}
          </Typography>
          <Typography sx={{ fontSize: '10px', color: '#4CAF50', fontWeight: 600 }}>
            {user?.role || 'Admin'}
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 0.5 }}>
        {NAV_ITEMS.map((section) => (
          <Box key={section.section} sx={{ mb: 0.5 }}>
            <Typography
              sx={{
                px: 2.5,
                pt: 1.5,
                pb: 0.5,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
              }}
            >
              {section.section}
            </Typography>
            <List dense disablePadding>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.label} disablePadding>
                    <Tooltip title={item.label} placement="right" disableHoverListener={sidebarOpen}>
                      <ListItemButton
                        onClick={() => handleNav(item)}
                        selected={isActive}
                        sx={{
                          mx: 1,
                          borderRadius: '8px',
                          mb: 0.25,
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                          backgroundColor: isActive
                            ? 'rgba(46,139,87,0.22) !important'
                            : 'transparent',
                          borderLeft: isActive
                            ? '3px solid #4CAF50'
                            : '3px solid transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.08) !important',
                            color: '#fff',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 36,
                            color: isActive ? '#4CAF50' : 'rgba(255,255,255,0.5)',
                            transition: 'color 0.2s',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '13.5px',
                            fontWeight: isActive ? 700 : 400,
                          }}
                        />
                        {isActive && (
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #2E8B57, #4CAF50)',
                              flexShrink: 0,
                              boxShadow: '0 0 6px #4CAF50',
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
            <Divider sx={{ mx: 2, mt: 0.75, borderColor: 'rgba(255,255,255,0.06)' }} />
          </Box>
        ))}
      </Box>

      {/* Bouton Déconnexion */}
      <Box sx={{ px: 1.5, pb: 1.5 }}>
        <Button
          fullWidth
          onClick={handleLogout}
          startIcon={<LogoutOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={{
            justifyContent: 'flex-start',
            color: 'rgba(255,255,255,0.6)',
            borderRadius: '10px',
            py: 1.25,
            px: 2,
            fontSize: '13.5px',
            fontWeight: 500,
            textTransform: 'none',
            border: '1px solid rgba(244,67,54,0.2)',
            background: 'rgba(244,67,54,0.05)',
            transition: 'all 0.25s ease',
            '&:hover': {
              background: 'rgba(244,67,54,0.15)',
              color: '#ff6b6b',
              borderColor: 'rgba(244,67,54,0.5)',
              transform: 'translateX(2px)',
              '& .MuiSvgIcon-root': { color: '#ff6b6b' },
            },
            '& .MuiSvgIcon-root': { color: 'rgba(244,67,54,0.7)', transition: 'color 0.25s' },
          }}
        >
          Déconnexion
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4CAF50', boxShadow: '0 0 6px #4CAF50' }} />
        <Typography sx={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 AFOR — v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
