'use client';

import { useState, useEffect } from 'react';
import { Photo } from '@/services/photos.service';
import { photosService } from '@/services/photos.service';
import { getImageUrl } from '@/utils/image';
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Button,
  Chip,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Close,
  Favorite,
  FavoriteBorder,
  Delete,
  Download,
  Visibility,
  Comment as CommentIcon,
  CalendarToday,
  PhotoAlbum,
} from '@mui/icons-material';
import dayjs from 'dayjs';

interface PhotoDetailProps {
  photo: Photo;
  onClose: () => void;
  onDelete: (photoId: string) => void;
}

export function PhotoDetail({ photo, onClose, onDelete }: PhotoDetailProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(photo.likes_count || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Check if current user liked this photo
    // For now, assume not liked
    setLiked(false);
  }, [photo.id]);

  const handleLike = async () => {
    try {
      setLoading(true);
      if (liked) {
        await photosService.unlike(photo.id);
        setLikesCount((prev) => prev - 1);
        setLiked(false);
      } else {
        await photosService.like(photo.id);
        setLikesCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err: any) {
      console.error('Error toggling like:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Open image in new tab for download
    window.open(getImageUrl(photo.file_url), '_blank');
  };

  const handleDeleteClick = () => {
    onDelete(photo.id);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ position: 'relative', bgcolor: 'black' }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Image */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            maxHeight: '70vh',
          }}
        >
          <img
            src={getImageUrl(photo.file_url) || ''}
            alt={photo.caption || 'Photo'}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
            onError={(e) => {
              console.error('Image load error:', {
                src: getImageUrl(photo.file_url),
                originalPath: photo.file_url,
              });
              e.currentTarget.style.display = 'none';
            }}
          />
        </Box>

        {/* Info Panel */}
        <Box sx={{ bgcolor: 'background.paper', p: 3 }}>
          {/* Actions Row */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
            <Button
              startIcon={liked ? <Favorite /> : <FavoriteBorder />}
              onClick={handleLike}
              disabled={loading}
              color={liked ? 'error' : 'inherit'}
            >
              {likesCount} Thích
            </Button>
            <Button startIcon={<CommentIcon />}>
              {photo.comments_count || 0} Bình luận
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
              <Visibility fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {photo.view_count || 0} lượt xem
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <IconButton onClick={handleDownload}>
              <Download />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Photo Info */}
          <Box>
            {photo.caption && (
              <Typography variant="h6" gutterBottom>
                {photo.caption}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              {photo.album && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PhotoAlbum fontSize="small" color="action" />
                  <Typography variant="body2">{photo.album.title}</Typography>
                </Box>
              )}

              {photo.date_taken && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2">
                    {dayjs(photo.date_taken).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Tagged Kids */}
            {photo.kids_tagged && photo.kids_tagged.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Có mặt trong ảnh:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {photo.kids_tagged.map((kidId) => (
                    <Chip key={kidId} label={kidId} size="small" />
                  ))}
                </Box>
              </Box>
            )}

            {/* Tags */}
            {photo.tags && photo.tags.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {photo.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}

            {/* Uploader */}
            {photo.user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Avatar
                  src={photo.user.avatar_url || undefined}
                  alt={photo.user.display_name}
                  sx={{ width: 32, height: 32 }}
                />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {photo.user.display_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {dayjs(photo.created_at).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* EXIF Data */}
            {photo.exif_data && Object.keys(photo.exif_data).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Thông tin EXIF:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {photo.exif_data.Make && (
                    <Typography variant="caption" color="text.secondary">
                      📷 {photo.exif_data.Make} {photo.exif_data.Model}
                    </Typography>
                  )}
                  {photo.exif_data.FNumber && (
                    <Typography variant="caption" color="text.secondary">
                      f/{photo.exif_data.FNumber}
                    </Typography>
                  )}
                  {photo.exif_data.ExposureTime && (
                    <Typography variant="caption" color="text.secondary">
                      {photo.exif_data.ExposureTime}s
                    </Typography>
                  )}
                  {photo.exif_data.ISO && (
                    <Typography variant="caption" color="text.secondary">
                      ISO {photo.exif_data.ISO}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
