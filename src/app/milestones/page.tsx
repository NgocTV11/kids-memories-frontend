'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { milestonesService, Milestone } from '@/services/milestones.service';
import { kidsService, Kid } from '@/services/kids.service';
import { useI18nStore } from '@/store/i18n.store';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  Add,
  Celebration,
  Timeline,
  EmojiEvents,
  FilterList,
  Stars,
} from '@mui/icons-material';
import { TimelineItem } from '@/components/milestones/TimelineItem';
import { AddMilestoneModal } from '@/components/milestones/AddMilestoneModal';

export default function MilestonesPage() {
  const { milestones: milestonesT } = useI18nStore();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | undefined>(undefined);
  const [selectedKidId, setSelectedKidId] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, [selectedKidId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [milestonesData, kidsData] = await Promise.all([
        milestonesService.getAll(selectedKidId === 'all' ? undefined : selectedKidId),
        kidsService.getAll(),
      ]);

      // Sort milestones by date descending (newest first)
      const sorted = milestonesData.sort((a, b) => {
        return new Date(b.milestone_date).getTime() - new Date(a.milestone_date).getTime();
      });

      setMilestones(sorted);
      setKids(kidsData);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.response?.data?.message || milestonesT.loadError);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedMilestone(undefined);
    setOpenModal(true);
  };

  const handleEditClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setOpenModal(true);
  };

  const handleDeleteClick = async (milestoneId: string) => {
    if (!confirm(milestonesT.deleteConfirm)) return;

    try {
      await milestonesService.delete(milestoneId);
      setMilestones(milestones.filter((m) => m.id !== milestoneId));
    } catch (err: any) {
      console.error('Error deleting milestone:', err);
      alert(err.response?.data?.message || milestonesT.deleteError);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedMilestone(undefined);
  };

  const handleModalSuccess = () => {
    setOpenModal(false);
    setSelectedMilestone(undefined);
    loadData();
  };

  const getMilestonesByCategory = () => {
    const categories = ['first_time', 'physical', 'cognitive', 'social', 'other'];
    return categories.map(cat => ({
      category: cat,
      count: milestones.filter(m => m.category === cat).length,
    }));
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating Orbs with Stars */}
        <Box
          sx={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            top: -150,
            right: -150,
            animation: 'float 30s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
              '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
              '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            bottom: -100,
            left: -100,
            animation: 'float 25s ease-in-out infinite 5s',
          }}
        />
        
        {/* Animated Stars */}
        {[...Array(5)].map((_, i) => (
          <Stars
            key={i}
            sx={{
              position: 'absolute',
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.3)',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animation: `twinkle ${2 + i}s ease-in-out infinite ${i * 0.5}s`,
              '@keyframes twinkle': {
                '0%, 100%': { opacity: 0.3, transform: 'scale(1) rotate(0deg)' },
                '50%': { opacity: 0.8, transform: 'scale(1.2) rotate(180deg)' },
              },
            }}
          />
        ))}

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
                  <EmojiEvents sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    {milestonesT.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {milestonesT.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)',
                  boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {milestonesT.addMilestone}
              </Button>
            </Box>

            {/* Filter */}
            {kids.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FilterList sx={{ color: 'text.secondary' }} />
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel>{milestonesT.filterByKid}</InputLabel>
                  <Select
                    value={selectedKidId}
                    label={milestonesT.filterByKid}
                    onChange={(e) => setSelectedKidId(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(79, 172, 254, 0.3)',
                      },
                    }}
                  >
                    <MenuItem value="all">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timeline fontSize="small" />
                        {milestonesT.allMilestones}
                      </Box>
                    </MenuItem>
                    {kids.map((kid) => (
                      <MenuItem key={kid.id} value={kid.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {kid.name}
                          <Chip
                            label={milestones.filter(m => m.kid_id === kid.id).length}
                            size="small"
                            sx={{ ml: 'auto', height: 20, fontSize: '0.7rem' }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Paper>

          {/* Category Stats */}
          {!loading && milestones.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 6, md: 2.4 }}>
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
                  <Celebration sx={{ fontSize: 28, color: '#FFD700', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#FFD700">
                    {milestones.filter(m => m.category === 'first_time').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {milestonesT.categories.first_time}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 2.4 }}>
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
                  <EmojiEvents sx={{ fontSize: 28, color: '#FF6347', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#FF6347">
                    {milestones.filter(m => m.category === 'physical').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {milestonesT.categories.physical}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 2.4 }}>
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
                  <Stars sx={{ fontSize: 28, color: '#4facfe', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#4facfe">
                    {milestones.filter(m => m.category === 'cognitive').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {milestonesT.categories.cognitive}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 2.4 }}>
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
                  <Celebration sx={{ fontSize: 28, color: '#43e97b', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#43e97b">
                    {milestones.filter(m => m.category === 'social').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {milestonesT.categories.social}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 2.4 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    animation: 'fadeIn 0.5s ease-out 0.5s both',
                  }}
                >
                  <Timeline sx={{ fontSize: 28, color: '#00f2fe', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#00f2fe">
                    {milestones.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {milestonesT.total}
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
          ) : milestones.length === 0 ? (
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
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
                <EmojiEvents sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedKidId === 'all' ? milestonesT.noMilestones : milestonesT.noMilestonesForKid}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                {milestonesT.noMilestonesDesc}
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)',
                  },
                }}
              >
                {milestonesT.addFirstMilestone}
              </Button>
            </Paper>
          ) : (
            /* Enhanced Timeline */
            <Box sx={{ position: 'relative' }}>
              {/* Animated Vertical Line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 16, md: 32 },
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
                  borderRadius: 2,
                  boxShadow: '0 0 10px rgba(79, 172, 254, 0.5)',
                }}
              />

              {/* Timeline Items with Enhanced Animation */}
              <Box>
                {milestones.map((milestone, index) => (
                  <Box
                    key={milestone.id}
                    sx={{
                      animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes slideIn': {
                        from: { opacity: 0, transform: 'translateX(-50px)' },
                        to: { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    <TimelineItem
                      milestone={milestone}
                      isLast={index === milestones.length - 1}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Floating Action Button */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddClick}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)',
              boxShadow: '0 8px 24px rgba(79, 172, 254, 0.4)',
              animation: 'pulse 2s infinite',
              '&:hover': {
                background: 'linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Add sx={{ fontSize: 32 }} />
          </Fab>

          {/* Add/Edit Modal */}
          <AddMilestoneModal
            open={openModal}
            milestone={selectedMilestone}
            kids={kids}
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
          />
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
