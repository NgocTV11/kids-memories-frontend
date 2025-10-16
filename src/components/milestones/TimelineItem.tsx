'use client';

import { Milestone } from '@/services/milestones.service';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Grid,
} from '@mui/material';
import {
  Edit,
  Delete,
  Photo,
} from '@mui/icons-material';
import dayjs from 'dayjs';

interface TimelineItemProps {
  milestone: Milestone;
  isLast: boolean;
  onEdit: (milestone: Milestone) => void;
  onDelete: (milestoneId: string) => void;
}

export function TimelineItem({ milestone, isLast, onEdit, onDelete }: TimelineItemProps) {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'first_word':
        return '#2196f3';
      case 'first_step':
        return '#4caf50';
      case 'birthday':
        return '#ff9800';
      case 'health':
        return '#f44336';
      case 'education':
        return '#9c27b0';
      case 'other':
      default:
        return '#757575';
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'first_word':
        return 'Lần đầu nói';
      case 'first_step':
        return 'Lần đầu đi';
      case 'birthday':
        return 'Sinh nhật';
      case 'health':
        return 'Sức khỏe';
      case 'education':
        return 'Giáo dục';
      case 'other':
      default:
        return 'Khác';
    }
  };

  return (
    <Box sx={{ position: 'relative', mb: isLast ? 0 : 4, ml: 6 }}>
      {/* Timeline Dot */}
      <Box
        sx={{
          position: 'absolute',
          left: -30,
          top: 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: getCategoryColor(milestone.category),
          border: '3px solid',
          borderColor: 'background.paper',
          boxShadow: 1,
        }}
      />

      {/* Content Card */}
      <Paper sx={{ p: 2, transition: 'all 0.2s', '&:hover': { boxShadow: 4 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {dayjs(milestone.milestone_date).format('DD/MM/YYYY')}
              </Typography>
              {milestone.category && (
                <Chip
                  label={getCategoryLabel(milestone.category)}
                  size="small"
                  sx={{
                    bgcolor: getCategoryColor(milestone.category),
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              )}
              {milestone.kid && (
                <Chip label={milestone.kid.name} size="small" variant="outlined" />
              )}
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {milestone.title}
            </Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={() => onEdit(milestone)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onDelete(milestone.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Description */}
        {milestone.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {milestone.description}
          </Typography>
        )}

        {/* Photos */}
        {milestone.photos && milestone.photos.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Photo fontSize="small" color="action" />
              <Typography variant="subtitle2">{milestone.photos.length} ảnh</Typography>
            </Box>
            <Grid container spacing={1}>
              {milestone.photos.slice(0, 4).map((photo) => (
                <Grid size={{ xs: 6, sm: 3 }} key={photo.id}>
                  <Box
                    sx={{
                      paddingTop: '100%',
                      position: 'relative',
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'grey.200',
                    }}
                  >
                    <img
                      src={photo.thumbnail_url || photo.file_url}
                      alt={photo.caption || 'Milestone photo'}
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
              {milestone.photos.length > 4 && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      paddingTop: '100%',
                      position: 'relative',
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'grey.300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      +{milestone.photos.length - 4}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        {/* Created by */}
        {milestone.user && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            Tạo bởi {milestone.user.display_name}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
