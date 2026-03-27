import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Badge,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAppContext } from '../../context/AppContext';

const CSS = `
  @keyframes logoGlow {
    0%,100% { box-shadow:0 8px 24px rgba(255,152,0,.35); }
    50%      { box-shadow:0 8px 32px rgba(46,139,87,.5); }
  }
`;

const DRAWER_WIDTH = 260;

const Header = () => {
  const theme = useTheme();
  const { sidebarOpen, toggleSidebar, pageTitle, user } = useAppContext();

  return (
    <>
      <style>{CSS}</style>
      <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1a3d28 0%, #1a2e3d 60%, #2d1a06 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        width: { sm: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
        ml: { sm: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
        transition: theme.transitions.create(['width', 'margin-left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2.5 } }}>
        {/* Burger */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{
            mr: 2,
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', color: '#4CAF50' },
            transition: 'all 0.2s',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo + fil d'ariane */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              overflow: 'hidden',
              bgcolor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(46,139,87,.35)',
              animation: 'logoGlow 3s ease-in-out infinite',
            }}
          >
            <img src="/logo.png" alt="GSFORMA" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#4CAF50' }} />
            <Typography sx={{ fontSize: '13px', color: '#fff', letterSpacing: '0.5px', fontWeight: 600 }}>
              {pageTitle}
            </Typography>
          </Box>
        </Box>

        {/* Actions droite */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Aide">
            <IconButton
              sx={{
                color: 'rgba(255,255,255,0.5)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', color: '#4CAF50' },
                transition: 'all 0.2s',
              }}
            >
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              sx={{
                color: 'rgba(255,255,255,0.5)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', color: '#4CAF50' },
                transition: 'all 0.2s',
              }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#2E8B57',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                    minWidth: 16,
                    height: 16,
                    boxShadow: '0 0 6px rgba(46,139,87,0.5)',
                  },
                }}
              >
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Divider vertical */}
          <Box sx={{ width: 1, height: 24, bgcolor: 'rgba(255,255,255,0.1)', mx: 0.5 }} />

          {/* Avatar utilisateur */}
          <Tooltip title={user?.nom || 'Mon profil'}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                pl: 0.5,
                pr: 1,
                py: 0.5,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #1d6b3e, #2E8B57)',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(46,139,87,0.4)',
                }}
              >
                {user?.avatar || 'A'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                  {user?.nom?.split(' ')[0] || 'Admin'}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#4CAF50', fontWeight: 600 }}>
                  {user?.role || 'Administrateur'}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Header;
