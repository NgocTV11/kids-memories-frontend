'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { authService } from '@/services/auth.service';
import { useI18nStore } from '@/store/i18n.store';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { auth: authT } = useI18nStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(authT.forgotPasswordPage.emailRequired);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await authService.forgotPassword(email);
      setSuccess(true);
      
      // Development only - show reset URL
      if (result.resetUrl) {
        setResetUrl(result.resetUrl);
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || authT.forgotPasswordPage.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Email sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {authT.forgotPasswordPage.successTitle}
            </Typography>
            <Typography color="text.secondary">
              {authT.forgotPasswordPage.successMessage.replace('{email}', email)}
            </Typography>
          </Box>

          {resetUrl && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>{authT.forgotPasswordPage.devMode}</strong>
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                <MuiLink href={resetUrl} target="_blank" rel="noopener">
                  {resetUrl}
                </MuiLink>
              </Typography>
            </Alert>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/login')}
          >
            {authT.forgotPasswordPage.backToLogin}
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Email sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {authT.forgotPasswordPage.title}
          </Typography>
          <Typography color="text.secondary">
            {authT.forgotPasswordPage.subtitle}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={authT.forgotPasswordPage.emailLabel}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            sx={{ mb: 3 }}
            autoFocus
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : authT.forgotPasswordPage.submitButton}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/auth/login" passHref legacyBehavior>
              <MuiLink sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowBack fontSize="small" />
                {authT.forgotPasswordPage.backToLogin}
              </MuiLink>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
