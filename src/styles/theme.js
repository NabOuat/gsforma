import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:    { main: '#2E8B57', light: '#4CAF50', dark: '#1a5c38', contrastText: '#ffffff' },
    secondary:  { main: '#34495E', light: '#4a6278', dark: '#1f2f3d', contrastText: '#ffffff' },
    warning:    { main: '#FF9800', light: '#FFB74D', dark: '#e65100' },
    error:      { main: '#F44336' },
    success:    { main: '#4CAF50' },
    background: { default: '#F8F9FA', paper: '#ffffff' },
    text:       { primary: '#34495E', secondary: '#607D8B', disabled: '#B0BEC5' },
    divider:    'rgba(0,0,0,0.08)',
  },

  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica Neue", sans-serif',
    h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: '24px' },
    h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: '22px' },
    h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: '20px' },
    h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: '18px' },
    h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: '16px' },
    h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: '14px' },
    body1:   { fontSize: '15px', lineHeight: 1.6 },
    body2:   { fontSize: '14px', lineHeight: 1.5 },
    caption: { fontSize: '12px', color: '#607D8B', lineHeight: 1.4 },
    button:  { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, textTransform: 'none', fontSize: '14px' },
    overline: { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: '#607D8B' },
  },

  shape: { borderRadius: 10 },

  shadows: [
    'none',
    '0px 1px 4px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.08)',
    '0px 4px 16px rgba(0,0,0,0.10)',
    '0px 6px 24px rgba(0,0,0,0.12)',
    ...Array(20).fill('0px 8px 32px rgba(0,0,0,0.14)'),
  ],

  components: {
    /* ── Boutons ── */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all .2s ease',
          '&:hover': { boxShadow: '0px 4px 12px rgba(46,139,87,0.25)', transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2E8B57 0%, #4CAF50 100%)',
          '&:hover': { background: 'linear-gradient(135deg, #1a5c38 0%, #2E8B57 100%)' },
        },
        containedWarning: {
          background: '#FF9800',
          color: '#fff',
          '&:hover': { background: '#e65100', boxShadow: '0px 4px 12px rgba(255,152,0,0.35)' },
        },
        outlinedPrimary: {
          borderColor: '#2E8B57',
          color: '#2E8B57',
          '&:hover': { background: 'rgba(46,139,87,0.06)', borderColor: '#1a5c38' },
        },
        sizeLarge: { padding: '10px 28px', fontSize: '15px' },
        sizeSmall: { padding: '5px 14px', fontSize: '13px' },
      },
    },

    /* ── Cartes ── */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 12px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'box-shadow .2s',
          '&:hover': { boxShadow: '0px 4px 20px rgba(0,0,0,0.10)' },
        },
      },
    },

    /* ── Champs TextField ── */
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: '#fff',
          fontSize: '14px',
          color: '#34495E',
          '& fieldset': { borderColor: '#dde2e8', borderWidth: '1.5px' },
          '&:hover fieldset': { borderColor: '#aab4be' },
          '&.Mui-focused fieldset': { borderColor: '#2E8B57', borderWidth: '2px' },
          '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(46,139,87,0.12)' },
        },
        input: {
          padding: '11px 14px',
          '&::placeholder': { color: '#B0BEC5', opacity: 1 },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
            WebkitTextFillColor: '#34495E',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#607D8B',
          '&.Mui-focused': { color: '#2E8B57' },
        },
      },
    },

    /* ── Chips ── */
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: '12px' },
        colorPrimary:   { background: 'rgba(46,139,87,0.1)',   color: '#2E8B57',  border: '1px solid rgba(46,139,87,0.25)' },
        colorWarning:   { background: 'rgba(255,152,0,0.1)',   color: '#e65100',  border: '1px solid rgba(255,152,0,0.25)' },
        colorError:     { background: 'rgba(244,67,54,0.1)',   color: '#c62828',  border: '1px solid rgba(244,67,54,0.25)' },
        colorSuccess:   { background: 'rgba(76,175,80,0.1)',   color: '#2e7d32',  border: '1px solid rgba(76,175,80,0.25)' },
        colorSecondary: { background: 'rgba(52,73,94,0.08)',   color: '#34495E',  border: '1px solid rgba(52,73,94,0.2)'  },
      },
    },

    /* ── TableHead ── */
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: '#F8F9FA',
            color: '#34495E',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            borderBottom: '2px solid rgba(46,139,87,0.2)',
            padding: '12px 16px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#34495E',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '12px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { background: 'rgba(46,139,87,0.03)' },
          '&:last-child td': { borderBottom: 'none' },
        },
      },
    },

    /* ── AppBar ── */
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0px 1px 8px rgba(0,0,0,0.12)' },
      },
    },

    /* ── Drawer items ── */
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          transition: 'all .2s',
          '&.Mui-selected': {
            backgroundColor: 'rgba(46,139,87,0.12)',
            color: '#2E8B57',
            '& .MuiListItemIcon-root': { color: '#2E8B57' },
            '&:hover': { backgroundColor: 'rgba(46,139,87,0.18)' },
          },
          '&:hover': { backgroundColor: 'rgba(46,139,87,0.06)' },
        },
      },
    },

    /* ── Tabs ── */
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          textTransform: 'none',
          color: '#607D8B',
          '&.Mui-selected': { color: '#2E8B57' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: '#2E8B57', height: 3, borderRadius: 2 },
      },
    },

    /* ── Pagination ── */
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': { background: '#2E8B57', color: '#fff', '&:hover': { background: '#1a5c38' } },
        },
      },
    },

    /* ── Paper ── */
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

export default theme;
