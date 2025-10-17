'use client';

import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';
import { useI18nStore } from '@/store/i18n.store';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function Footer() {
  const { t: common } = useI18nStore();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          {/* Main footer content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 2,
            }}
          >
            {/* Brand section */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {common.appName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {common.footer.tagline}
              </Typography>
            </Box>

            {/* Links section */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: 'center' }}
            >
              <Link
                href="/privacy"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                {common.footer.privacyPolicy}
              </Link>
              <Link
                href="/terms"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                {common.footer.termsOfService}
              </Link>
              <Link
                href="/contact"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                {common.footer.contact}
              </Link>
            </Stack>
          </Box>

          <Divider />

          {/* Copyright section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {common.footer.copyright.replace('2025', currentYear.toString())}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5 }}
            >
              {common.footer.madeWith}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
