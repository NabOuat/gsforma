import React, { useEffect } from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppContext } from '../../context/AppContext';

const PageTitle = ({ title, subtitle, breadcrumbs = [], children }) => {
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mb: 0.5, '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' } }}
            >
              <Link href="/" underline="hover" color="text.secondary" sx={{ fontSize: '12px' }}>
                Accueil
              </Link>
              {breadcrumbs.map((bc, i) =>
                i < breadcrumbs.length - 1 ? (
                  <Link key={i} href={bc.path} underline="hover" color="text.secondary" sx={{ fontSize: '12px' }}>
                    {bc.label}
                  </Link>
                ) : (
                  <Typography key={i} sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 600 }}>
                    {bc.label}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          )}
          <Typography
            variant="h4"
            sx={{ color: 'secondary.main', fontFamily: 'Montserrat', fontWeight: 700 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {children && <Box sx={{ display: 'flex', gap: 1 }}>{children}</Box>}
      </Box>
      <Box
        sx={{
          mt: 1.5,
          height: '3px',
          width: 60,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #2E8B57, #4CAF50)',
        }}
      />
    </Box>
  );
};

export default PageTitle;
