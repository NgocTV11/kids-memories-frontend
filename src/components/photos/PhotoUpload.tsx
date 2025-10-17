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
  Grid,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Image as ImageIcon,
} from '@mui/icons-material';
import { photosService, UploadPhotoDto } from '@/services/photos.service';
import { Album } from '@/services/albums.service';
import { Kid } from '@/services/kids.service';
import { useI18nStore } from '@/store/i18n.store';

interface PhotoUploadProps {
  open: boolean;
  albums: Album[];
  kids: Kid[];
  onClose: () => void;
  onSuccess: () => void;
}

interface FileWithPreview extends File {
  preview: string;
}

export function PhotoUpload({ open, albums, kids, onClose, onSuccess }: PhotoUploadProps) {
  const { photos: photosT } = useI18nStore();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [albumId, setAlbumId] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [dateTaken, setDateTaken] = useState<string>('');
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as FileWithPreview[];
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: true,
    maxSize: 10485760, // 10MB
  });

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError(photosT.form.selectAtLeastOne);
      return;
    }

    if (!albumId) {
      setError(photosT.form.albumRequired);
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      const totalFiles = files.length;
      let uploaded = 0;

      for (const file of files) {
        const data: UploadPhotoDto = {
          caption: caption || undefined,
          date_taken: dateTaken || undefined,
          kids_tagged: selectedKids.length > 0 ? selectedKids : undefined,
        };

        await photosService.upload(albumId, file, data);
        uploaded++;
        setUploadProgress((uploaded / totalFiles) * 100);
      }

      // Clean up previews
      files.forEach((file) => URL.revokeObjectURL(file.preview));

      onSuccess();
      handleReset();
    } catch (err: any) {
      console.error('Error uploading photos:', err);
      setError(err.response?.data?.message || 'Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setAlbumId('');
    setCaption('');
    setDateTaken('');
    setSelectedKids([]);
    setUploadProgress(0);
    setError(null);
  };

  const handleClose = () => {
    if (!uploading) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      handleReset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{photosT.uploadTitle}</DialogTitle>
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
              <Typography>{photosT.dropHere}</Typography>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  {photosT.dragAndDrop}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {photosT.orClickToSelect}
                </Typography>
              </>
            )}
          </Box>

          {/* Preview Images */}
          {files.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                {files.length} {photosT.photosSelected}
              </Typography>
              <Grid container spacing={2}>
                {files.map((file, index) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        borderRadius: 1,
                        overflow: 'hidden',
                        bgcolor: 'grey.200',
                      }}
                    >
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.8)',
                          },
                        }}
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Form Fields */}
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>{photosT.form.album}</InputLabel>
            <Select
              value={albumId}
              label={photosT.form.album}
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
            label={photosT.form.caption}
            placeholder={photosT.form.captionPlaceholder}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={uploading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="datetime-local"
            label={photosT.form.dateTaken}
            value={dateTaken}
            onChange={(e) => setDateTaken(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={uploading}
            helperText={photosT.form.dateTakenHelper}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>{photosT.form.tagKids}</InputLabel>
              <Select
                multiple
                value={selectedKids}
                label={photosT.form.tagKids}
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
              {photosT.form.tagKidsHelper}
            </Typography>
          </Box>

          {/* Upload Progress */}
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{photosT.form.uploading}</Typography>
                <Typography variant="body2">{Math.round(uploadProgress)}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          {photosT.cancel}
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={uploading || files.length === 0}
          startIcon={<CloudUpload />}
        >
          {uploading ? photosT.uploading : photosT.form.uploadCount.replace('{count}', files.length.toString())}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
