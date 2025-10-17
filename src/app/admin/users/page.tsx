'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18nStore } from '@/store/i18n.store';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  MoreVert,
  Search,
  Edit,
  Delete,
  AdminPanelSettings,
  Person,
  FamilyRestroom,
} from '@mui/icons-material';
import { adminService, AdminUser } from '@/services/admin.service';
import { useAuthStore } from '@/store/auth.store';

export default function AdminUsersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { admin: adminT } = useI18nStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Edit Role Dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>('family_member');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    loadUsers();
  }, [user, page, limit, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getAllUsers(page + 1, limit);
      setUsers(response.data);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || adminT.loadError);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: AdminUser) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditRole = () => {
    if (selectedUser) {
      setNewRole(selectedUser.role);
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleSaveRole = async () => {
    if (!selectedUser) return;

    try {
      await adminService.updateUserRole(selectedUser.id, newRole);
      setEditDialogOpen(false);
      loadUsers();
    } catch (err: any) {
      alert(err.message || adminT.updateError);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    if (!confirm(adminT.deleteUserConfirm)) {
      handleMenuClose();
      return;
    }

    try {
      await adminService.deleteUser(selectedUser.id);
      handleMenuClose();
      loadUsers();
    } catch (err: any) {
      alert(err.message || adminT.deleteError);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 4 }}>
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
        <Box display="flex" alignItems="center" gap={2}>
          <Person fontSize="large" />
          <div>
            <Typography variant="h4" fontWeight="bold">
              {adminT.usersManagement}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {adminT.usersCount}: {total}
            </Typography>
          </div>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder={adminT.searchUsers}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{adminT.userTable.avatar}</TableCell>
              <TableCell>{adminT.userTable.email}</TableCell>
              <TableCell>{adminT.userTable.role}</TableCell>
              <TableCell align="center">{adminT.userTable.families}</TableCell>
              <TableCell align="center">{adminT.userTable.kids}</TableCell>
              <TableCell align="center">{adminT.userTable.albums}</TableCell>
              <TableCell align="center">{adminT.userTable.photos}</TableCell>
              <TableCell>{adminT.userTable.joinedDate}</TableCell>
              <TableCell align="center">{adminT.userTable.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary">
                    {adminT.noData}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={user.avatar_url || undefined}>{user.display_name?.charAt(0)}</Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {user.display_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={
                        user.role === 'admin'
                          ? 'error'
                          : user.role === 'family_owner'
                          ? 'primary'
                          : 'default'
                      }
                      icon={
                        user.role === 'admin' ? (
                          <AdminPanelSettings />
                        ) : user.role === 'family_owner' ? (
                          <FamilyRestroom />
                        ) : (
                          <Person />
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="center">{user._count?.owned_families || 0}</TableCell>
                  <TableCell align="center">{user._count?.kids || 0}</TableCell>
                  <TableCell align="center">{user._count?.albums || 0}</TableCell>
                  <TableCell align="center">{user._count?.photos || 0}</TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(user.created_at).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage={adminT.pagination.rowsPerPage}
          labelDisplayedRows={({ from, to, count }) => 
            adminT.pagination.displayedRows
              .replace('{from}', String(from))
              .replace('{to}', String(to))
              .replace('{count}', String(count))
          }
        />
      </TableContainer>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditRole}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          {adminT.viewUser}
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          {adminT.deleteUser}
        </MenuItem>
      </Menu>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{adminT.editUserTitle}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={newRole} onChange={(e) => setNewRole(e.target.value)} label="Role">
              <MenuItem value="admin">{adminT.roles.admin}</MenuItem>
              <MenuItem value="family_owner">Family Owner</MenuItem>
              <MenuItem value="family_member">Family Member</MenuItem>
            </Select>
          </FormControl>
          {selectedUser && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              User: <strong>{selectedUser.display_name}</strong>
              <br />
              Email: <strong>{selectedUser.email}</strong>
              <br />
              Role hiện tại: <strong>{selectedUser.role}</strong>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>{adminT.cancel}</Button>
          <Button onClick={handleSaveRole} variant="contained">
            {adminT.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
