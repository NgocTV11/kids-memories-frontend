'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useI18nStore } from '@/store/i18n.store';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PhotoLibrary,
  Timeline,
  Celebration,
  ChildCare,
  FavoriteRounded,
} from '@mui/icons-material';
import NextLink from 'next/link';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError, isAuthenticated, setUser } = useAuthStore();
  const { auth, t } = useI18nStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Clear any stale auth state on login page
  useEffect(() => {
    // If on login page, ensure we clear any invalid persisted state
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // No token but might have persisted user - clear it
      setUser(null);
    }

    // Clear any credentials from URL (security issue)
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has('email') || currentUrl.searchParams.has('password')) {
      console.warn('⚠️ Credentials detected in URL - cleaning...');
      const redirect = currentUrl.searchParams.get('redirect');
      currentUrl.search = redirect ? `?redirect=${redirect}` : '';
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [setUser]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      errors.password = 'Password là bắt buộc';
    } else if (formData.password.length < 6) {
      errors.password = 'Password tối thiểu 6 ký tự';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      
      // Redirect after successful login
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } catch (error) {
      // Error is handled by store
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, -30px)' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ minHeight: '100vh' }}>
          {/* Left Side - Hero Section */}
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              color: 'white',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box
                sx={{
                  mb: 3,
                  animation: 'bounce 2s ease-in-out infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                }}
              >
                <ChildCare sx={{ fontSize: 120, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} />
              </Box>
              <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                {auth.hero.appTitle}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.95, mb: 4, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {auth.hero.tagline}
              </Typography>
            </Box>

            {/* Feature Cards */}
            <Grid container spacing={2} sx={{ maxWidth: 500 }}>
              <Grid size={{ xs: 6 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <PhotoLibrary sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {auth.hero.albums}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {auth.hero.albumsDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <Timeline sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {auth.hero.timeline}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {auth.hero.timelineDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <Celebration sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {auth.hero.milestones}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {auth.hero.milestonesDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <FavoriteRounded sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {auth.hero.memories}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {auth.hero.memoriesDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, sm: 3, md: 4 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Paper
              elevation={24}
              sx={{
                p: { xs: 2.5, sm: 4, md: 5 },
                width: '100%',
                maxWidth: 450,
                borderRadius: { xs: 3, md: 4 },
                bgcolor: 'background.paper',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                animation: 'slideIn 0.5s ease-out',
                '@keyframes slideIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(30px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              {/* Language Switcher - Top Right inside form */}
              <Box sx={{ position: 'absolute', top: { xs: 12, md: 16 }, right: { xs: 12, md: 16 }, zIndex: 10 }}>
                <LanguageSwitcher />
              </Box>

              {/* Mobile Logo */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                <ChildCare sx={{ fontSize: { xs: 50, sm: 60 }, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="primary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Kids Memories
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ display: { xs: 'none', md: 'block' } }}>
                  {auth.login.title}
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" sx={{ display: { xs: 'block', md: 'none' }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  {auth.login.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {auth.login.subtitle} 👋
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: { xs: 2, md: 3 },
                    borderRadius: 2,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    animation: 'shake 0.5s ease',
                    '@keyframes shake': {
                      '0%, 100%': { transform: 'translateX(0)' },
                      '25%': { transform: 'translateX(-10px)' },
                      '75%': { transform: 'translateX(10px)' },
                    },
                  }}
                  onClose={clearError}
                >
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} method="POST" action="javascript:void(0)" noValidate>
                <TextField
                  fullWidth
                  label={auth.login.emailLabel}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  margin="normal"
                  autoComplete="username"
                  autoFocus={!isMobile}
                  disabled={isLoading}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                      },
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                      WebkitTextFillColor: '#000 !important',
                      caretColor: '#000 !important',
                      borderRadius: '8px !important',
                    },
                    '& input:-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                    },
                    '& input:-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={auth.login.passwordLabel}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  margin="normal"
                  autoComplete="current-password"
                  disabled={isLoading}
                  size={isMobile ? "small" : "medium"}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                      },
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                      WebkitTextFillColor: '#000 !important',
                      caretColor: '#000 !important',
                      borderRadius: '8px !important',
                    },
                    '& input:-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                    },
                    '& input:-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 100px #fff inset !important',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading}
                          size={isMobile ? "small" : "medium"}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={isMobile ? 18 : 20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    mt: { xs: 2, md: 3 },
                    mb: 2,
                    py: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: isMobile ? 'scale(0.98)' : 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    },
                    '&:active': {
                      transform: 'scale(0.97)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  {isLoading ? auth.login.loggingIn : auth.login.loginButton}
                </Button>

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 2 } }}>
                  <Link href="/auth/forgot-password" passHref legacyBehavior>
                    <MuiLink
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontSize: { xs: '0.875rem', sm: '0.875rem' },
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {auth.login.forgotPassword}
                    </MuiLink>
                  </Link>
                </Box>

                <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 3 } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {auth.login.noAccount}{' '}
                    <Link href="/auth/register" passHref legacyBehavior>
                      <MuiLink
                        sx={{
                          fontWeight: 'bold',
                          color: 'primary.main',
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'secondary.main',
                          },
                        }}
                      >
                        {auth.login.signUp}
                      </MuiLink>
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <CircularProgress />
      </Box>
    }>
      <LoginContent />
    </Suspense>
  );
}
