'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  FamilyRestroom,
  Add,
  PersonAdd,
  ExitToApp,
  Delete,
  Check,
  Close,
  People,
  ChildCare,
  PhotoAlbum,
} from '@mui/icons-material';
import { familiesService, Family, FamilyMember } from '@/services/families.service';
import { useAuthStore } from '@/store/auth.store';
import { InviteMemberModal } from '@/components/families/InviteMemberModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FamiliesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [families, setFamilies] = useState<Family[]>([]);
  const [invitations, setInvitations] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create Family Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [familyDescription, setFamilyDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Invite Member Modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [inviteUserId, setInviteUserId] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [familiesData, invitationsData] = await Promise.all([
        familiesService.getAll(),
        familiesService.getMyInvitations(),
      ]);

      console.log('Families data:', familiesData);
      console.log('Invitations data:', invitationsData);

      // Separate active families from pending invitations
      // Owner của family luôn được xem là active
      const activeFamilies = familiesData.filter((f: Family) => {
        // Nếu user là owner, luôn hiển thị
        if (f.owner?.id === user?.id) {
          return true;
        }
        
        // Nếu không phải owner, check status
        const userMembership = f.members?.find((m: FamilyMember) => m.user?.id === user?.id);
        return userMembership?.status === 'active';
      });

      const pendingInvites = invitationsData.filter((f: Family) => {
        const userMembership = f.members?.find((m: FamilyMember) => m.user?.id === user?.id);
        return userMembership?.status === 'pending';
      });

      console.log('Active families:', activeFamilies);
      console.log('Pending invites:', pendingInvites);

      setFamilies(activeFamilies);
      setInvitations(pendingInvites);
    } catch (err: any) {
      console.error('Load data error:', err);
      setError(err.message || 'Không thể tải danh sách families');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFamily = async () => {
    if (!familyName.trim()) {
      alert('Vui lòng nhập tên family');
      return;
    }

    try {
      setCreating(true);
      await familiesService.create({
        name: familyName,
        description: familyDescription,
      });
      setCreateModalOpen(false);
      setFamilyName('');
      setFamilyDescription('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Không thể tạo family');
    } finally {
      setCreating(false);
    }
  };

  const handleAcceptInvitation = async (familyId: string) => {
    try {
      await familiesService.acceptInvitation(familyId);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Không thể chấp nhận lời mời');
    }
  };

  const handleLeaveFamily = async (familyId: string, familyName: string) => {
    if (!confirm(`Bạn có chắc muốn rời khỏi family "${familyName}"?`)) {
      return;
    }

    try {
      await familiesService.leaveFamily(familyId);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Không thể rời family');
    }
  };

  const handleDeleteFamily = async (familyId: string, familyName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa family "${familyName}"? Hành động này không thể hoàn tác.`)) {
      return;
    }

    try {
      await familiesService.delete(familyId);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Không thể xóa family');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <FamilyRestroom fontSize="large" />
            <div>
              <Typography variant="h4" fontWeight="bold">
                Families
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Quản lý families và lời mời
              </Typography>
            </div>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateModalOpen(true)}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            Tạo Family
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label={`Families của tôi (${families.length})`} />
          <Tab label={`Lời mời (${invitations.length})`} />
        </Tabs>
      </Paper>

      {/* My Families Tab */}
      <TabPanel value={tabValue} index={0}>
        {families.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <FamilyRestroom sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Bạn chưa có family nào
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Tạo family để chia sẻ hồ sơ bé yêu, albums và kỷ niệm với người thân
            </Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => setCreateModalOpen(true)}>
              Tạo Family Đầu Tiên
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {families.map((family) => {
              const userMembership = family.members?.find((m) => m.user?.id === user?.id);
              const isOwner = family.owner?.id === user?.id;

              return (
                <Grid size={{ xs: 12, md: 6 }} key={family.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar
                          src={family.avatar_url || undefined}
                          sx={{ width: 56, height: 56, bgcolor: '#667eea' }}
                        >
                          <FamilyRestroom />
                        </Avatar>
                        <Box flexGrow={1}>
                          <Typography variant="h6" fontWeight="bold">
                            {family.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Chủ family: {family.owner?.display_name}
                          </Typography>
                        </Box>
                        {isOwner && <Chip label="Owner" color="primary" size="small" />}
                        {userMembership?.role === 'admin' && !isOwner && (
                          <Chip label="Admin" color="secondary" size="small" />
                        )}
                      </Box>

                      {family.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {family.description}
                        </Typography>
                      )}

                      <Box display="flex" gap={2} flexWrap="wrap">
                        <Chip
                          icon={<People />}
                          label={`${family._count?.members || 0} thành viên`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<ChildCare />}
                          label={`${family._count?.kids || 0} bé yêu`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<PhotoAlbum />}
                          label={`${family._count?.albums || 0} albums`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button size="small" onClick={() => router.push(`/families/${family.id}`)}>
                        Xem Chi Tiết
                      </Button>
                      {isOwner ? (
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setSelectedFamilyId(family.id);
                              setInviteModalOpen(true);
                            }}
                          >
                            <PersonAdd />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteFamily(family.id, family.name)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<ExitToApp />}
                          onClick={() => handleLeaveFamily(family.id, family.name)}
                        >
                          Rời Family
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </TabPanel>

      {/* Invitations Tab */}
      <TabPanel value={tabValue} index={1}>
        {invitations.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <PersonAdd sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Không có lời mời nào
            </Typography>
          </Paper>
        ) : (
          <List>
            {invitations.map((family) => (
              <Paper key={family.id} sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={family.avatar_url || undefined} sx={{ bgcolor: '#667eea' }}>
                      <FamilyRestroom />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={family.name}
                    secondary={`Lời mời từ ${family.owner?.display_name} (${family.owner?.email})`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      color="success"
                      onClick={() => handleAcceptInvitation(family.id)}
                      sx={{ mr: 1 }}
                    >
                      <Check />
                    </IconButton>
                    <IconButton edge="end" color="error">
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </TabPanel>

      {/* Create Family Modal */}
      <Dialog open={createModalOpen} onClose={() => !creating && setCreateModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo Family Mới</DialogTitle>
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
          <Button onClick={() => setCreateModalOpen(false)} disabled={creating}>
            Hủy
          </Button>
          <Button onClick={handleCreateFamily} variant="contained" disabled={creating || !familyName.trim()}>
            {creating ? <CircularProgress size={24} /> : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite Member Modal */}
      <InviteMemberModal
        open={inviteModalOpen}
        familyId={selectedFamilyId}
        onClose={() => setInviteModalOpen(false)}
        onSuccess={loadData}
      />
    </Container>
  );
}
