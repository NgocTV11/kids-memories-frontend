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
} from '@mui/material';
import { albumsService, Album, CreateAlbumDto, UpdateAlbumDto } from '@/services/albums.service';
import { Kid } from '@/services/kids.service';

interface AddAlbumModalProps {
  open: boolean;
  album?: Album;
  kids: Kid[];
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAlbumModal({ open, album, kids, onClose, onSuccess }: AddAlbumModalProps) {
  const isEdit = !!album;

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
      newErrors.title = 'Tên album là bắt buộc';
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
      setError(err.response?.data?.message || 'Failed to save album');
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Chỉnh sửa album' : 'Tạo album mới'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Tên album"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Mô tả"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Chọn bé (tùy chọn)</InputLabel>
            <Select
              value={formData.kid_id}
              label="Chọn bé (tùy chọn)"
              onChange={(e) => handleChange('kid_id', e.target.value)}
            >
              <MenuItem value="">Không chọn</MenuItem>
              {kids.map((kid) => (
                <MenuItem key={kid.id} value={kid.id}>
                  {kid.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Mức độ riêng tư</InputLabel>
            <Select
              value={formData.privacy_level}
              label="Mức độ riêng tư"
              onChange={(e) => handleChange('privacy_level', e.target.value)}
            >
              <MenuItem value="private">🔒 Riêng tư (chỉ mình tôi)</MenuItem>
              <MenuItem value="family">👨‍👩‍👧‍👦 Gia đình</MenuItem>
              <MenuItem value="public">🌍 Công khai</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Tạo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
