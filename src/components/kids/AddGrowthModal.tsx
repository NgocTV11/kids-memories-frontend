'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { kidsService, AddGrowthDataDto } from '@/services/kids.service';
import dayjs from 'dayjs';

interface AddGrowthModalProps {
  open: boolean;
  kidId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddGrowthModal({ open, kidId, onClose, onSuccess }: AddGrowthModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState<AddGrowthDataDto>({
    date: dayjs().format('YYYY-MM-DD'),
    height: 0,
    weight: 0,
    note: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Ngày đo là bắt buộc';
    } else {
      const measureDate = dayjs(formData.date);
      if (measureDate.isAfter(dayjs())) {
        newErrors.date = 'Ngày đo không thể trong tương lai';
      }
    }

    if (!formData.height || formData.height <= 0) {
      newErrors.height = 'Chiều cao phải lớn hơn 0';
    } else if (formData.height > 300) {
      newErrors.height = 'Chiều cao không hợp lệ';
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Cân nặng phải lớn hơn 0';
    } else if (formData.weight > 200) {
      newErrors.weight = 'Cân nặng không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      await kidsService.addGrowthData(kidId, formData);
      onSuccess();
      
      // Reset form
      setFormData({
        date: dayjs().format('YYYY-MM-DD'),
        height: 0,
        weight: 0,
        note: '',
      });
    } catch (err: any) {
      console.error('Error adding growth data:', err);
      setError(err.response?.data?.message || 'Failed to add growth data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AddGrowthDataDto, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleClose = () => {
    setFormData({
      date: dayjs().format('YYYY-MM-DD'),
      height: 0,
      weight: 0,
      note: '',
    });
    setErrors({});
    setError(null);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Thêm dữ liệu phát triển
        {isMobile && (
          <IconButton edge="end" onClick={handleClose} disabled={loading}>
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
            type="date"
            label="Ngày đo"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Chiều cao (cm)"
            value={formData.height || ''}
            onChange={(e) => handleChange('height', parseFloat(e.target.value))}
            error={!!errors.height}
            helperText={errors.height}
            inputProps={{ step: 0.1, min: 0, max: 300 }}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Cân nặng (kg)"
            value={formData.weight || ''}
            onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
            error={!!errors.weight}
            helperText={errors.weight}
            inputProps={{ step: 0.1, min: 0, max: 200 }}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ghi chú"
            value={formData.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Ghi chú về sự phát triển..."
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 1.5 } }}>
        <Button onClick={handleClose} disabled={loading} size={isMobile ? "medium" : "large"}>
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          size={isMobile ? "medium" : "large"}
        >
          {loading ? 'Đang lưu...' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
