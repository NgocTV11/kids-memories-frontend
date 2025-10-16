'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { kidsService, Kid, GrowthData } from '@/services/kids.service';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  ChildCare,
  Cake,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { GrowthChart } from '@/components/kids/GrowthChart';
import { AddKidModal } from '@/components/kids/AddKidModal';
import { AddGrowthModal } from '@/components/kids/AddGrowthModal';

export default function KidDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kidId = params.id as string;

  const [kid, setKid] = useState<Kid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openGrowthModal, setOpenGrowthModal] = useState(false);

  useEffect(() => {
    loadKid();
  }, [kidId]);

  const loadKid = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kidsService.getById(kidId);
      setKid(data);
    } catch (err: any) {
      console.error('Error loading kid:', err);
      setError(err.response?.data?.message || 'Failed to load kid');
    } finally {
      setLoading(false);
    }
  };

  const getGenderColor = (gender: string) => {
    return gender === 'male' ? '#2196f3' : gender === 'female' ? '#e91e63' : '#9e9e9e';
  };

  const getGenderLabel = (gender: string) => {
    return gender === 'male' ? 'Bé trai' : gender === 'female' ? 'Bé gái' : 'Khác';
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        </Container>
      </ProtectedRoute>
    );
  }

  if (error || !kid) {
    return (
      <ProtectedRoute>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Kid not found'}
          </Alert>
          <Button startIcon={<ArrowBack />} onClick={() => router.back()}>
            Quay lại
          </Button>
        </Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/kids')}
            sx={{ mb: 2 }}
          >
            Quay lại danh sách
          </Button>

          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: getGenderColor(kid.gender),
                    mr: 3,
                  }}
                >
                  <ChildCare sx={{ fontSize: 48 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {kid.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                      label={getGenderLabel(kid.gender)}
                      sx={{
                        bgcolor: getGenderColor(kid.gender),
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Cake sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(kid.date_of_birth).format('DD/MM/YYYY')}
                      </Typography>
                    </Box>
                    {kid.age && (
                      <Typography variant="body2" color="text.secondary">
                        {kid.age}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <IconButton onClick={() => setOpenEditModal(true)}>
                <Edit />
              </IconButton>
            </Box>
          </Paper>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Số bản ghi phát triển
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {kid.growth_data?.length || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {kid.growth_data && kid.growth_data.length > 0 && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Chiều cao hiện tại
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {kid.growth_data[kid.growth_data.length - 1].height} cm
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Cân nặng hiện tại
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {kid.growth_data[kid.growth_data.length - 1].weight} kg
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>

        {/* Growth Chart */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Biểu đồ phát triển
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenGrowthModal(true)}
            >
              Thêm dữ liệu
            </Button>
          </Box>

          {kid.growth_data && kid.growth_data.length > 0 ? (
            <GrowthChart growthData={kid.growth_data} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Chưa có dữ liệu phát triển
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setOpenGrowthModal(true)}
                sx={{ mt: 2 }}
              >
                Thêm dữ liệu đầu tiên
              </Button>
            </Box>
          )}
        </Paper>

        {/* Modals */}
        <AddKidModal
          open={openEditModal}
          kid={kid}
          onClose={() => setOpenEditModal(false)}
          onSuccess={() => {
            setOpenEditModal(false);
            loadKid();
          }}
        />

        <AddGrowthModal
          open={openGrowthModal}
          kidId={kidId}
          onClose={() => setOpenGrowthModal(false)}
          onSuccess={() => {
            setOpenGrowthModal(false);
            loadKid();
          }}
        />
      </Container>
    </ProtectedRoute>
  );
}
