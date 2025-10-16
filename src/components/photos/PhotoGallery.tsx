'use client';

import { Photo } from '@/services/photos.service';
import { getImageUrl } from '@/utils/image';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Favorite,
  Comment,
  Visibility,
} from '@mui/icons-material';
import dayjs from 'dayjs';

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function PhotoGallery({ photos, onPhotoClick }: PhotoGalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getPhotoImageUrl = (photo: Photo): string => {
    // Use thumbnail for gallery (faster loading), fallback to medium then original
    const imagePath = photo.thumbnail_url || photo.medium_url || photo.file_url;
    return getImageUrl(imagePath) || '';
  };

  return (
    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
      {photos.map((photo) => (
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={photo.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              borderRadius: { xs: 2, md: 2 },
              transition: 'all 0.2s',
              '&:hover': {
                transform: isMobile ? 'scale(0.98)' : 'translateY(-4px)',
                boxShadow: isMobile ? 2 : 4,
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
            onClick={() => onPhotoClick(photo)}
          >
            <CardMedia
              component="div"
              sx={{
                paddingTop: '100%',
                position: 'relative',
                bgcolor: 'grey.200',
              }}
            >
              <img
                src={getPhotoImageUrl(photo)}
                alt={photo.caption || 'Photo'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay with stats */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  p: { xs: 0.5, sm: 1 },
                  display: 'flex',
                  gap: { xs: 1, sm: 2 },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Favorite fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {photo.likes_count || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Comment fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {photo.comments_count || 0}
                  </Typography>
                </Box>
                {!isMobile && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Visibility fontSize="small" />
                    <Typography variant="caption">{photo.view_count || 0}</Typography>
                  </Box>
                )}
              </Box>
            </CardMedia>

            <CardContent sx={{ flex: 1, p: { xs: 1, sm: 1.5 } }}>
              {photo.caption && !isMobile && (
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {photo.caption}
                </Typography>
              )}

              {photo.album && !isMobile && (
                <Chip
                  label={photo.album.title}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    mb: 0.5,
                    fontSize: '0.7rem',
                    height: 20,
                  }}
                />
              )}

              {!isMobile && (
                <Typography variant="caption" color="text.secondary" display="block">
                  {dayjs(photo.created_at).format('DD/MM/YYYY')}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
