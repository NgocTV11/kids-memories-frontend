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
  const getPhotoImageUrl = (photo: Photo): string => {
    // Use thumbnail for gallery (faster loading), fallback to medium then original
    const imagePath = photo.thumbnail_url || photo.medium_url || photo.file_url;
    return getImageUrl(imagePath) || '';
  };

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={photo.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
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
                  p: 1,
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Favorite fontSize="small" />
                  <Typography variant="caption">{photo.likes_count || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Comment fontSize="small" />
                  <Typography variant="caption">{photo.comments_count || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Visibility fontSize="small" />
                  <Typography variant="caption">{photo.view_count || 0}</Typography>
                </Box>
              </Box>
            </CardMedia>

            <CardContent sx={{ flex: 1, p: 1.5 }}>
              {photo.caption && (
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1,
                  }}
                >
                  {photo.caption}
                </Typography>
              )}

              {photo.album && (
                <Chip
                  label={photo.album.title}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              )}

              <Typography variant="caption" color="text.secondary" display="block">
                {dayjs(photo.created_at).format('DD/MM/YYYY')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
