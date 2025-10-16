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
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { ContentCopy, Link as LinkIcon } from '@mui/icons-material';
import { albumsService, Album, ShareAlbumDto } from '@/services/albums.service';
import dayjs from 'dayjs';

interface ShareAlbumDialogProps {
  open: boolean;
  album: Album;
  onClose: () => void;
}

export function ShareAlbumDialog({ open, album, onClose }: ShareAlbumDialogProps) {
  const [formData, setFormData] = useState<ShareAlbumDto>({
    password: '',
    expires_at: '',
  });

  const [sharedLink, setSharedLink] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const data: ShareAlbumDto = {
        password: formData.password || undefined,
        expires_at: formData.expires_at || undefined,
      };

      const result = await albumsService.share(album.id, data);
      const link = `${window.location.origin}/albums/shared/${result.share_token}`;
      setSharedLink(link);
      setSuccess('Album đã được chia sẻ thành công!');
    } catch (err: any) {
      console.error('Error sharing album:', err);
      setError(err.response?.data?.message || 'Failed to share album');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveShare = async () => {
    if (!confirm('Bạn có chắc muốn dừng chia sẻ album này?')) return;

    try {
      setLoading(true);
      setError(null);

      await albumsService.removeShare(album.id);
      setSharedLink('');
      setFormData({ password: '', expires_at: '' });
      setSuccess('Đã dừng chia sẻ album');
    } catch (err: any) {
      console.error('Error removing share:', err);
      setError(err.response?.data?.message || 'Failed to remove share');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedLink);
    setSuccess('Đã sao chép link!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleClose = () => {
    setSharedLink('');
    setFormData({ password: '', expires_at: '' });
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chia sẻ album: {album.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {sharedLink ? (
            /* Shared Link Display */
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Link chia sẻ:
              </Typography>
              <TextField
                fullWidth
                value={sharedLink}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopyLink} edge="end">
                        <ContentCopy />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleRemoveShare}
                disabled={loading}
              >
                Dừng chia sẻ
              </Button>
            </Box>
          ) : (
            /* Share Form */
            <Box>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu (tùy chọn)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                helperText="Để trống nếu không cần mật khẩu"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="datetime-local"
                label="Ngày hết hạn (tùy chọn)"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: dayjs().format('YYYY-MM-DDTHH:mm'),
                }}
                helperText="Để trống nếu không muốn đặt thời hạn"
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                startIcon={<LinkIcon />}
                onClick={handleShare}
                disabled={loading}
              >
                {loading ? 'Đang tạo link...' : 'Tạo link chia sẻ'}
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
