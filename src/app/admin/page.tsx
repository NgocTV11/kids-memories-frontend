'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/auth.store';
import { adminService, AdminStats } from '@/services/admin.service';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import {
  People,
  FamilyRestroom,
  ChildCare,
  PhotoAlbum,
  Photo,
  Celebration,
  ArrowForward,
} from '@mui/icons-material';
import dayjs from 'dayjs';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      console.error('Error loading stats:', err);
      setError(err.response?.data?.message || 'Failed to load statistics');
      
      if (err.response?.status === 403) {
        setError('Bạn không có quyền truy cập trang này');
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  if (user && user.role !== 'admin') {
    return (
      <ProtectedRoute>
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          <Alert severity="error">
            Bạn không có quyền truy cập trang này. Chỉ Admin mới được phép.
          </Alert>
        </Container>
      </ProtectedRoute>
    );
  }

  const statsCards = [
    {
      title: 'Users',
      value: stats?.totalUsers || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#2196f3',
      link: '/admin/users',
    },
    {
      title: 'Families',
      value: stats?.totalFamilies || 0,
      icon: <FamilyRestroom sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      link: '/admin/families',
    },
    {
      title: 'Kids',
      value: stats?.totalKids || 0,
      icon: <ChildCare sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      link: '#',
    },
    {
      title: 'Albums',
      value: stats?.totalAlbums || 0,
      icon: <PhotoAlbum sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      link: '#',
    },
    {
      title: 'Photos',
      value: stats?.totalPhotos || 0,
      icon: <Photo sx={{ fontSize: 40 }} />,
      color: '#f44336',
      link: '#',
    },
    {
      title: 'Milestones',
      value: stats?.totalMilestones || 0,
      icon: <Celebration sx={{ fontSize: 40 }} />,
      color: '#00bcd4',
      link: '#',
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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 3 }}>
          {/* Header */}
          <Paper
            elevation={4}
            sx={{
              mb: 3,
              p: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  🛠️ Admin Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quản lý hệ thống Kids Memories
                </Typography>
              </Box>
              <Chip label="Admin" color="error" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }} />
            </Box>
          </Paper>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Stats Grid */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 3,
                  mb: 4,
                }}
              >
                {statsCards.map((stat, index) => (
                  <Card
                    key={index}
                    elevation={6}
                    sx={{
                      cursor: stat.link !== '#' ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: `3px solid ${stat.color}`,
                      borderRadius: 3,
                      '&:hover': stat.link !== '#' ? {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 32px ${stat.color}60`,
                        background: 'rgba(255, 255, 255, 1)',
                      } : {},
                    }}
                    onClick={() => stat.link !== '#' && router.push(stat.link)}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            color: 'white',
                            background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}DD 100%)`,
                            borderRadius: '50%',
                            p: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 12px ${stat.color}50`,
                            width: 72,
                            height: 72,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Box>
                          <Typography variant="h2" fontWeight="bold" color={stat.color} sx={{ mb: 0.5 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="h6" fontWeight="600" color="text.primary">
                            {stat.title}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Recent Users */}
              {stats && stats.recentUsers.length > 0 && (
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    mb: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                      👤 Users mới nhất
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<ArrowForward />}
                      onClick={() => router.push('/admin/users')}
                      sx={{
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                      }}
                    >
                      Xem tất cả
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {stats.recentUsers.map((user) => (
                      <Card
                        key={user.id}
                        elevation={2}
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: '2px solid transparent',
                          '&:hover': {
                            border: '2px solid #2196f3',
                            boxShadow: '0 12px 24px rgba(33, 150, 243, 0.3)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              src={user.avatar_url || undefined}
                              sx={{ width: 56, height: 56, bgcolor: '#2196f3' }}
                            >
                              {user.display_name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {user.display_name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {user.email}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Đăng ký: {dayjs(user.created_at).format('DD/MM/YYYY HH:mm')}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Paper>
              )}
            </>
          )}
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
