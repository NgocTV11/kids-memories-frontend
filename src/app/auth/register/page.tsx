'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Link,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd as RegisterIcon,
  PersonAdd,
  PhotoLibrary,
  Timeline,
  Celebration,
  ChildCare,
  Security,
  CheckCircle,
} from '@mui/icons-material';
import NextLink from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { auth, t } = useI18nStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    display_name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

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

    if (!formData.display_name) {
      errors.display_name = 'Tên hiển thị là bắt buộc';
    } else if (formData.display_name.length < 2) {
      errors.display_name = 'Tên hiển thị tối thiểu 2 ký tự';
    }

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

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password không khớp';
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
      await register({
        email: formData.email,
        password: formData.password,
        display_name: formData.display_name,
      });
      
      // Redirect after successful registration
      router.push('/');
    } catch (error) {
      // Error is handled by store
      console.error('Registration error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 30s ease-in-out infinite reverse',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
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
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }}
              >
                <ChildCare sx={{ fontSize: 120, filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))' }} />
              </Box>
              <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                {auth.hero.startJourney}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.95, mb: 4, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {auth.hero.captureMoments}
              </Typography>
            </Box>

            {/* Steps Cards */}
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <Stepper activeStep={-1} orientation="vertical" sx={{ bgcolor: 'transparent' }}>
                <Step>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <PersonAdd sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                    )}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                      {auth.hero.step1Title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {auth.hero.step1Desc}
                    </Typography>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <PhotoLibrary sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                    )}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                      {auth.hero.step2Title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {auth.hero.step2Desc}
                    </Typography>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <CheckCircle sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                    )}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                      {auth.hero.step3Title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {auth.hero.step3Desc}
                    </Typography>
                  </StepLabel>
                </Step>
              </Stepper>

              {/* Security Badge */}
              <Card
                sx={{
                  mt: 4,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Security sx={{ fontSize: 40, color: 'white' }} />
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: 'white' }}>
                      {auth.hero.securityTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {auth.hero.securityDesc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Right Side - Register Form */}
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
                animation: 'slideIn 0.6s ease-out',
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
                <ChildCare sx={{ fontSize: { xs: 50, sm: 60 }, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="secondary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Kids Memories
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ display: { xs: 'none', md: 'block' } }}>
                  {auth.register.title}
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" sx={{ display: { xs: 'block', md: 'none' }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  {auth.register.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {auth.register.subtitle} 🎉
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

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={auth.register.fullNameLabel}
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  error={!!validationErrors.display_name}
                  helperText={validationErrors.display_name}
                  margin="normal"
                  autoComplete="name"
                  autoFocus={!isMobile}
                  disabled={isLoading}
                  placeholder={auth.register.fullNamePlaceholder}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.15)',
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
                  label={auth.register.emailLabel}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  margin="normal"
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder={auth.register.emailPlaceholder}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.15)',
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
                  label={auth.register.passwordLabel}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  margin="normal"
                  autoComplete="new-password"
                  disabled={isLoading}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.15)',
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

                <TextField
                  fullWidth
                  label={auth.register.confirmPasswordLabel}
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!validationErrors.confirmPassword}
                  helperText={validationErrors.confirmPassword}
                  margin="normal"
                  autoComplete="new-password"
                  disabled={isLoading}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.15)',
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
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          disabled={isLoading}
                          size={isMobile ? "small" : "medium"}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  startIcon={isLoading ? <CircularProgress size={isMobile ? 18 : 20} color="inherit" /> : <RegisterIcon />}
                  sx={{
                    mt: { xs: 2, md: 3 },
                    mb: 2,
                    py: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 4px 20px rgba(245, 87, 108, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: isMobile ? 'scale(0.98)' : 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(245, 87, 108, 0.5)',
                      background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                    },
                    '&:active': {
                      transform: 'scale(0.97)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  {isLoading ? auth.register.registering : auth.register.registerButton}
                </Button>

                <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 3 } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {auth.register.haveAccount}{' '}
                    <Link
                      component={NextLink}
                      href="/auth/login"
                      underline="hover"
                      sx={{
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {auth.register.signIn}
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
