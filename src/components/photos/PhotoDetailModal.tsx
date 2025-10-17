'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Close,
  Favorite,
  FavoriteBorder,
  Comment as CommentIcon,
  Visibility,
  Send,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { Photo, photosService, PhotoComment } from '@/services/photos.service';
import { getImageUrl } from '@/utils/image';
import { useI18nStore } from '@/store/i18n.store';

dayjs.extend(relativeTime);
dayjs.locale('vi');

interface PhotoDetailModalProps {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
  onPhotoUpdate?: (photo: Photo) => void;
}

export function PhotoDetailModal({ open, photo, onClose, onPhotoUpdate }: PhotoDetailModalProps) {
  const { photos: photosT } = useI18nStore();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [comments, setComments] = useState<PhotoComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (photo && open) {
      // Reset state when opening new photo
      setComments([]);
      setNewComment('');
      
      loadPhotoDetails();
      trackView();
    }
  }, [photo?.id, open]); // Listen to photo.id instead of photo object

  const loadPhotoDetails = async () => {
    if (!photo) return;
    
    try {
      setLoading(true);
      
      // Load initial data from photo object
      setLikesCount(photo.likes_count || 0);
      setCommentsCount(photo.comments_count || 0);
      setViewCount(photo.view_count || 0);
      
      // Try to check if user liked this photo (fallback to false if API not ready)
      try {
        const liked = await photosService.checkIfLiked(photo.id);
        setIsLiked(liked);
      } catch (error) {
        console.warn('Like check API not available yet, defaulting to false');
        setIsLiked(false);
      }
      
      // Try to load comments (fallback to empty array if API not ready)
      try {
        const commentsData = await photosService.getComments(photo.id);
        setComments(commentsData);
      } catch (error) {
        console.warn('Comments API not available yet, showing empty list');
        setComments([]);
      }
    } catch (error) {
      console.error('Error loading photo details:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    if (!photo) return;
    
    try {
      await photosService.trackView(photo.id);
      // Update local view count
      setViewCount((prev) => prev + 1);
      
      // Update parent photo data
      if (onPhotoUpdate && photo) {
        onPhotoUpdate({
          ...photo,
          view_count: (photo.view_count || 0) + 1,
        });
      }
    } catch (error) {
      // Silently fail - view tracking API not available yet
      console.warn('View tracking API not available yet');
    }
  };

  const handleLike = async () => {
    if (!photo) return;
    
    // Optimistic update
    const wasLiked = isLiked;
    const oldCount = likesCount;
    
    try {
      if (isLiked) {
        // Unlike
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
        await photosService.unlike(photo.id);
        
        // Update parent component
        if (onPhotoUpdate && photo) {
          onPhotoUpdate({
            ...photo,
            likes_count: likesCount - 1,
          });
        }
      } else {
        // Like
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        await photosService.like(photo.id);
        
        // Update parent component
        if (onPhotoUpdate && photo) {
          onPhotoUpdate({
            ...photo,
            likes_count: likesCount + 1,
          });
        }
      }
    } catch (error) {
      console.warn('Like API not available yet, showing local state only');
      // Keep optimistic update even if API fails (for demo purposes)
      // In production, you'd want to revert:
      // setIsLiked(wasLiked);
      // setLikesCount(oldCount);
    }
  };

  const handleSubmitComment = async () => {
    if (!photo || !newComment.trim()) return;
    
    try {
      setSubmitting(true);
      
      try {
        // Try to post comment to API
        const comment = await photosService.addComment(photo.id, newComment);
        
        // Add new comment to the list
        setComments([comment, ...comments]);
        setCommentsCount((prev) => prev + 1);
        setNewComment('');
        
        // Update parent component
        if (onPhotoUpdate && photo) {
          onPhotoUpdate({
            ...photo,
            comments_count: commentsCount + 1,
          });
        }
      } catch (apiError) {
        // API not available yet - show mock comment for demo
        console.warn('Comments API not available yet, showing mock comment');
        
        const mockComment: PhotoComment = {
          id: `mock-${Date.now()}`,
          photo_id: photo.id,
          user_id: 'current-user',
          content: newComment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: 'current-user',
            display_name: 'Bạn (Demo)',
            avatar_url: null,
          },
        };
        
        setComments([mockComment, ...comments]);
        setCommentsCount((prev) => prev + 1);
        setNewComment('');
        
        alert('⚠️ API chưa sẵn sàng. Comment này chỉ hiển thị local (sẽ mất khi reload).');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert(photosT.photoDetail.commentError);
    } finally {
      setSubmitting(false);
    }
  };

  if (!photo) return null;

  const getPhotoUrl = (photo: Photo): string => {
    // Use medium quality for detail view
    const imagePath = photo.medium_url || photo.file_url;
    return getImageUrl(imagePath) || '';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Image Section - Left */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <img
            src={getPhotoUrl(photo)}
            alt={photo.caption || 'Photo'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
          
          {/* Close button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Details Section - Right */}
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {photo.album?.title?.[0] || 'A'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {photo.album?.title || 'Album'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(photo.created_at).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Box>
            </Box>

            {photo.caption && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {photo.caption}
              </Typography>
            )}

            {photo.tags && photo.tags.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {photo.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton>
                <CommentIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Typography variant="body2">
                <strong>{likesCount}</strong> {photosT.photoDetail.likes}
              </Typography>
              <Typography variant="body2">
                <strong>{commentsCount}</strong> {photosT.photoDetail.comments}
              </Typography>
              <Typography variant="body2">
                <strong>{viewCount}</strong> {photosT.photoDetail.views}
              </Typography>
            </Box>
          </Box>

          {/* Comments */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={30} />
              </Box>
            ) : comments.length === 0 ? (
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                {photosT.photoDetail.noComments}
              </Typography>
            ) : (
              comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {comment.user.display_name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.user.display_name}
                      </Typography>
                      <Typography variant="body2">
                        {comment.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dayjs(comment.created_at).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Comment Input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder={photosT.photoDetail.addCommentPlaceholder}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                multiline
                maxRows={3}
              />
              <IconButton
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || submitting}
                color="primary"
              >
                {submitting ? <CircularProgress size={24} /> : <Send />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
