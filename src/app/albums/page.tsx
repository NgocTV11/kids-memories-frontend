'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { albumsService, Album } from '@/services/albums.service';
import { kidsService, Kid } from '@/services/kids.service';
import { getImageUrl } from '@/utils/image';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Fab,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PhotoAlbum as AlbumIcon,
  Photo,
  Share,
  Lock,
  Public,
  People,
  Visibility,
  FilterList,
  Collections,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { AddAlbumModal } from '@/components/albums/AddAlbumModal';
import { ShareAlbumDialog } from '@/components/albums/ShareAlbumDialog';

export default function AlbumsPage() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(undefined);
  const [selectedKidId, setSelectedKidId] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, [selectedKidId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [albumsData, kidsData] = await Promise.all([
        albumsService.getAll(selectedKidId === 'all' ? undefined : selectedKidId),
        kidsService.getAll(),
      ]);

      setAlbums(albumsData);
      setKids(kidsData);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.response?.data?.message || 'Failed to load albums');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedAlbum(undefined);
    setOpenModal(true);
  };

  const handleEditClick = (album: Album) => {
    setSelectedAlbum(album);
    setOpenModal(true);
  };

  const handleShareClick = (album: Album) => {
    setSelectedAlbum(album);
    setOpenShareDialog(true);
  };

  const handleDeleteClick = async (album: Album) => {
    if (!confirm(`Bạn có chắc muốn xóa album "${album.title}"?`)) return;

    try {
      await albumsService.delete(album.id);
      setAlbums(albums.filter((a) => a.id !== album.id));
    } catch (err: any) {
      console.error('Error deleting album:', err);
      alert(err.response?.data?.message || 'Failed to delete album');
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedAlbum(undefined);
  };

  const handleModalSuccess = () => {
    setOpenModal(false);
    setSelectedAlbum(undefined);
    loadData();
  };

  const handleShareDialogClose = () => {
    setOpenShareDialog(false);
    setSelectedAlbum(undefined);
  };

  const handleCardClick = (albumId: string) => {
    router.push(`/albums/${albumId}`);
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'private':
        return <Lock fontSize="small" />;
      case 'family':
        return <People fontSize="small" />;
      case 'public':
        return <Public fontSize="small" />;
      default:
        return <Lock fontSize="small" />;
    }
  };

  const getPrivacyLabel = (privacy: string) => {
    switch (privacy) {
      case 'private':
        return 'Riêng tư';
      case 'family':
        return 'Gia đình';
      case 'public':
        return 'Công khai';
      default:
        return 'Riêng tư';
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case 'private':
        return 'error';
      case 'family':
        return 'warning';
      case 'public':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6347 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating Orbs */}
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
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            bottom: -100,
            left: -100,
            animation: 'float 25s ease-in-out infinite 5s',
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
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
                  <Collections sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    Albums của bé 📸
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Tổ chức và lưu giữ những khoảnh khắc đẹp
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                  boxShadow: '0 4px 12px rgba(255, 165, 0, 0.3)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Tạo album
              </Button>
            </Box>

            {/* Filter */}
            {kids.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FilterList sx={{ color: 'text.secondary' }} />
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel>Lọc theo bé</InputLabel>
                  <Select
                    value={selectedKidId}
                    label="Lọc theo bé"
                    onChange={(e) => setSelectedKidId(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 165, 0, 0.3)',
                      },
                    }}
                  >
                    <MenuItem value="all">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Collections fontSize="small" />
                        Tất cả albums
                      </Box>
                    </MenuItem>
                    {kids.map((kid) => (
                      <MenuItem key={kid.id} value={kid.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {kid.name}
                          <Chip
                            label={albums.filter(a => a.kid_id === kid.id).length}
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

          {/* Stats Row */}
          {!loading && albums.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 4 }}>
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
                  <Collections sx={{ fontSize: 28, color: '#FFA500', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#FFA500">
                    {albums.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Albums
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
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
                  <Photo sx={{ fontSize: 28, color: '#FF8C00', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#FF8C00">
                    {albums.reduce((sum, a) => sum + (a.photos_count || 0), 0)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ảnh
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
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
                  <Lock sx={{ fontSize: 28, color: '#FF6347', mb: 0.5 }} />
                  <Typography variant="h5" fontWeight="bold" color="#FF6347">
                    {albums.filter(a => a.privacy_level === 'private').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Riêng tư
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
          ) : albums.length === 0 ? (
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
                  background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
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
                <Collections sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedKidId === 'all' ? 'Chưa có album nào 📔' : 'Bé này chưa có album nào'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Tạo album đầu tiên để bắt đầu tổ chức và lưu trữ những khoảnh khắc đáng nhớ
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddClick}
                sx={{
                  background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                  },
                }}
              >
                Tạo album đầu tiên
              </Button>
            </Paper>
          ) : (
            /* Albums Masonry Grid */
            <Grid container spacing={3}>
              {albums.map((album, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      overflow: 'hidden',
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 16px 32px rgba(255, 165, 0, 0.3)',
                        '& .album-cover': {
                          transform: 'scale(1.1)',
                        },
                      },
                      '@keyframes slideUp': {
                        from: { opacity: 0, transform: 'translateY(30px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: 220,
                        bgcolor: 'grey.200',
                      }}
                      onClick={() => handleCardClick(album.id)}
                    >
                      {album.cover_photo_url ? (
                        <CardMedia
                          component="img"
                          image={getImageUrl(album.cover_photo_url)}
                          alt={album.title}
                          className="album-cover"
                          sx={{
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      ) : (
                        <Box
                          className="album-cover"
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #FFA50030 0%, #FF8C0030 100%)',
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          <Photo sx={{ fontSize: 60, color: 'grey.400' }} />
                        </Box>
                      )}
                      
                      {/* Overlay Icons */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <Chip
                          icon={getPrivacyIcon(album.privacy_level)}
                          label={getPrivacyLabel(album.privacy_level)}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          left: 12,
                          right: 12,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Chip
                          icon={<Photo />}
                          label={`${album.photos_count || 0} ảnh`}
                          size="small"
                          sx={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3 }} onClick={() => handleCardClick(album.id)}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        {album.title}
                      </Typography>

                      {album.kid && (
                        <Chip
                          label={album.kid.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            mb: 1.5,
                            borderColor: '#FFA500',
                            color: '#FFA500',
                            fontWeight: 'bold',
                          }}
                        />
                      )}

                      {album.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mb: 2,
                            minHeight: 40,
                          }}
                        >
                          {album.description}
                        </Typography>
                      )}

                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        📅 {dayjs(album.created_at).format('DD/MM/YYYY')}
                      </Typography>
                    </CardContent>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Xem">
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={() => handleCardClick(album.id)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chia sẻ">
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareClick(album);
                            }}
                          >
                            <Share fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(album);
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'error.main',
                              color: 'error.main',
                              '&:hover': { bgcolor: 'error.lighter' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(album);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Floating Action Button */}
          {!loading && albums.length > 0 && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleAddClick}
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                boxShadow: '0 8px 24px rgba(255, 165, 0, 0.4)',
                animation: 'pulse 2s infinite',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Add sx={{ fontSize: 32 }} />
            </Fab>
          )}

          {/* Modals */}
          <AddAlbumModal
            open={openModal}
            album={selectedAlbum}
            kids={kids}
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
          />

          {selectedAlbum && (
            <ShareAlbumDialog
              open={openShareDialog}
              album={selectedAlbum}
              onClose={handleShareDialogClose}
            />
          )}
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
