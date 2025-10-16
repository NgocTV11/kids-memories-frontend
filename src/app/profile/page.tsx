'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountCircle,
  PhotoCamera,
  Edit,
  Save,
  Cancel,
  Lock,
  Email,
  Language as LanguageIcon,
  Person,
} from '@mui/icons-material';
import { useAuthStore } from '@/store/auth.store';
import { usersService, UpdateProfileDto, ChangePasswordDto } from '@/services/users.service';
import dayjs from 'dayjs';

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Profile form
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState('vi');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Change password modal
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState<ChangePasswordDto>({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Initialize form with user data
    setDisplayName(user.display_name || '');
    setLanguage(user.language || 'vi');
    setAvatarPreview(user.avatar_url);
  }, [user, router]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước ảnh tối đa 5MB');
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let avatarUrl = user?.avatar_url;

      // Upload avatar if changed
      if (avatarFile) {
        const uploadResult = await usersService.uploadAvatar(avatarFile);
        avatarUrl = uploadResult.url;
      }

      // Update profile
      const updateData: UpdateProfileDto = {
        display_name: displayName,
        language: language,
        avatar_url: avatarUrl || undefined,
      };

      const updatedUser = await usersService.updateProfile(updateData);
      
      // Update auth store
      setUser(updatedUser);
      
      setSuccess('Cập nhật thông tin thành công!');
      setEditMode(false);
      setAvatarFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setDisplayName(user?.display_name || '');
    setLanguage(user?.language || 'vi');
    setAvatarPreview(user?.avatar_url || null);
    setAvatarFile(null);
    setError(null);
  };

  const validatePasswordForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!passwordForm.current_password) {
      errors.current_password = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!passwordForm.new_password) {
      errors.new_password = 'Vui lòng nhập mật khẩu mới';
    } else if (passwordForm.new_password.length < 6) {
      errors.new_password = 'Mật khẩu tối thiểu 6 ký tự';
    }

    if (!passwordForm.confirm_password) {
      errors.confirm_password = 'Vui lòng xác nhận mật khẩu mới';
    } else if (passwordForm.new_password !== passwordForm.confirm_password) {
      errors.confirm_password = 'Mật khẩu xác nhận không khớp';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    try {
      setLoading(true);
      setError(null);
      
      await usersService.changePassword(passwordForm);
      
      setSuccess('Đổi mật khẩu thành công!');
      setPasswordModalOpen(false);
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      setPasswordErrors({});
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 3 }, pb: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <AccountCircle sx={{ fontSize: { xs: 48, md: 64 } }} />
          <Box>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
              Thông Tin Cá Nhân
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Quản lý thông tin tài khoản của bạn
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Avatar Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  src={avatarPreview || undefined}
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <AccountCircle sx={{ fontSize: { xs: 80, md: 100 } }} />
                </Avatar>
                {editMode && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                    component="label"
                  >
                    <PhotoCamera />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {user.display_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tham gia: {dayjs(user.created_at).format('DD/MM/YYYY')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Thông Tin Tài Khoản
                </Typography>
                {!editMode ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                    size={isMobile ? "small" : "medium"}
                  >
                    Chỉnh Sửa
                  </Button>
                ) : (
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancelEdit}
                      disabled={loading}
                      size={isMobile ? "small" : "medium"}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                      onClick={handleSaveProfile}
                      disabled={loading}
                      size={isMobile ? "small" : "medium"}
                    >
                      Lưu
                    </Button>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Tên hiển thị"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user.email}
                    disabled
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    helperText="Email không thể thay đổi"
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth disabled={!editMode} size={isMobile ? "small" : "medium"}>
                    <InputLabel>Ngôn ngữ</InputLabel>
                    <Select
                      value={language}
                      label="Ngôn ngữ"
                      onChange={(e) => setLanguage(e.target.value)}
                      startAdornment={<LanguageIcon sx={{ mr: 1, color: 'action.active' }} />}
                    >
                      <MenuItem value="vi">🇻🇳 Tiếng Việt</MenuItem>
                      <MenuItem value="en">🇬🇧 English</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Bảo mật
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Lock />}
                  onClick={() => setPasswordModalOpen(true)}
                  fullWidth={isMobile}
                  size={isMobile ? "small" : "medium"}
                >
                  Đổi Mật Khẩu
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Modal */}
      <Dialog 
        open={passwordModalOpen} 
        onClose={() => !loading && setPasswordModalOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Đổi Mật Khẩu
          {isMobile && (
            <IconButton edge="end" onClick={() => setPasswordModalOpen(false)} disabled={loading}>
              <Cancel />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu hiện tại"
              value={passwordForm.current_password}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current_password: e.target.value })
              }
              error={!!passwordErrors.current_password}
              helperText={passwordErrors.current_password}
              sx={{ mb: 2 }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              type="password"
              label="Mật khẩu mới"
              value={passwordForm.new_password}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, new_password: e.target.value })
              }
              error={!!passwordErrors.new_password}
              helperText={passwordErrors.new_password}
              sx={{ mb: 2 }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              type="password"
              label="Xác nhận mật khẩu mới"
              value={passwordForm.confirm_password}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirm_password: e.target.value })
              }
              error={!!passwordErrors.confirm_password}
              helperText={passwordErrors.confirm_password}
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 1.5 } }}>
          <Button 
            onClick={() => setPasswordModalOpen(false)} 
            disabled={loading}
            size={isMobile ? "medium" : "large"}
          >
            Hủy
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
            size={isMobile ? "medium" : "large"}
          >
            Đổi Mật Khẩu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
