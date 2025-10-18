'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import {
  PlayCircle,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Close,
  Visibility,
  Favorite,
  Comment,
} from '@mui/icons-material';
import { Video, videosService } from '@/services/videos.service';

interface VideoPlayerProps {
  video: Video;
  autoPlay?: boolean;
  showMetadata?: boolean;
  onClose?: () => void;
}

export function VideoPlayer({ video, autoPlay = false, showMetadata = true, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  return (
    <Box>
      <Card sx={{ maxWidth: '100%', bgcolor: 'black' }}>
        {/* Video Element */}
        <Box sx={{ position: 'relative', bgcolor: 'black' }}>
          <video
            ref={videoRef}
            src={video.file_url}
            poster={video.thumbnail_url}
            autoPlay={autoPlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setPlaying(false)}
            style={{
              width: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
          />

          {/* Play/Pause Overlay */}
          {!playing && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
              onClick={handlePlayPause}
            >
              <PlayCircle sx={{ fontSize: 80, color: 'white', opacity: 0.9 }} />
            </Box>
          )}

          {/* Close Button */}
          {onClose && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
              }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          )}

          {/* Controls */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              p: 1,
            }}
          >
            {/* Progress Bar */}
            <Box
              sx={{
                height: 4,
                bgcolor: 'rgba(255,255,255,0.3)',
                borderRadius: 2,
                mb: 1,
                cursor: 'pointer',
              }}
              onClick={handleSeek}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${(currentTime / duration) * 100}%`,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  transition: 'width 0.1s',
                }}
              />
            </Box>

            {/* Control Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={handlePlayPause} sx={{ color: 'white' }}>
                  {playing ? <Pause /> : <PlayCircle />}
                </IconButton>
                <IconButton size="small" onClick={handleMuteToggle} sx={{ color: 'white' }}>
                  {muted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {videosService.formatDuration(currentTime)} / {videosService.formatDuration(duration)}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleFullscreen} sx={{ color: 'white' }}>
                <Fullscreen />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Metadata */}
        {showMetadata && (
          <CardContent>
            {video.title && (
              <Typography variant="h6" gutterBottom>
                {video.title}
              </Typography>
            )}
            
            {video.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {video.description}
              </Typography>
            )}

            {/* Stats */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Tooltip title="Views">
                <Chip icon={<Visibility />} label={video.view_count} size="small" />
              </Tooltip>
              <Tooltip title="Likes">
                <Chip icon={<Favorite />} label={video.likes_count} size="small" />
              </Tooltip>
              <Tooltip title="Comments">
                <Chip icon={<Comment />} label={video.comments_count} size="small" />
              </Tooltip>
            </Stack>

            {/* Video Info */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {video.duration && (
                <Typography variant="caption" color="text.secondary">
                  Duration: {videosService.formatDuration(video.duration)}
                </Typography>
              )}
              {video.width && video.height && (
                <Typography variant="caption" color="text.secondary">
                  Resolution: {video.width}x{video.height}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                Size: {videosService.formatFileSize(video.file_size)}
              </Typography>
              {video.codec && (
                <Typography variant="caption" color="text.secondary">
                  Codec: {video.codec}
                </Typography>
              )}
            </Box>

            {/* Tagged Kids */}
            {video.kids_tagged.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Tagged:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {video.kids_tagged.map((kidId) => {
                    const kid = video.kid;
                    return (
                      <Chip
                        key={kidId}
                        label={kid?.name || 'Unknown'}
                        size="small"
                        variant="outlined"
                      />
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Upload Info */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Uploaded {new Date(video.created_at).toLocaleDateString()}
              {video.user && ` by ${video.user.display_name}`}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
}

interface VideoPlayerDialogProps {
  video: Video | null;
  open: boolean;
  onClose: () => void;
}

export function VideoPlayerDialog({ video, open, onClose }: VideoPlayerDialogProps) {
  if (!video) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <VideoPlayer video={video} autoPlay showMetadata onClose={onClose} />
    </Dialog>
  );
}
