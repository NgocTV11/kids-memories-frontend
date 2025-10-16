'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { kidsService, Kid } from '@/services/kids.service';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Fab,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  ChildCare,
  Cake,
  TrendingUp,
  Visibility,
  Height,
  FitnessCenter,
  Favorite,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { AddKidModal } from '@/components/kids/AddKidModal';

export default function KidsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const router = useRouter();
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedKid, setSelectedKid] = useState<Kid | undefined>(undefined);

  useEffect(() => {
    loadKids();
  }, []);

  const loadKids = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kidsService.getAll();
      setKids(data);
    } catch (err: any) {
      console.error('Error loading kids:', err);
      setError(err.response?.data?.message || 'Failed to load kids');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedKid(undefined);
    setOpenModal(true);
  };

  const handleEditClick = (kid: Kid) => {
    setSelectedKid(kid);
    setOpenModal(true);
  };

  const handleDeleteClick = async (kid: Kid) => {
    if (!confirm(`Bạn có chắc muốn xóa ${kid.name}?`)) return;

    try {
      await kidsService.delete(kid.id);
      setKids(kids.filter((k) => k.id !== kid.id));
    } catch (err: any) {
      console.error('Error deleting kid:', err);
      alert(err.response?.data?.message || 'Failed to delete kid');
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedKid(undefined);
  };

  const handleModalSuccess = () => {
    setOpenModal(false);
    setSelectedKid(undefined);
    loadKids();
  };

  const handleCardClick = (kidId: string) => {
    router.push(`/kids/${kidId}`);
  };

  const getGenderColor = (gender: string) => {
    return gender === 'male' ? '#2196f3' : gender === 'female' ? '#e91e63' : '#9e9e9e';
  };

  const getGenderLabel = (gender: string) => {
    return gender === 'male' ? 'Bé trai' : gender === 'female' ? 'Bé gái' : 'Khác';
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = dayjs();
    const birthDate = dayjs(dateOfBirth);
    const years = today.diff(birthDate, 'year');
    const months = today.diff(birthDate, 'month') % 12;
    
    if (years > 0) {
      return `${years} tuổi ${months} tháng`;
    } else {
      return `${months} tháng`;
    }
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 50%, #6C5B7B 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating Orbs */}
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            top: -100,
            left: -100,
            animation: 'float 25s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0)' },
              '33%': { transform: 'translate(30px, -30px)' },
              '66%': { transform: 'translate(-20px, 20px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            bottom: -50,
            right: -50,
            animation: 'float 20s ease-in-out infinite 3s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 3, md: 4 },
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              animation: 'slideDown 0.6s ease-out',
              '@keyframes slideDown': {
                from: { opacity: 0, transform: 'translateY(-30px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                <Box
                  sx={{
                    width: { xs: 48, sm: 56, md: 64 },
                    height: { xs: 48, sm: 56, md: 64 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'bounce 2s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }}
                >
                  <ChildCare sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    Bé yêu của tôi 💖
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body1"} color="text.secondary">
                    {isMobile ? `${kids.length} bé yêu` : 'Theo dõi sự phát triển và những khoảnh khắc đáng nhớ'}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                startIcon={!isMobile && <Add />}
                onClick={handleAddClick}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B9D 30%, #C06C84 90%)',
                  boxShadow: '0 4px 12px rgba(255, 107, 157, 0.3)',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #C06C84 30%, #FF6B9D 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isMobile ? '➕ Thêm bé' : 'Thêm bé'}
              </Button>
            </Box>
          </Paper>

          {/* Stats Summary */}
          {!loading && kids.length > 0 && (
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
              <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: 2, md: 3 },
                    animation: 'fadeIn 0.5s ease-out 0.1s both',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'scale(0.9)' },
                      to: { opacity: 1, transform: 'scale(1)' },
                    },
                  }}
                >
                  <ChildCare sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: '#FF6B9D', mb: { xs: 0.5, sm: 1 } }} />
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" color="#FF6B9D">
                    {kids.length}
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Bé yêu
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: 2, md: 3 },
                    animation: 'fadeIn 0.5s ease-out 0.2s both',
                  }}
                >
                  <TrendingUp sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: '#4CAF50', mb: { xs: 0.5, sm: 1 } }} />
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" color="#4CAF50">
                    {kids.reduce((sum, kid) => sum + (kid.growth_data?.length || 0), 0)}
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    {isMobile ? 'Ghi chép' : 'Bản ghi'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: 2, md: 3 },
                    animation: 'fadeIn 0.5s ease-out 0.3s both',
                  }}
                >
                  <Cake sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: '#FF9800', mb: { xs: 0.5, sm: 1 } }} />
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" color="#FF9800">
                    {kids.filter(kid => {
                      const birthMonth = dayjs(kid.date_of_birth).month();
                      const currentMonth = dayjs().month();
                      return birthMonth === currentMonth;
                    }).length}
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    {isMobile ? 'Sinh nhật' : 'Sinh nhật tháng này'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: 2, md: 3 },
                    animation: 'fadeIn 0.5s ease-out 0.4s both',
                  }}
                >
                  <Favorite sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: '#E91E63', mb: { xs: 0.5, sm: 1 } }} />
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" color="#E91E63">
                    100%
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Yêu thương
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Error Display */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                animation: 'shake 0.5s',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '25%': { transform: 'translateX(-10px)' },
                  '75%': { transform: 'translateX(10px)' },
                },
              }} 
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ color: 'white' }} />
            </Box>
          ) : kids.length === 0 ? (
            /* Empty State */
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                py: { xs: 6, sm: 8 },
                px: { xs: 3, sm: 4 },
                borderRadius: { xs: 3, md: 4 },
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Box
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                  },
                }}
              >
                <ChildCare sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white' }} />
              </Box>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" gutterBottom>
                Chưa có thông tin bé nào 👶
              </Typography>
              <Typography 
                variant={isMobile ? "body2" : "body1"} 
                color="text.secondary" 
                sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
              >
                Bắt đầu hành trình ghi lại những kỷ niệm tuyệt vời của bé yêu ngay hôm nay!
              </Typography>
              <Button 
                variant="contained" 
                size={isMobile ? "medium" : "large"}
                startIcon={!isMobile && <Add />} 
                onClick={handleAddClick}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B9D 30%, #C06C84 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  maxWidth: isMobile ? '100%' : 'auto',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #C06C84 30%, #FF6B9D 90%)',
                  },
                }}
              >
                {isMobile ? '➕ Thêm bé đầu tiên' : 'Thêm bé đầu tiên'}
              </Button>
            </Paper>
          ) : (
            /* Kids Grid */
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {kids.map((kid, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={kid.id}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: { xs: 3, md: 4 },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        transform: isMobile ? 'scale(0.98)' : 'translateY(-8px) scale(1.02)',
                        boxShadow: `0 12px 24px ${getGenderColor(kid.gender)}40`,
                      },
                      '&:active': {
                        transform: 'scale(0.97)',
                      },
                      '@keyframes slideUp': {
                        from: { opacity: 0, transform: 'translateY(30px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }} onClick={() => handleCardClick(kid.id)}>
                      {/* Avatar and Name */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Avatar
                          sx={{
                            width: { xs: 56, sm: 64, md: 70 },
                            height: { xs: 56, sm: 64, md: 70 },
                            background: `linear-gradient(135deg, ${getGenderColor(kid.gender)}, ${getGenderColor(kid.gender)}dd)`,
                            mr: { xs: 1.5, sm: 2 },
                            boxShadow: `0 4px 12px ${getGenderColor(kid.gender)}40`,
                          }}
                        >
                          <ChildCare sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant={isMobile ? "subtitle1" : "h6"} 
                            fontWeight="bold" 
                            gutterBottom 
                            sx={{ mb: 1 }}
                            noWrap
                          >
                            {kid.name}
                          </Typography>
                          <Chip
                            label={getGenderLabel(kid.gender)}
                            size="small"
                            sx={{
                              background: `linear-gradient(45deg, ${getGenderColor(kid.gender)}, ${getGenderColor(kid.gender)}dd)`,
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: 2,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              height: { xs: 20, sm: 24 },
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Info Grid */}
                      <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 1, sm: 1.5 },
                            borderRadius: 2,
                            bgcolor: 'rgba(255, 107, 157, 0.1)',
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <Cake sx={{ fontSize: { xs: 18, sm: 20 }, mr: { xs: 1, sm: 1.5 }, color: '#FF6B9D' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              {isMobile ? 'Sinh' : 'Sinh nhật'}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                              {dayjs(kid.date_of_birth).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 1, sm: 1.5 },
                            borderRadius: 2,
                            bgcolor: 'rgba(76, 175, 80, 0.1)',
                            mb: { xs: 1, sm: 1.5 },
                          }}
                        >
                          <TrendingUp sx={{ fontSize: { xs: 18, sm: 20 }, mr: { xs: 1, sm: 1.5 }, color: '#4CAF50' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              Tuổi
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                              {calculateAge(kid.date_of_birth)}
                            </Typography>
                          </Box>
                        </Box>

                        {kid.growth_data && kid.growth_data.length > 0 && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: { xs: 1, sm: 1.5 },
                              borderRadius: 2,
                              bgcolor: 'rgba(33, 150, 243, 0.1)',
                            }}
                          >
                            <Height sx={{ fontSize: { xs: 18, sm: 20 }, mr: { xs: 1, sm: 1.5 }, color: '#2196F3' }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                {isMobile ? 'Ghi chép' : 'Phát triển'}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                {kid.growth_data.length} {isMobile ? '' : 'bản ghi'}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, sm: 3 } }}>
                        <Tooltip title={isMobile ? "" : "Xem chi tiết"}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            startIcon={!isMobile && <Visibility />}
                            sx={{
                              borderColor: getGenderColor(kid.gender),
                              color: getGenderColor(kid.gender),
                              fontWeight: 'bold',
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              py: { xs: 0.5, sm: 0.75 },
                              '&:hover': {
                                borderColor: getGenderColor(kid.gender),
                                bgcolor: `${getGenderColor(kid.gender)}10`,
                              },
                            }}
                          >
                            {isMobile ? '👁️' : 'Xem'}
                          </Button>
                        </Tooltip>
                        <Tooltip title={isMobile ? "" : "Chỉnh sửa"}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(kid);
                            }}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            <Edit fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={isMobile ? "" : "Xóa"}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(kid);
                            }}
                            sx={{
                              border: '1px solid',
                              borderColor: 'error.main',
                              color: 'error.main',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'error.lighter' },
                            }}
                          >
                            <Delete fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Floating Action Button */}
          {!loading && kids.length > 0 && !isMobile && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleAddClick}
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                background: 'linear-gradient(45deg, #FF6B9D 30%, #C06C84 90%)',
                boxShadow: '0 8px 24px rgba(255, 107, 157, 0.4)',
                animation: 'pulse 2s infinite',
                '&:hover': {
                  background: 'linear-gradient(45deg, #C06C84 30%, #FF6B9D 90%)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Add sx={{ fontSize: 32 }} />
            </Fab>
          )}

          {/* Add/Edit Modal */}
          <AddKidModal
            open={openModal}
            kid={selectedKid}
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
          />
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
