'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  MoreVert,
  PlayCircle,
  Delete,
  Edit,
  Share,
  Visibility,
  Schedule,
} from '@mui/icons-material';
import { Video, videosService } from '@/services/videos.service';
import { VideoPlayerDialog } from './VideoPlayer';

interface VideoGalleryProps {
  videos: Video[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (videoId: string) => void;
  onEdit?: (video: Video) => void;
  onRefresh?: () => void;
}

export function VideoGallery({
  videos,
  loading = false,
  error = null,
  onDelete,
  onEdit,
  onRefresh,
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuVideo, setMenuVideo] = useState<Video | null>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, video: Video) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuVideo(video);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVideo(null);
  };

  const handleDelete = async () => {
    if (menuVideo && onDelete) {
      try {
        await videosService.delete(menuVideo.id);
        onDelete(menuVideo.id);
        handleMenuClose();
        if (onRefresh) onRefresh();
      } catch (err) {
        console.error('Error deleting video:', err);
      }
    }
  };

  const handleEdit = () => {
    if (menuVideo && onEdit) {
      onEdit(menuVideo);
      handleMenuClose();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (videos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <PlayCircle sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Videos Yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your first video to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {videos.map((video) => (
          <Box key={video.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea onClick={() => handleVideoClick(video)}>
                {/* Thumbnail with Play Overlay */}
                <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'black' }}>
                  <CardMedia
                    component="img"
                    image={video.thumbnail_url}
                    alt={video.title || 'Video thumbnail'}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  
                  {/* Play Icon Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <PlayCircle
                      sx={{
                        fontSize: 64,
                        color: 'white',
                        opacity: 0.9,
                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                      }}
                    />
                  </Box>

                  {/* Duration Badge */}
                  {video.duration && (
                    <Chip
                      label={videosService.formatDuration(video.duration)}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  {video.title && (
                    <Typography variant="subtitle1" gutterBottom noWrap>
                      {video.title}
                    </Typography>
                  )}
                  
                  {video.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 1,
                      }}
                    >
                      {video.description}
                    </Typography>
                  )}

                  {/* Stats */}
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                    <Tooltip title="Views">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {video.view_count}
                        </Typography>
                      </Box>
                    </Tooltip>
                    
                    <Tooltip title="Uploaded">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(video.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>

                  {/* File Info */}
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {videosService.formatFileSize(video.file_size)}
                      {video.width && video.height && ` • ${video.width}x${video.height}`}
                    </Typography>
                  </Box>

                  {/* Tagged Kids */}
                  {video.kids_tagged.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {video.kid?.name || 'Tagged'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>

              {/* Menu Button */}
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.8)',
                  },
                }}
                onClick={(e) => handleMenuOpen(e, video)}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {onEdit && (
          <MenuItem onClick={handleEdit}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        <MenuItem onClick={() => {/* TODO: Implement share */}}>
          <Share fontSize="small" sx={{ mr: 1 }} />
          Share
        </MenuItem>
        {onDelete && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>

      {/* Video Player Dialog */}
      <VideoPlayerDialog
        video={selectedVideo}
        open={playerOpen}
        onClose={handleClosePlayer}
      />
    </>
  );
}
