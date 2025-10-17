'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useI18nStore } from '@/store/i18n.store';
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
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const router = useRouter();
  const { albums: albumsT } = useI18nStore();
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
      setError(err.response?.data?.message || albumsT.loadError);
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
    if (!confirm(`${albumsT.deleteAlbumConfirm} "${album.title}"?`)) return;

    try {
      await albumsService.delete(album.id);
      setAlbums(albums.filter((a) => a.id !== album.id));
    } catch (err: any) {
      console.error('Error deleting album:', err);
      alert(err.response?.data?.message || albumsT.deleteError);
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
        return albumsT.privacy.private;
      case 'family':
        return albumsT.privacy.family;
      case 'public':
        return albumsT.privacy.public;
      default:
        return albumsT.privacy.private;
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
              gap: 2, 
              mb: kids.length > 0 ? (isMobile ? 2 : 3) : 0 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                <Box
                  sx={{
                    width: { xs: 48, sm: 56, md: 64 },
                    height: { xs: 48, sm: 56, md: 64 },
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
                  <Collections sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                    {albumsT.title} 📸
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body1"} color="text.secondary">
                    {isMobile ? `${albums.length} albums` : albumsT.subtitle}
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
                  background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                  boxShadow: '0 4px 12px rgba(255, 165, 0, 0.3)',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isMobile ? `➕ ${albumsT.createAlbum}` : albumsT.createAlbum}
              </Button>
            </Box>

            {/* Filter */}
            {kids.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                {!isMobile && <FilterList sx={{ color: 'text.secondary' }} />}
                <FormControl fullWidth={isMobile} sx={{ minWidth: isMobile ? 'auto' : 250 }} size={isMobile ? "small" : "medium"}>
                  <InputLabel>{albumsT.filterByKid}</InputLabel>
                  <Select
                    value={selectedKidId}
                    label={albumsT.filterByKid}
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
                        {isMobile ? albumsT.all : albumsT.allAlbums}
                      </Box>
                    </MenuItem>
                    {kids.map((kid) => (
                      <MenuItem key={kid.id} value={kid.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
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
            <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
              <Grid size={{ xs: 4 }}>
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
                  <Collections sx={{ fontSize: { xs: 24, sm: 28 }, color: '#FFA500', mb: 0.5 }} />
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" color="#FFA500">
                    {albums.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    Albums
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
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
                  <Photo sx={{ fontSize: { xs: 24, sm: 28 }, color: '#FF8C00', mb: 0.5 }} />
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" color="#FF8C00">
                    {albums.reduce((sum, a) => sum + (a.photos_count || 0), 0)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    Ảnh
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
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
                  <Lock sx={{ fontSize: { xs: 24, sm: 28 }, color: '#FF6347', mb: 0.5 }} />
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" color="#FF6347">
                    {albums.filter(a => a.privacy_level === 'private').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {isMobile ? albumsT.private : albumsT.privacy.private}
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
                <Collections sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white' }} />
              </Box>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" gutterBottom>
                {selectedKidId === 'all' ? albumsT.noAlbums : albumsT.noAlbumsForKid}
              </Typography>
              <Typography 
                variant={isMobile ? "body2" : "body1"} 
                color="text.secondary" 
                sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
              >
                {albumsT.noAlbumsDesc}
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                startIcon={!isMobile && <Add />}
                onClick={handleAddClick}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  maxWidth: isMobile ? '100%' : 'auto',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                  },
                }}
              >
                {isMobile ? `➕ ${albumsT.createFirstAlbum}` : albumsT.createFirstAlbum}
              </Button>
            </Paper>
          ) : (
            /* Albums Masonry Grid */
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {albums.map((album, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: { xs: 3, md: 4 },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      overflow: 'hidden',
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        transform: isMobile ? 'scale(0.98)' : 'translateY(-12px) scale(1.02)',
                        boxShadow: isMobile ? 2 : '0 16px 32px rgba(255, 165, 0, 0.3)',
                        '& .album-cover': {
                          transform: isMobile ? 'scale(1.05)' : 'scale(1.1)',
                        },
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
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: { xs: 180, sm: 200, md: 220 },
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
                          <Photo sx={{ fontSize: { xs: 48, sm: 60 }, color: 'grey.400' }} />
                        </Box>
                      )}
                      
                      {/* Overlay Icons */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: { xs: 8, sm: 12 },
                          right: { xs: 8, sm: 12 },
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <Chip
                          icon={getPrivacyIcon(album.privacy_level)}
                          label={isMobile ? '' : getPrivacyLabel(album.privacy_level)}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 'bold',
                            minWidth: isMobile ? 32 : 'auto',
                            '& .MuiChip-label': {
                              px: isMobile ? 0 : 1,
                            },
                          }}
                        />
                      </Box>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: { xs: 8, sm: 12 },
                          left: { xs: 8, sm: 12 },
                          right: { xs: 8, sm: 12 },
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Chip
                          icon={<Photo />}
                          label={`${album.photos_count || 0}${isMobile ? '' : ` ${albumsT.photos}`}`}
                          size="small"
                          sx={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          }}
                        />
                      </Box>
                    </Box>

                    <CardContent sx={{ flex: 1, p: { xs: 2, sm: 2.5, md: 3 } }} onClick={() => handleCardClick(album.id)}>
                      <Typography 
                        variant={isMobile ? "subtitle1" : "h6"} 
                        fontWeight="bold" 
                        gutterBottom 
                        sx={{ mb: { xs: 1.5, sm: 2 } }}
                        noWrap
                      >
                        {album.title}
                      </Typography>

                      {album.kid && !isMobile && (
                        <Chip
                          label={album.kid.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            mb: 1.5,
                            borderColor: '#FFA500',
                            color: '#FFA500',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                          }}
                        />
                      )}

                      {album.description && !isMobile && (
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

                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        📅 {dayjs(album.created_at).format(isMobile ? 'DD/MM/YY' : 'DD/MM/YYYY')}
                      </Typography>
                    </CardContent>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 } }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title={isMobile ? "" : "Xem"}>
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={() => handleCardClick(album.id)}
                          >
                            <Visibility fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={isMobile ? "" : albumsT.share}>
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareClick(album);
                            }}
                          >
                            <Share fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title={isMobile ? "" : albumsT.edit}>
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(album);
                            }}
                          >
                            <Edit fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={isMobile ? "" : albumsT.delete}>
                          <IconButton
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'error.main',
                              color: 'error.main',
                              width: { xs: 32, sm: 36 },
                              height: { xs: 32, sm: 36 },
                              '&:hover': { bgcolor: 'error.lighter' },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(album);
                            }}
                          >
                            <Delete fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
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
          {!loading && albums.length > 0 && !isMobile && (
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
