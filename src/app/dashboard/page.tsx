'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/auth.store';
import { kidsService, Kid } from '@/services/kids.service';
import { milestonesService, Milestone } from '@/services/milestones.service';
import { statsService } from '@/services/stats.service';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  ChildCare,
  PhotoAlbum,
  Photo as PhotoIcon,
  Celebration,
  Logout,
  Add,
  ArrowForward,
  Cake,
  FamilyRestroom,
} from '@mui/icons-material';
import dayjs from 'dayjs';

export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { user, logout } = useAuthStore();
  
  const [stats, setStats] = useState({
    kids: 0,
    albums: 0,
    photos: 0,
    milestones: 0,
    families: 0,
  });
  const [recentKids, setRecentKids] = useState<Kid[]>([]);
  const [recentMilestones, setRecentMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
    
    // Prefetch common routes for faster navigation
    router.prefetch('/kids');
    router.prefetch('/albums');
    router.prefetch('/photos');
    router.prefetch('/milestones');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, kids, milestones] = await Promise.all([
        statsService.getStats(),
        kidsService.getAll(),
        milestonesService.getAll(),
      ]);

      setStats(statsData);

      // Set recent kids (latest 3)
      setRecentKids(kids.slice(0, 3));

      // Set recent milestones (latest 5)
      setRecentMilestones(milestones.slice(0, 5));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const statsCards = [
    {
      title: 'Bé yêu',
      value: stats.kids,
      icon: <ChildCare sx={{ fontSize: 40 }} />,
      color: '#2196f3',
      action: () => router.push('/kids'),
    },
    {
      title: 'Albums',
      value: stats.albums,
      icon: <PhotoAlbum sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      action: () => router.push('/albums'),
    },
    {
      title: 'Photos',
      value: stats.photos,
      icon: <PhotoIcon sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      action: () => router.push('/photos'),
    },
    {
      title: 'Milestones',
      value: stats.milestones,
      icon: <Celebration sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      action: () => router.push('/milestones'),
    },
    {
      title: 'Families',
      value: stats.families,
      icon: <FamilyRestroom sx={{ fontSize: 40 }} />,
      color: '#FF6B6B',
      action: () => router.push('/families'),
    },
  ];

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          pb: 4,
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
            right: -100,
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0)' },
              '33%': { transform: 'translate(-30px, 30px)' },
              '66%': { transform: 'translate(20px, -20px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            bottom: -50,
            left: -50,
            animation: 'float 15s ease-in-out infinite reverse',
          }}
        />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Paper 
          elevation={4} 
          sx={{ 
            mb: { xs: 2, sm: 3 }, 
            p: { xs: 2, sm: 3 }, 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            gap: 2 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
              <Avatar
                sx={{ 
                  width: { xs: 48, sm: 64 }, 
                  height: { xs: 48, sm: 64 }, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                }}
                src={user?.avatar_url || undefined}
              >
                {user?.display_name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  variant={isMobile ? "h6" : "h4"} 
                  fontWeight="bold" 
                  sx={{ mb: 0.5 }}
                  noWrap={isMobile}
                >
                  👋 Xin chào, {user?.display_name}!
                </Typography>
                <Typography 
                  variant={isMobile ? "caption" : "body1"} 
                  color="text.secondary"
                  noWrap
                >
                  {user?.email}
                </Typography>
              </Box>
            </Box>
            {isMobile ? (
              <IconButton
                onClick={handleLogout}
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  alignSelf: 'flex-end',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                  },
                }}
              >
                <Logout />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                  },
                }}
              >
                Đăng xuất
              </Button>
            )}
          </Box>
        </Paper>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: { xs: 2, sm: 3 } }}>
            {error}
          </Alert>
        )}

        {/* Stats Grid - Responsive */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)',  // Mobile: 2 columns
              sm: 'repeat(2, 1fr)',  // Tablet portrait: 2 columns
              md: 'repeat(5, 1fr)'   // Desktop: 5 columns
            }, 
            gap: { xs: 2, sm: 2.5, md: 3 }, 
            mb: { xs: 3, sm: 4 } 
          }}>
            {statsCards.slice(0, isMobile ? 4 : 5).map((stat, index) => (
              <Card
                key={index}
                elevation={6}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: `3px solid ${stat.color}`,
                  borderRadius: { xs: 2, sm: 3 },
                  '&:hover': {
                    transform: { xs: 'scale(1.02)', sm: 'translateY(-8px)' },
                    boxShadow: `0 ${isMobile ? '8' : '16'}px ${isMobile ? '16' : '32'}px ${stat.color}60`,
                    border: `3px solid ${stat.color}`,
                    background: 'rgba(255, 255, 255, 1)',
                  },
                }}
                onClick={stat.action}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    gap: { xs: 1.5, sm: 2 } 
                  }}>
                    <Box 
                      sx={{ 
                        color: 'white',
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}DD 100%)`,
                        borderRadius: '50%',
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${stat.color}50`,
                        width: { xs: 56, sm: 64, md: 72 },
                        height: { xs: 56, sm: 64, md: 72 },
                        '& > svg': {
                          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                        },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography 
                        variant={isMobile ? "h4" : "h2"} 
                        fontWeight="bold" 
                        color={stat.color} 
                        sx={{ mb: 0.5 }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant={isMobile ? "body2" : "h6"} 
                        fontWeight="600" 
                        color="text.primary"
                        noWrap={isMobile}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Recent Kids Section */}
        {recentKids.length > 0 && (
          <Paper 
            elevation={4}
            sx={{ 
              p: { xs: 3, sm: 4 }, 
              mb: { xs: 2, sm: 3 }, 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: { xs: 2, sm: 3 },
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
              <Typography variant={isMobile ? "subtitle1" : "h5"} fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                👶 Bé yêu của bạn
              </Typography>
              <Button
                variant="contained"
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => router.push('/kids')}
                sx={{
                  background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {isMobile ? 'Tất cả' : 'Xem tất cả'}
              </Button>
            </Box>
            <Divider sx={{ mb: { xs: 2, sm: 3 } }} />
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
              gap: { xs: 2, sm: 2.5, md: 3 } 
            }}>
              {recentKids.map((kid) => (
                <Card
                  key={kid.id}
                  elevation={2}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: { xs: 'scale(1.02)', sm: 'translateY(-8px)' },
                      boxShadow: '0 12px 24px rgba(33, 150, 243, 0.3)',
                      border: '2px solid #2196f3',
                    },
                  }}
                  onClick={() => router.push('/kids')}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                      <Avatar
                        src={kid.profile_picture || undefined}
                        sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }, bgcolor: 'primary.main' }}
                      >
                        {kid.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant={isMobile ? "body1" : "h6"} fontWeight="bold" noWrap>
                          {kid.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <Cake fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {dayjs(kid.date_of_birth).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>
                        {kid.gender && (
                          <Chip
                            label={kid.gender === 'male' ? '👦 Nam' : '👧 Nữ'}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        )}

        {/* Recent Milestones Section */}
        {recentMilestones.length > 0 && (
          <Paper 
            elevation={4}
            sx={{ 
              p: { xs: 3, sm: 4 }, 
              mb: { xs: 2, sm: 3 }, 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: { xs: 2, sm: 3 },
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
              <Typography variant={isMobile ? "subtitle1" : "h5"} fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🎉 Milestones gần đây
              </Typography>
              <Button
                variant="contained"
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => router.push('/milestones')}
                sx={{
                  background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {isMobile ? 'Tất cả' : 'Xem tất cả'}
              </Button>
            </Box>
            <Divider sx={{ mb: { xs: 2, sm: 3 } }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
              {recentMilestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  elevation={2}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: { xs: 'scale(1.01)', sm: 'translateX(8px)' },
                      boxShadow: '0 12px 24px rgba(156, 39, 176, 0.3)',
                      border: '2px solid #9c27b0',
                    },
                  }}
                  onClick={() => router.push('/milestones')}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant={isMobile ? "body1" : "subtitle1"} fontWeight="bold" gutterBottom noWrap>
                          {milestone.title}
                        </Typography>
                        {milestone.description && !isMobile && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {milestone.description.length > 100
                              ? `${milestone.description.substring(0, 100)}...`
                              : milestone.description}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                          {milestone.kid && (
                            <Chip
                              label={milestone.kid.name}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          )}
                          <Chip
                            label={milestone.category}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={dayjs(milestone.milestone_date).format('DD/MM/YYYY')}
                            size="small"
                            icon={<Cake />}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        )}

        {/* Quick Actions & Welcome Message */}
        <Paper 
          elevation={4}
          sx={{ 
            p: { xs: 3, sm: 4 },
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h4"} 
            gutterBottom 
            sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}
          >
            🎉 Chào mừng đến với Kids Memories!
          </Typography>
          <Typography 
            variant={isMobile ? "caption" : "body1"} 
            color="text.secondary" 
            sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 }, display: 'block' }}
          >
            Bắt đầu lưu giữ những kỷ niệm đáng nhớ của bé yêu
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
            gap: { xs: 2, sm: 2.5, md: 3 } 
          }}>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<Add />}
              onClick={() => router.push('/kids')}
              fullWidth
              sx={{ 
                py: { xs: 2, sm: 2.5 },
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': { 
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isMobile ? 'Thêm bé' : 'Thêm bé'}
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<Add />}
              onClick={() => router.push('/albums')}
              fullWidth
              sx={{ 
                py: { xs: 2, sm: 2.5 },
                background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': { 
                  background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(76, 175, 80, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isMobile ? 'Album' : 'Tạo album'}
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<Add />}
              onClick={() => router.push('/photos')}
              fullWidth
              sx={{ 
                py: { xs: 2, sm: 2.5 },
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': { 
                  background: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(255, 152, 0, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isMobile ? 'Ảnh' : 'Upload ảnh'}
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<Add />}
              onClick={() => router.push('/milestones')}
              fullWidth
              sx={{ 
                py: { xs: 2, sm: 2.5 },
                background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                boxShadow: '0 4px 12px rgba(156, 39, 176, 0.4)',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': { 
                  background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(156, 39, 176, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isMobile ? 'Mốc' : 'Thêm milestone'}
            </Button>
          </Box>
        </Paper>
      </Container>
      </Box>
    </ProtectedRoute>
  );
}
