'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { albumsService, Album, CreateAlbumDto, UpdateAlbumDto } from '@/services/albums.service';
import { Kid } from '@/services/kids.service';
import { useI18nStore } from '@/store/i18n.store';

interface AddAlbumModalProps {
  open: boolean;
  album?: Album;
  kids: Kid[];
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAlbumModal({ open, album, kids, onClose, onSuccess }: AddAlbumModalProps) {
  const isEdit = !!album;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { albums: albumsT } = useI18nStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    kid_id: '',
    privacy_level: 'private' as 'private' | 'family' | 'public',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (album) {
      setFormData({
        title: album.title,
        description: album.description || '',
        kid_id: album.kid_id || '',
        privacy_level: (album.privacy_level as 'private' | 'family' | 'public') || 'private',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        kid_id: '',
        privacy_level: 'private',
      });
    }
    setErrors({});
    setError(null);
  }, [album, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = albumsT.form.nameRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      if (isEdit) {
        const updateData: UpdateAlbumDto = {
          title: formData.title,
          description: formData.description || undefined,
          kid_id: formData.kid_id || undefined,
          privacy_level: formData.privacy_level,
        };
        await albumsService.update(album.id, updateData);
      } else {
        const createData: CreateAlbumDto = {
          title: formData.title,
          description: formData.description || undefined,
          kid_id: formData.kid_id || undefined,
          privacy_level: formData.privacy_level,
        };
        await albumsService.create(createData);
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error saving album:', err);
      setError(err.response?.data?.message || albumsT.createError);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEdit ? albumsT.editAlbumTitle : albumsT.createAlbumTitle}
        {isMobile && (
          <IconButton edge="end" onClick={onClose} disabled={loading}>
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label={albumsT.form.name}
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label={albumsT.form.description}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />

          <FormControl fullWidth sx={{ mb: 2 }} size={isMobile ? "small" : "medium"}>
            <InputLabel>{albumsT.form.selectKid}</InputLabel>
            <Select
              value={formData.kid_id}
              label={albumsT.form.selectKid}
              onChange={(e) => handleChange('kid_id', e.target.value)}
            >
              <MenuItem value="">{albumsT.form.noKid}</MenuItem>
              {kids.map((kid) => (
                <MenuItem key={kid.id} value={kid.id}>
                  {kid.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
            <InputLabel>{albumsT.form.privacy}</InputLabel>
            <Select
              value={formData.privacy_level}
              label={albumsT.form.privacy}
              onChange={(e) => handleChange('privacy_level', e.target.value)}
            >
              <MenuItem value="private">{albumsT.form.privacyOptions.private}</MenuItem>
              <MenuItem value="family">{albumsT.form.privacyOptions.family}</MenuItem>
              <MenuItem value="public">{albumsT.form.privacyOptions.public}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 1.5 } }}>
        <Button onClick={onClose} disabled={loading} size={isMobile ? "medium" : "large"}>
          {albumsT.cancel}
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          size={isMobile ? "medium" : "large"}
        >
          {loading ? albumsT.form.saving : isEdit ? albumsT.form.updating : albumsT.form.creating}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
