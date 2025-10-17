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
  Typography,
  Chip,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close, Photo } from '@mui/icons-material';
import {
  milestonesService,
  Milestone,
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from '@/services/milestones.service';
import { Kid } from '@/services/kids.service';
import { photosService, Photo as PhotoType } from '@/services/photos.service';
import { useI18nStore } from '@/store/i18n.store';
import dayjs from 'dayjs';

interface AddMilestoneModalProps {
  open: boolean;
  milestone?: Milestone;
  kids: Kid[];
  onClose: () => void;
  onSuccess: () => void;
}

export function AddMilestoneModal({ open, milestone, kids, onClose, onSuccess }: AddMilestoneModalProps) {
  const isEdit = !!milestone;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { milestones: milestonesT } = useI18nStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    milestone_date: '',
    category: 'other',
    kid_id: '',
  });

  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [availablePhotos, setAvailablePhotos] = useState<PhotoType[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (milestone) {
      const kidId = milestone.kid_id || '';
      setFormData({
        title: milestone.title,
        description: milestone.description || '',
        milestone_date: dayjs(milestone.milestone_date).format('YYYY-MM-DD'),
        category: milestone.category || 'other',
        kid_id: kidId,
      });
      setSelectedPhotoIds(milestone.photos?.map((p) => p.id) || []);
      
      // Load photos for the selected kid
      if (kidId) {
        loadPhotos(kidId);
      }
    } else {
      setFormData({
        title: '',
        description: '',
        milestone_date: dayjs().format('YYYY-MM-DD'),
        category: 'other',
        kid_id: '',
      });
      setSelectedPhotoIds([]);
      setAvailablePhotos([]);
    }
    setErrors({});
    setError(null);
  }, [milestone, open]);

  const loadPhotos = async (kidId?: string) => {
    try {
      setLoadingPhotos(true);
      const data = await photosService.getAll(undefined, kidId, 50, 0);
      setAvailablePhotos(data.data);
    } catch (err: any) {
      console.error('Error loading photos:', err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const handleKidChange = (kidId: string) => {
    setFormData({ ...formData, kid_id: kidId });
    if (kidId) {
      loadPhotos(kidId);
    } else {
      setAvailablePhotos([]);
    }
  };

  const handlePhotoToggle = (photoId: string) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = milestonesT.form.titleRequired;
    }

    if (!formData.milestone_date) {
      newErrors.milestone_date = milestonesT.form.dateRequired;
    }

    if (!formData.kid_id) {
      newErrors.kid_id = milestonesT.form.selectKidRequired;
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
        const updateData: UpdateMilestoneDto = {
          title: formData.title,
          description: formData.description || undefined,
          milestone_date: formData.milestone_date,
        };
        if (formData.category) updateData.category = formData.category;
        if (formData.kid_id) updateData.kid_id = formData.kid_id;
        
        await milestonesService.update(milestone.id, updateData);

        // Update photo attachments
        const currentPhotoIds = milestone.photos?.map((p) => p.id) || [];
        const toAdd = selectedPhotoIds.filter((id) => !currentPhotoIds.includes(id));
        const toRemove = currentPhotoIds.filter((id) => !selectedPhotoIds.includes(id));

        if (toAdd.length > 0) {
          await milestonesService.attachPhotos(milestone.id, toAdd);
        }
        if (toRemove.length > 0) {
          await milestonesService.detachPhotos(milestone.id, toRemove);
        }
      } else {
        const createData: CreateMilestoneDto = {
          kid_id: formData.kid_id || '',
          title: formData.title,
          description: formData.description || undefined,
          milestone_date: formData.milestone_date,
          category: formData.category || 'other',
          photo_ids: selectedPhotoIds.length > 0 ? selectedPhotoIds : undefined,
        };
        console.log('Creating milestone with data:', createData);
        await milestonesService.create(createData);
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error saving milestone:', err);
      console.error('Error response:', err.response?.data);
      if (err.response?.data?.message && Array.isArray(err.response.data.message)) {
        setError(err.response.data.message.join(', '));
      } else {
        setError(err.response?.data?.message || milestonesT.createError);
      }
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

  // Generate category options from translations
  const MILESTONE_CATEGORIES = [
    { value: 'first_word', label: milestonesT.categoryOptions.first_word },
    { value: 'first_step', label: milestonesT.categoryOptions.first_step },
    { value: 'birthday', label: milestonesT.categoryOptions.birthday },
    { value: 'health', label: milestonesT.categoryOptions.health },
    { value: 'education', label: milestonesT.categoryOptions.education },
    { value: 'other', label: milestonesT.categoryOptions.other },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEdit ? milestonesT.editMilestoneTitle : milestonesT.addMilestoneTitle}
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
            label="Tiêu đề"
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
            label="Mô tả"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />

          <TextField
            fullWidth
            type="date"
            label="Ngày milestone"
            value={formData.milestone_date}
            onChange={(e) => handleChange('milestone_date', e.target.value)}
            error={!!errors.milestone_date}
            helperText={errors.milestone_date}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            required
          />

          <FormControl fullWidth sx={{ mb: 2 }} size={isMobile ? "small" : "medium"}>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={formData.category}
              label="Danh mục"
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {MILESTONE_CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.kid_id} required size={isMobile ? "small" : "medium"}>
            <InputLabel>Chọn bé</InputLabel>
            <Select
              value={formData.kid_id}
              label="Chọn bé"
              onChange={(e) => handleKidChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn một bé</em>
              </MenuItem>
              {kids.map((kid) => (
                <MenuItem key={kid.id} value={kid.id}>
                  {kid.name}
                </MenuItem>
              ))}
            </Select>
            {errors.kid_id && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {errors.kid_id}
              </Typography>
            )}
          </FormControl>

          {/* Photo Picker */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                Ảnh đính kèm ({selectedPhotoIds.length})
              </Typography>
              {formData.kid_id && (
                <Button
                  size="small"
                  onClick={() => {
                    setShowPhotoPicker(!showPhotoPicker);
                    if (!showPhotoPicker && availablePhotos.length === 0) {
                      loadPhotos(formData.kid_id);
                    }
                  }}
                >
                  {showPhotoPicker ? 'Đóng' : 'Chọn ảnh'}
                </Button>
              )}
            </Box>

            {showPhotoPicker && (
              <Box
                sx={{
                  maxHeight: { xs: 250, sm: 300 },
                  overflow: 'auto',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {loadingPhotos ? (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    Đang tải ảnh...
                  </Typography>
                ) : availablePhotos.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    Không có ảnh nào
                  </Typography>
                ) : (
                  <Grid container spacing={1}>
                    {availablePhotos.map((photo) => (
                      <Grid size={{ xs: 4, sm: 3 }} key={photo.id}>
                        <Box
                          onClick={() => handlePhotoToggle(photo.id)}
                          sx={{
                            paddingTop: '100%',
                            position: 'relative',
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: 2,
                            borderColor: selectedPhotoIds.includes(photo.id)
                              ? 'primary.main'
                              : 'transparent',
                          }}
                        >
                          <img
                            src={photo.thumbnail_url || photo.file_url}
                            alt={photo.caption || 'Photo'}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}
          </Box>
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
