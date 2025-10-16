'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  FamilyRestroom,
  Edit,
  PersonAdd,
  ExitToApp,
  Delete,
  ChildCare,
  PhotoAlbum,
  Person,
  RemoveCircle,
} from '@mui/icons-material';
import { useAuthStore } from '@/store/auth.store';
import { familiesService } from '@/services/families.service';
import type { Family, FamilyMember } from '@/services/families.service';
import { use } from 'react';

export default function FamilyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [familyDescription, setFamilyDescription] = useState('');
  const [updating, setUpdating] = useState(false);

  // Invite Modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteUserId, setInviteUserId] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadFamily();
  }, [id, user, router]);

  const loadFamily = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await familiesService.getById(id);
      setFamily(data);
      setFamilyName(data.name);
      setFamilyDescription(data.description || '');
    } catch (err: any) {
      setError(err.message || 'Không thể tải thông tin family');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFamily = async () => {
    if (!familyName.trim()) {
      alert('Vui lòng nhập tên family');
      return;
    }

    try {
      setUpdating(true);
      await familiesService.update(id, {
        name: familyName,
        description: familyDescription,
      });
      setEditModalOpen(false);
      loadFamily();
    } catch (err: any) {
      alert(err.message || 'Không thể cập nhật family');
    } finally {
      setUpdating(false);
    }
  };

  const handleInviteMember = async () => {
    if (!inviteUserId.trim()) {
      alert('Vui lòng nhập User ID');
      return;
    }

    try {
      setInviting(true);
      await familiesService.inviteMember(id, {
        user_id: inviteUserId,
        role: inviteRole,
      });
      setInviteModalOpen(false);
      setInviteUserId('');
      setInviteRole('member');
      loadFamily();
      alert('Đã gửi lời mời thành công!');
    } catch (err: any) {
      alert(err.message || 'Không thể gửi lời mời');
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa ${memberName} khỏi family?`)) {
      return;
    }

    try {
      await familiesService.removeMember(id, memberId);
      loadFamily();
    } catch (err: any) {
      alert(err.message || 'Không thể xóa thành viên');
    }
  };

  const handleLeaveFamily = async () => {
    if (!confirm('Bạn có chắc muốn rời khỏi family này?')) {
      return;
    }

    try {
      await familiesService.leaveFamily(id);
      router.push('/families');
    } catch (err: any) {
      alert(err.message || 'Không thể rời family');
    }
  };

  const handleDeleteFamily = async () => {
    if (!confirm(`Bạn có chắc muốn xóa family "${family?.name}"? Hành động này không thể hoàn tác.`)) {
      return;
    }

    try {
      await familiesService.delete(id);
      router.push('/families');
    } catch (err: any) {
      alert(err.message || 'Không thể xóa family');
    }
  };

  const isOwner = family?.owner_id === user?.id;
  const userMembership = family?.members?.find((m: FamilyMember) => m.user?.id === user?.id);
  const isAdmin = userMembership?.role === 'admin';
  const canManage = isOwner || isAdmin;

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !family) {
    return (
      <Container sx={{ pt: 3 }}>
        <Alert severity="error">{error || 'Không tìm thấy family'}</Alert>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => router.push('/families')}>
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 3, pb: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" gap={3} alignItems="center">
            <Avatar
              src={family.avatar_url || undefined}
              sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.3)' }}
            >
              <FamilyRestroom sx={{ fontSize: 50 }} />
            </Avatar>
            <div>
              <Typography variant="h4" fontWeight="bold">
                {family.name}
              </Typography>
              {family.description && (
                <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                  {family.description}
                </Typography>
              )}
              <Box display="flex" gap={1} mt={2}>
                <Chip
                  label={`${family.members?.length || 0} thành viên`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  label={`${family._count?.kids || 0} bé yêu`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  label={`${family._count?.albums || 0} albums`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </div>
          </Box>

          <Box display="flex" gap={1}>
            {canManage && (
              <>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setEditModalOpen(true)}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                >
                  Sửa
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setInviteModalOpen(true)}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                >
                  Mời
                </Button>
              </>
            )}
            {!isOwner && (
              <Button
                variant="contained"
                startIcon={<ExitToApp />}
                onClick={handleLeaveFamily}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
              >
                Rời
              </Button>
            )}
            {isOwner && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={handleDeleteFamily}
              >
                Xóa Family
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Members List */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Thành Viên
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Người dùng</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Vai trò</TableCell>
                    {canManage && <TableCell align="right">Hành động</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {family.members?.map((member: FamilyMember) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={member.user?.avatar_url || undefined} sx={{ width: 32, height: 32 }}>
                            <Person />
                          </Avatar>
                          <Typography>{member.user?.display_name || 'Unknown'}</Typography>
                          {member.user?.id === family.owner_id && (
                            <Chip label="Chủ" size="small" color="primary" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{member.user?.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={member.role === 'owner' ? 'Chủ' : member.role === 'admin' ? 'Quản trị' : 'Thành viên'}
                          size="small"
                          color={member.role === 'owner' ? 'primary' : member.role === 'admin' ? 'secondary' : 'default'}
                        />
                      </TableCell>
                      {canManage && (
                        <TableCell align="right">
                          {member.user?.id !== family.owner_id && member.user?.id !== user?.id && (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveMember(member.id, member.user?.display_name || 'User')}
                            >
                              <RemoveCircle />
                            </IconButton>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Family Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Thông Tin Chủ
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={family.owner?.avatar_url || undefined} sx={{ width: 50, height: 50 }}>
                <Person />
              </Avatar>
              <div>
                <Typography fontWeight="bold">{family.owner?.display_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {family.owner?.email}
                </Typography>
              </div>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Thống Kê
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <Person color="primary" />
                  <Typography>Thành viên</Typography>
                </Box>
                <Typography fontWeight="bold">{family.members?.length || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <ChildCare color="secondary" />
                  <Typography>Bé yêu</Typography>
                </Box>
                <Typography fontWeight="bold">{family._count?.kids || 0}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <PhotoAlbum color="success" />
                  <Typography>Albums</Typography>
                </Box>
                <Typography fontWeight="bold">{family._count?.albums || 0}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Family Modal */}
      <Dialog open={editModalOpen} onClose={() => !updating && setEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Sửa Thông Tin Family</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên Family"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Mô tả"
            value={familyDescription}
            onChange={(e) => setFamilyDescription(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} disabled={updating}>
            Hủy
          </Button>
          <Button onClick={handleUpdateFamily} variant="contained" disabled={updating}>
            {updating ? <CircularProgress size={24} /> : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite Member Modal */}
      <Dialog open={inviteModalOpen} onClose={() => !inviting && setInviteModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Mời Thành Viên</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="User ID"
            value={inviteUserId}
            onChange={(e) => setInviteUserId(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            required
            helperText="Nhập ID của người dùng bạn muốn mời"
          />
          <FormControl fullWidth>
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={inviteRole}
              label="Vai trò"
              onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member')}
            >
              <MenuItem value="member">Thành viên</MenuItem>
              <MenuItem value="admin">Quản trị viên</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteModalOpen(false)} disabled={inviting}>
            Hủy
          </Button>
          <Button onClick={handleInviteMember} variant="contained" disabled={inviting}>
            {inviting ? <CircularProgress size={24} /> : 'Gửi lời mời'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
