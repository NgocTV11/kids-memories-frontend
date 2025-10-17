'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
  Avatar,
  Typography,
  Stack,
} from '@mui/material';
import { Close, PhotoCamera, Delete } from '@mui/icons-material';
import { kidsService, Kid, CreateKidDto, UpdateKidDto } from '@/services/kids.service';
import dayjs from 'dayjs';

interface AddKidModalProps {
  open: boolean;
  kid?: Kid;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddKidModal({ open, kid, onClose, onSuccess }: AddKidModalProps) {
  const isEdit = !!kid;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as 'male' | 'female' | 'other',
    date_of_birth: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Avatar upload states
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [deleteAvatar, setDeleteAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (kid) {
      setFormData({
        name: kid.name,
        gender: kid.gender as 'male' | 'female' | 'other',
        date_of_birth: dayjs(kid.date_of_birth).format('YYYY-MM-DD'),
      });
      setAvatarPreview(kid.profile_picture || null);
    } else {
      setFormData({
        name: '',
        gender: 'male',
        date_of_birth: '',
      });
      setAvatarPreview(null);
    }
    setErrors({});
    setError(null);
    setAvatarFile(null);
    setDeleteAvatar(false);
  }, [kid, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên bé là bắt buộc';
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Ngày sinh là bắt buộc';
    } else {
      const birthDate = dayjs(formData.date_of_birth);
      if (birthDate.isAfter(dayjs())) {
        newErrors.date_of_birth = 'Ngày sinh không thể trong tương lai';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    setAvatarFile(file);
    setDeleteAvatar(false);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarPreview(kid?.profile_picture || null);
    if (isEdit && kid?.profile_picture) {
      setDeleteAvatar(true);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      let savedKid: Kid;

      if (isEdit) {
        const updateData: UpdateKidDto = {
          name: formData.name,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
        };
        savedKid = await kidsService.update(kid.id, updateData);
      } else {
        const createData: CreateKidDto = {
          name: formData.name,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
        };
        savedKid = await kidsService.create(createData);
      }

      // Handle avatar upload/delete after kid is saved
      if (avatarFile) {
        setUploadingAvatar(true);
        await kidsService.uploadAvatar(savedKid.id, avatarFile);
      } else if (deleteAvatar && isEdit) {
        // If user removed avatar, we could add a delete endpoint
        // For now, just upload an empty/default avatar or skip
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error saving kid:', err);
      setError(err.response?.data?.message || 'Failed to save kid');
    } finally {
      setLoading(false);
      setUploadingAvatar(false);
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
        {isEdit ? 'Chỉnh sửa thông tin bé' : 'Thêm bé mới'}
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

          {/* Avatar Upload Section */}
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              src={avatarPreview || undefined}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: '2px solid',
                borderColor: 'divider',
              }}
            />
            <Stack direction="row" spacing={1}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                style={{ display: 'none' }}
              />
              <Button
                size="small"
                variant="outlined"
                startIcon={<PhotoCamera />}
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || uploadingAvatar}
              >
                {avatarPreview ? 'Đổi ảnh' : 'Thêm ảnh'}
              </Button>
              {avatarPreview && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleAvatarRemove}
                  disabled={loading || uploadingAvatar}
                >
                  Xóa ảnh
                </Button>
              )}
            </Stack>
            {uploadingAvatar && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Đang tải ảnh lên...
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            label="Tên bé"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <TextField
            fullWidth
            type="date"
            label="Ngày sinh"
            value={formData.date_of_birth}
            onChange={(e) => handleChange('date_of_birth', e.target.value)}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Giới tính</FormLabel>
            <RadioGroup
              row={!isMobile}
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Bé trai" />
              <FormControlLabel value="female" control={<Radio />} label="Bé gái" />
              <FormControlLabel value="other" control={<Radio />} label="Khác" />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 1.5 } }}>
        <Button onClick={onClose} disabled={loading} size={isMobile ? "medium" : "large"}>
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          size={isMobile ? "medium" : "large"}
        >
          {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
