import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import VisibilityOutlinedIcon    from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon          from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon         from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon          from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon        from '@mui/icons-material/ShieldOutlined';
import { useAppContext } from '../../context/AppContext';

const CSS = `
  @keyframes cardIn {
    from { opacity:0; transform:translateY(24px) scale(.98); }
    to   { opacity:1; transform:translateY(0)    scale(1);   }
  }
  @keyframes shimmerBar {
    0%   { background-position:0%   50%; }
    100% { background-position:300% 50%; }
  }
  @keyframes dotPulse {
    0%,100% { box-shadow:0 0 0 0   rgba(46,139,87,.7); }
    50%      { box-shadow:0 0 0 8px rgba(46,139,87,0);  }
  }
  @keyframes logoGlow {
    0%,100% { box-shadow:0 8px 24px rgba(255,152,0,.35); }
    50%      { box-shadow:0 8px 32px rgba(46,139,87,.5); }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [ready,    setReady]    = useState(false);
  const [eFocus,   setEFocus]   = useState(false);
  const [pFocus,   setPFocus]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    login({ email, password });
    navigate('/', { replace: true });
  };

  /* ── Style des champs — fond blanc uniforme, anti-autofill navigateur ── */
  const fieldSx = (focused, accent, accentLight) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      background: '#ffffff',          /* blanc fixe — jamais teinté */
      fontSize: '14.5px',
      fontFamily: '"Open Sans", sans-serif',
      color: '#34495E',
      transition: 'border-color .2s ease, box-shadow .2s ease',

      /* ── Neutralise le fond bleu autofill du navigateur ── */
      '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #ffffff inset !important',
        WebkitTextFillColor: '#34495E !important',
        caretColor: '#34495E',
        borderRadius: '10px',
      },

      '& input': {
        padding: '13px 12px 13px 4px',
        color: '#34495E',
        caretColor: accent,
        background: 'transparent',
      },
      '& input::placeholder': {
        color: '#b0bec5',
        opacity: 1,
        fontSize: '14px',
      },
      '& fieldset': {
        borderColor: focused ? accent : '#dde2e8',
        borderWidth:  focused ? '2px' : '1.5px',
        transition: 'border-color .2s ease, border-width .2s ease',
      },
      '&:hover:not(.Mui-focused) fieldset': {
        borderColor: '#aab4be',
      },
      '&.Mui-focused': {
        boxShadow: `0 0 0 3px ${accentLight}`,
        background: '#ffffff',
      },
    },
  });

  return (
    <>
      <style>{CSS}</style>

      {/* ══ Fond image plein écran ══ */}
      <Box sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/bg-login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>

        {/* Overlay sombre avec teinte verte */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,35,20,.80) 0%, rgba(12,20,40,.75) 55%, rgba(30,15,5,.78) 100%)',
        }}/>

        {/* Vignette bords */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(0,0,0,.5) 100%)',
        }}/>

        {/* Halos décoratifs derrière la card */}
        <Box sx={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,139,87,.18) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}/>
        <Box sx={{
          position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,152,0,.12) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }}/>

        {/* ══════════════════════════════════════
            CARD — centrée, fond blanc/clair
        ══════════════════════════════════════ */}
        <Box sx={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 460,
          mx: 2,
          borderRadius: '20px',
          background: '#F8F9FA',           /* fond app exact */
          border: '1px solid rgba(255,255,255,.9)',
          boxShadow: '0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(46,139,87,.15)',
          overflow: 'hidden',
          px: { xs: 3, sm: 4.5 },
          py: { xs: 4, sm: 4.5 },
          opacity:   ready ? 1 : 0,
          transform: ready ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.98)',
          transition: 'opacity .65s ease, transform .65s cubic-bezier(.22,1,.36,1)',
        }}>

          {/* Barre top — dégradé vert → orange */}
          <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(90deg, #2E8B57, #4CAF50, #FF9800, #2E8B57)',
            backgroundSize: '300% auto',
            animation: 'shimmerBar 4s linear infinite',
          }}/>

          {/* ── ENTÊTE centré ── */}
          <Box sx={{ textAlign: 'center', mb: 3.5, pt: .5 }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, animation: 'logoGlow 3s ease-in-out infinite' }}>
              <img src="/logo.png" alt="GSFORMA" style={{ width: 100, height: 100, objectFit: 'contain' }} />
            </Box>

            {/* Badge statut */}
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: .75,
              px: 1.5, py: .55, borderRadius: '30px', mb: 2,
              background: 'rgba(46,139,87,.08)',
              border: '1px solid rgba(46,139,87,.25)',
            }}>
              <Box sx={{
                width: 7, height: 7, borderRadius: '50%',
                bgcolor: '#4CAF50',
                animation: 'dotPulse 1.8s ease-in-out infinite',
              }}/>
              <ShieldOutlinedIcon sx={{ fontSize: 12, color: '#2E8B57' }}/>
              <Typography sx={{ fontSize: '11px', color: '#2E8B57', fontWeight: 700, letterSpacing: '.3px' }}>
                GSFORMA — Accès sécurisé
              </Typography>
            </Box>

            {/* Titre */}
            <Typography sx={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: { xs: '24px', sm: '28px' },
              color: '#34495E', lineHeight: 1.2, mb: .6,
            }}>
              Bon retour{' '}
              <Box component="span" sx={{
                background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>!</Box>
            </Typography>

            <Typography sx={{ fontSize: '13.5px', color: '#607D8B', lineHeight: 1.65 }}>
              Connectez-vous à votre espace AFOR pour continuer.
            </Typography>

            {/* Séparateur */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: .75, mt: 2 }}>
              <Box sx={{ width: 32, height: 3, borderRadius: 2, bgcolor: '#2E8B57' }}/>
              <Box sx={{ width: 10, height: 3, borderRadius: 2, bgcolor: '#FF9800' }}/>
              <Box sx={{ width: 5,  height: 3, borderRadius: 2, bgcolor: '#e0e0e0' }}/>
            </Box>
          </Box>

          {/* Alerte erreur */}
          {error && (
            <Alert severity="error" sx={{
              mb: 2.5, borderRadius: '10px', fontSize: '13px',
              bgcolor: 'rgba(244,67,54,.06)',
              border: '1px solid rgba(244,67,54,.25)',
            }}>
              {error}
            </Alert>
          )}

          {/* ── FORMULAIRE ── */}
          <Box component="form" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{
                fontSize: '11.5px', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase', mb: .8,
                color: eFocus ? '#2E8B57' : '#607D8B',
                transition: 'color .2s',
              }}>
                Adresse email
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEFocus(true)}
                onBlur={() => setEFocus(false)}
                placeholder="agent@afor.ci"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: .5 }}>
                      <EmailOutlinedIcon sx={{
                        fontSize: 19,
                        color: eFocus ? '#2E8B57' : '#9eaab4',
                        transition: 'color .2s',
                      }}/>
                    </InputAdornment>
                  ),
                }}
                sx={fieldSx(eFocus, '#2E8B57', 'rgba(46,139,87,.1)')}
              />
            </Box>

            {/* Mot de passe */}
            <Box sx={{ mb: 1.5 }}>
              <Typography sx={{
                fontSize: '11.5px', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase', mb: .8,
                color: pFocus ? '#FF9800' : '#607D8B',
                transition: 'color .2s',
              }}>
                Mot de passe
              </Typography>
              <TextField
                fullWidth
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPFocus(true)}
                onBlur={() => setPFocus(false)}
                placeholder="••••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: .5 }}>
                      <LockOutlinedIcon sx={{
                        fontSize: 19,
                        color: pFocus ? '#FF9800' : '#9eaab4',
                        transition: 'color .2s',
                      }}/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd(v => !v)}
                        edge="end" size="small"
                        sx={{ color: '#9eaab4', '&:hover': { color: '#FF9800', bgcolor: 'rgba(255,152,0,.06)' } }}
                      >
                        {showPwd
                          ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }}/>
                          : <VisibilityOutlinedIcon   sx={{ fontSize: 18 }}/>
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={fieldSx(pFocus, '#FF9800', 'rgba(255,152,0,.08)')}
              />
            </Box>

            {/* Se souvenir / Oublié */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    size="small"
                    sx={{ color: '#c5cdd5', '&.Mui-checked': { color: '#2E8B57' }, p: .75 }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '13px', color: '#607D8B', userSelect: 'none' }}>
                    Se souvenir de moi
                  </Typography>
                }
              />
              <Typography component="span" sx={{
                fontSize: '13px', fontWeight: 600, color: '#FF9800',
                cursor: 'pointer', transition: 'all .2s',
                '&:hover': { color: '#e68900', textDecoration: 'underline' },
              }}>
                Mot de passe oublié ?
              </Typography>
            </Box>

            {/* Bouton */}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon sx={{ fontSize: 17, transition: 'transform .25s' }}/>}
              sx={{
                py: 1.7,
                borderRadius: '11px',
                fontFamily: 'Montserrat', fontWeight: 800, fontSize: '15px',
                textTransform: 'none', letterSpacing: '.3px',
                color: '#fff',
                background: loading
                  ? '#e0e0e0'
                  : 'linear-gradient(130deg, #1d6b3e 0%, #2E8B57 50%, #d97706 100%)',
                backgroundSize: '220% 100%',
                boxShadow: loading
                  ? 'none'
                  : '0 6px 24px rgba(46,139,87,.35), 0 2px 8px rgba(0,0,0,.15)',
                transition: 'all .3s cubic-bezier(.22,1,.36,1)',
                position: 'relative', overflow: 'hidden',
                '&:hover:not(:disabled)': {
                  backgroundPosition: '100% 0',
                  boxShadow: '0 10px 30px rgba(255,152,0,.3), 0 2px 8px rgba(0,0,0,.15)',
                  transform: 'translateY(-2px)',
                  '& .MuiButton-endIcon': { transform: 'translateX(5px)' },
                },
                '&:active:not(:disabled)': { transform: 'translateY(0)' },
                '&::after': {
                  content: '""', position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform .5s ease',
                },
                '&:hover:not(:disabled)::after': { transform: 'translateX(100%)' },
                '& .MuiButton-endIcon': { transition: 'transform .25s' },
              }}
            >
              {loading
                ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CircularProgress size={16} sx={{ color: '#607D8B' }}/>
                    <span style={{ color: '#607D8B' }}>Connexion en cours…</span>
                  </Box>
                : 'Se connecter'
              }
            </Button>

            {/* Support */}
            <Box sx={{
              mt: 2.5, p: 1.75,
              borderRadius: '10px', textAlign: 'center',
              background: 'rgba(46,139,87,.04)',
              border: '1px solid rgba(46,139,87,.12)',
            }}>
              <Typography sx={{ fontSize: '12px', color: '#78909C', lineHeight: 1.7 }}>
                Identifiants fournis par votre administrateur AFOR. Besoin d'aide ?{' '}
                <Box component="span" sx={{
                  color: '#FF9800', fontWeight: 600, cursor: 'pointer',
                  '&:hover': { color: '#e68900', textDecoration: 'underline' },
                  transition: 'color .2s',
                }}>
                  support@afor.ci
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* Footer */}
          <Typography sx={{ textAlign: 'center', fontSize: '11px', color: '#9eaab4', mt: 3 }}>
            © 2026 AFOR Côte d'Ivoire — GSFORMA v1.0.0
          </Typography>
        </Box>
      </Box>
    </>
  );
}
