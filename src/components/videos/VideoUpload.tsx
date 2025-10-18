'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  LinearProgress,
  IconButton,
  Chip,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  VideoLibrary,
  PlayCircle,
} from '@mui/icons-material';
import { videosService, UploadVideoDto } from '@/services/videos.service';
import { Album } from '@/services/albums.service';
import { Kid } from '@/services/kids.service';
import { useI18nStore } from '@/store/i18n.store';

interface VideoUploadProps {
  open: boolean;
  albums: Album[];
  kids: Kid[];
  onClose: () => void;
  onSuccess: () => void;
}

interface FileWithPreview extends File {
  preview: string;
  duration?: number;
}

export function VideoUpload({ open, albums, kids, onClose, onSuccess }: VideoUploadProps) {
  const { photos: photosT } = useI18nStore(); // Reuse photos translations for now
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [albumId, setAlbumId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const videoFile = acceptedFiles[0];
      const preview = URL.createObjectURL(videoFile);
      
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const fileWithPreview = Object.assign(videoFile, {
          preview,
          duration: video.duration,
        }) as FileWithPreview;
        setFile(fileWithPreview);
      };
      video.src = preview;
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv'],
    },
    multiple: false,
    maxSize: 104857600, // 100MB
  });

  const handleRemoveFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a video file');
      return;
    }

    if (!albumId) {
      setError('Album is required');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      const data: UploadVideoDto = {
        title: title || undefined,
        description: description || undefined,
        albumId,
        kidId: selectedKids.length > 0 ? selectedKids[0] : undefined, // Backend accepts single kidId
      };

      await videosService.upload(file, data, (progress) => {
        setUploadProgress(progress);
      });

      // Clean up preview
      URL.revokeObjectURL(file.preview);

      onSuccess();
      handleReset();
    } catch (err: any) {
      console.error('Error uploading video:', err);
      setError(err.response?.data?.message || 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAlbumId('');
    setTitle('');
    setDescription('');
    setSelectedKids([]);
    setUploadProgress(0);
    setError(null);
  };

  const handleClose = () => {
    if (!uploading) {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      handleReset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideoLibrary />
          Upload Video
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Dropzone */}
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              mb: 3,
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            {isDragActive ? (
              <Typography>Drop video here...</Typography>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  Drag & Drop Video
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to select (Max 100MB)
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Supported: MP4, MOV, AVI, WebM, MKV
                </Typography>
              </>
            )}
          </Box>

          {/* Video Preview */}
          {file && (
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                  bgcolor: 'black',
                  maxHeight: 300,
                }}
              >
                <video
                  src={file.preview}
                  controls
                  style={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                  }}
                />
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
                  onClick={handleRemoveFile}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {file.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {videosService.formatFileSize(file.size)}
                </Typography>
                {file.duration && (
                  <Typography variant="body2" color="text.secondary">
                    {videosService.formatDuration(file.duration)}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* Form Fields */}
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Album</InputLabel>
            <Select
              value={albumId}
              label="Album"
              onChange={(e) => setAlbumId(e.target.value)}
              disabled={uploading}
            >
              {albums.map((album) => (
                <MenuItem key={album.id} value={album.id}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Title"
            placeholder="Enter video title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            placeholder="Enter video description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tag Kids</InputLabel>
              <Select
                multiple
                value={selectedKids}
                label="Tag Kids"
                onChange={(e) => setSelectedKids(e.target.value as string[])}
                disabled={uploading}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const kid = kids.find((k) => k.id === value);
                      return <Chip key={value} label={kid?.name} size="small" />;
                    })}
                  </Box>
                )}
                MenuProps={{
                  autoFocus: false,
                }}
              >
                {kids.map((kid) => (
                  <MenuItem key={kid.id} value={kid.id}>
                    <Checkbox checked={selectedKids.indexOf(kid.id) > -1} />
                    <ListItemText primary={kid.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Select which kids appear in this video
            </Typography>
          </Box>

          {/* Upload Progress */}
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing video...'}
                </Typography>
                <Typography variant="body2">{Math.round(uploadProgress)}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {uploadProgress < 100 
                  ? 'Uploading video to server...'
                  : 'Generating thumbnail and extracting metadata...'
                }
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={uploading || !file}
          startIcon={<CloudUpload />}
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
