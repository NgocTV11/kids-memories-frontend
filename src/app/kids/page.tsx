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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 3 }}>
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 4,
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
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
                  <ChildCare sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    Bé yêu của tôi 💖
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Theo dõi sự phát triển và những khoảnh khắc đáng nhớ
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B9D 30%, #C06C84 90%)',
                  boxShadow: '0 4px 12px rgba(255, 107, 157, 0.3)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #C06C84 30%, #FF6B9D 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Thêm bé
              </Button>
            </Box>
          </Paper>

          {/* Stats Summary */}
          {!loading && kids.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    animation: 'fadeIn 0.5s ease-out 0.1s both',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'scale(0.9)' },
                      to: { opacity: 1, transform: 'scale(1)' },
                    },
                  }}
                >
                  <ChildCare sx={{ fontSize: 32, color: '#FF6B9D', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="#FF6B9D">
                    {kids.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bé yêu
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    animation: 'fadeIn 0.5s ease-out 0.2s both',
                  }}
                >
                  <TrendingUp sx={{ fontSize: 32, color: '#4CAF50', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="#4CAF50">
                    {kids.reduce((sum, kid) => sum + (kid.growth_data?.length || 0), 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bản ghi
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    animation: 'fadeIn 0.5s ease-out 0.3s both',
                  }}
                >
                  <Cake sx={{ fontSize: 32, color: '#FF9800', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="#FF9800">
                    {kids.filter(kid => {
                      const birthMonth = dayjs(kid.date_of_birth).month();
                      const currentMonth = dayjs().month();
                      return birthMonth === currentMonth;
                    }).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sinh nhật tháng này
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    animation: 'fadeIn 0.5s ease-out 0.4s both',
                  }}
                >
                  <Favorite sx={{ fontSize: 32, color: '#E91E63', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="#E91E63">
                    100%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
                py: 8,
                px: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
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
                <ChildCare sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Chưa có thông tin bé nào 👶
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Bắt đầu hành trình ghi lại những kỷ niệm tuyệt vời của bé yêu ngay hôm nay!
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<Add />} 
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B9D 30%, #C06C84 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #C06C84 30%, #FF6B9D 90%)',
                  },
                }}
              >
                Thêm bé đầu tiên
              </Button>
            </Paper>
          ) : (
            /* Kids Grid */
            <Grid container spacing={3}>
              {kids.map((kid, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={kid.id}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: `0 12px 24px ${getGenderColor(kid.gender)}40`,
                      },
                      '@keyframes slideUp': {
                        from: { opacity: 0, transform: 'translateY(30px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }} onClick={() => handleCardClick(kid.id)}>
                      {/* Avatar and Name */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                          sx={{
                            width: 70,
                            height: 70,
                            background: `linear-gradient(135deg, ${getGenderColor(kid.gender)}, ${getGenderColor(kid.gender)}dd)`,
                            mr: 2,
                            boxShadow: `0 4px 12px ${getGenderColor(kid.gender)}40`,
                          }}
                        >
                          <ChildCare sx={{ fontSize: 36 }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
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
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Info Grid */}
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: 'rgba(255, 107, 157, 0.1)',
                            mb: 1.5,
                          }}
                        >
                          <Cake sx={{ fontSize: 20, mr: 1.5, color: '#FF6B9D' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Sinh nhật
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {dayjs(kid.date_of_birth).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: 'rgba(76, 175, 80, 0.1)',
                            mb: 1.5,
                          }}
                        >
                          <TrendingUp sx={{ fontSize: 20, mr: 1.5, color: '#4CAF50' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Tuổi
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {calculateAge(kid.date_of_birth)}
                            </Typography>
                          </Box>
                        </Box>

                        {kid.growth_data && kid.growth_data.length > 0 && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: 'rgba(33, 150, 243, 0.1)',
                            }}
                          >
                            <Height sx={{ fontSize: 20, mr: 1.5, color: '#2196F3' }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Phát triển
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {kid.growth_data.length} bản ghi
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                        <Tooltip title="Xem chi tiết">
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            sx={{
                              borderColor: getGenderColor(kid.gender),
                              color: getGenderColor(kid.gender),
                              fontWeight: 'bold',
                              '&:hover': {
                                borderColor: getGenderColor(kid.gender),
                                bgcolor: `${getGenderColor(kid.gender)}10`,
                              },
                            }}
                          >
                            Xem
                          </Button>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(kid);
                            }}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
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
                              '&:hover': { bgcolor: 'error.lighter' },
                            }}
                          >
                            <Delete fontSize="small" />
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
          {!loading && kids.length > 0 && (
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
