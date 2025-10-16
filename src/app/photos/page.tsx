'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { photosService, Photo } from '@/services/photos.service';
import { albumsService, Album } from '@/services/albums.service';
import { kidsService, Kid } from '@/services/kids.service';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Paper,
  Chip,
} from '@mui/material';
import {
  Add,
  Photo as PhotoIcon,
  Upload,
  Collections,
  FilterList,
  Image,
  CloudUpload,
} from '@mui/icons-material';
import { PhotoUpload } from '@/components/photos/PhotoUpload';
import { PhotoGallery } from '@/components/photos/PhotoGallery';
import { PhotoDetail } from '@/components/photos/PhotoDetail';

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [selectedKidId, setSelectedKidId] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit] = useState(12); // Reduced for faster initial load

  useEffect(() => {
    loadData();
  }, [selectedAlbumId, selectedKidId, page]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [photosData, albumsData, kidsData] = await Promise.all([
        photosService.getAll(
          selectedAlbumId === 'all' ? undefined : selectedAlbumId,
          selectedKidId === 'all' ? undefined : selectedKidId,
          limit,
          page * limit
        ),
        albumsService.getAll(),
        kidsService.getAll(),
      ]);

      setPhotos(photosData.data);
      setTotal(photosData.total);
      setAlbums(albumsData);
      setKids(kidsData);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.response?.data?.message || 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setOpenUpload(false);
    setPage(0); // Reset to first page
    loadData();
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handlePhotoDetailClose = () => {
    setSelectedPhoto(null);
    loadData(); // Reload to get updated like counts
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    try {
      await photosService.delete(photoId);
      setPhotos(photos.filter((p) => p.id !== photoId));
      setSelectedPhoto(null);
    } catch (err: any) {
      console.error('Error deleting photo:', err);
      alert(err.response?.data?.message || 'Failed to delete photo');
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8B5CF6 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating Orbs */}
        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            top: -200,
            left: -200,
            animation: 'float 35s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '33%': { transform: 'translate(40px, -40px) scale(1.1)' },
              '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            bottom: -150,
            right: -150,
            animation: 'float 28s ease-in-out infinite 7s',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: 3 }}>
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  <Image sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    Thư viện ảnh 🖼️
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {total} ảnh đã lưu • Lưu giữ từng khoảnh khắc đáng nhớ
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<CloudUpload />}
                onClick={() => setOpenUpload(true)}
                sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Tải ảnh lên
              </Button>
            </Box>

            {/* Filters */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <FilterList sx={{ color: 'text.secondary' }} />
              <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>Album</InputLabel>
                    <Select
                      value={selectedAlbumId}
                      label="Album"
                      onChange={(e) => {
                        setSelectedAlbumId(e.target.value);
                        setPage(0);
                      }}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(102, 126, 234, 0.3)',
                        },
                      }}
                    >
                      <MenuItem value="all">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Collections fontSize="small" />
                          Tất cả albums
                        </Box>
                      </MenuItem>
                      {albums.map((album) => (
                        <MenuItem key={album.id} value={album.id}>
                          {album.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>Bé yêu</InputLabel>
                    <Select
                      value={selectedKidId}
                      label="Bé yêu"
                      onChange={(e) => {
                        setSelectedKidId(e.target.value);
                        setPage(0);
                      }}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(102, 126, 234, 0.3)',
                        },
                      }}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      {kids.map((kid) => (
                        <MenuItem key={kid.id} value={kid.id}>
                          {kid.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {photos.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Đang hiển thị
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Stats Row */}
          {!loading && photos.length > 0 && (
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
                  <PhotoIcon sx={{ fontSize: 28, color: '#667eea', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#667eea">
                    {total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tổng số ảnh
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
                  <Collections sx={{ fontSize: 28, color: '#764ba2', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#764ba2">
                    {albums.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Albums
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
                  <Image sx={{ fontSize: 28, color: '#8B5CF6', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#8B5CF6">
                    {Math.round((photos.length / total) * 100)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Hiển thị
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
                  <CloudUpload sx={{ fontSize: 28, color: '#9333EA', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#9333EA">
                    {kids.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Bé yêu
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
          {loading && page === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ color: 'white' }} />
            </Box>
          ) : photos.length === 0 ? (
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                <Image sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Chưa có ảnh nào 📷
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Bắt đầu tải lên những khoảnh khắc đáng nhớ của bé yêu ngay hôm nay!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<CloudUpload />}
                onClick={() => setOpenUpload(true)}
                sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                  },
                }}
              >
                Tải ảnh đầu tiên
              </Button>
            </Paper>
          ) : (
            <>
              {/* Photos Gallery with Animation */}
              <Box
                sx={{
                  animation: 'fadeIn 0.6s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />
              </Box>

              {/* Load More */}
              {photos.length < total && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleLoadMore}
                    disabled={loading}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      color: '#667eea',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: '#667eea' }} />
                        Đang tải...
                      </>
                    ) : (
                      `Xem thêm (${total - photos.length} ảnh)`
                    )}
                  </Button>
                </Box>
              )}
            </>
          )}

          {/* Floating Action Button for Upload */}
          <Fab
            color="primary"
            aria-label="upload"
            onClick={() => setOpenUpload(true)}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              animation: 'pulse 2s infinite',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Add sx={{ fontSize: 32 }} />
          </Fab>

          {/* Upload Modal */}
          <PhotoUpload
            open={openUpload}
            albums={albums}
            kids={kids}
            onClose={() => setOpenUpload(false)}
            onSuccess={handleUploadSuccess}
          />

          {/* Photo Detail Modal */}
          {selectedPhoto && (
            <PhotoDetail
              photo={selectedPhoto}
              onClose={handlePhotoDetailClose}
              onDelete={handleDeletePhoto}
            />
          )}
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
