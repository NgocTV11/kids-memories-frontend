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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Vui lòng nhập email');
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
      setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
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
              Kiểm tra email của bạn
            </Typography>
            <Typography color="text.secondary">
              Nếu email <strong>{email}</strong> tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu trong vài phút.
            </Typography>
          </Box>

          {resetUrl && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Development Mode:</strong>
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
            Quay lại đăng nhập
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
            Quên mật khẩu?
          </Typography>
          <Typography color="text.secondary">
            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
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
            label="Email"
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
            {loading ? <CircularProgress size={24} /> : 'Gửi hướng dẫn'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/auth/login" passHref legacyBehavior>
              <MuiLink sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowBack fontSize="small" />
                Quay lại đăng nhập
              </MuiLink>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
