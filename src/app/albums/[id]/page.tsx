'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Paper,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  ArrowBack,
  Lock,
  People,
  Public,
  Photo as PhotoIcon,
  Edit,
  Delete,
  Share,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { albumsService, Album } from '@/services/albums.service';
import { photosService, Photo } from '@/services/photos.service';
import { getImageUrl } from '@/utils/image';
import { PhotoGallery } from '@/components/photos/PhotoGallery';
import { PhotoDetailModal } from '@/components/photos/PhotoDetailModal';

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Photo detail modal state
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  useEffect(() => {
    loadAlbum();
    loadPhotos();
  }, [albumId]);

  const loadAlbum = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await albumsService.getById(albumId);
      setAlbum(data);
    } catch (err: any) {
      console.error('Error loading album:', err);
      setError(err.response?.data?.message || 'Không thể tải album');
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const data = await photosService.getAll(albumId, undefined, 100, 0);
      setPhotos(data.data);
    } catch (err: any) {
      console.error('Error loading photos:', err);
    } finally {
      setLoadingPhotos(false);
    }
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

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setPhotoModalOpen(true);
  };

  const handlePhotoUpdate = (updatedPhoto: Photo) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p))
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6347 100%)',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white' }} />
      </Box>
    );
  }

  if (error || !album) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6347 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Album không tồn tại'}
          </Alert>
          <IconButton
            onClick={() => router.push('/albums')}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6347 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3, color: 'white' }}>
          <Link
            color="inherit"
            href="/albums"
            onClick={(e) => {
              e.preventDefault();
              router.push('/albums');
            }}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Albums
          </Link>
          <Typography color="white" fontWeight="bold">
            {album.title}
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {album.title}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={getPrivacyIcon(album.privacy_level)}
                  label={getPrivacyLabel(album.privacy_level)}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
                {album.kid && (
                  <Chip
                    label={album.kid.name}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#FFA500',
                      color: '#FFA500',
                      fontWeight: 'bold',
                    }}
                  />
                )}
                <Chip
                  icon={<PhotoIcon />}
                  label={`${album.photos_count || 0} ảnh`}
                  size="small"
                  variant="outlined"
                />
              </Box>

              {album.description && (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {album.description}
                </Typography>
              )}

              <Typography variant="caption" color="text.secondary">
                📅 Tạo ngày {dayjs(album.created_at).format('DD/MM/YYYY')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => router.push('/albums')}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <ArrowBack />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Photos Grid */}
        {loadingPhotos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
          </Box>
        ) : photos.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 8,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <PhotoIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Album này chưa có ảnh nào
            </Typography>
          </Paper>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
              📸 Ảnh trong album ({photos.length})
            </Typography>
            
            <PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />
          </Box>
        )}
      </Container>

      {/* Photo Detail Modal */}
      <PhotoDetailModal
        open={photoModalOpen}
        photo={selectedPhoto}
        onClose={() => setPhotoModalOpen(false)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </Box>
  );
}
