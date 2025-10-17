'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Alert,
} from '@mui/material';
import { Person, Search } from '@mui/icons-material';
import { usersService, User } from '@/services/users.service';
import { familiesService, InviteMemberDto } from '@/services/families.service';
import { useI18nStore } from '@/store/i18n.store';

interface InviteMemberModalProps {
  open: boolean;
  familyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function InviteMemberModal({ open, familyId, onClose, onSuccess }: InviteMemberModalProps) {
  const { families: familiesT } = useI18nStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [relationship, setRelationship] = useState('');
  const [searching, setSearching] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          setSearching(true);
          setError(null);
          const results = await usersService.searchUsers(searchQuery);
          setSearchResults(results);
        } catch (err: any) {
          console.error('Search error:', err);
          setError(err.response?.data?.message || 'Không thể tìm kiếm người dùng');
          setSearchResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, open]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleInvite = async () => {
    if (!selectedUser) return;

    try {
      setInviting(true);
      setError(null);

      const data: InviteMemberDto = {
        user_id: selectedUser.id,
        role,
        relationship: relationship.trim() || undefined,
      };

      await familiesService.inviteMember(familyId, data);
      onSuccess();
      handleClose();
    } catch (err: any) {
      console.error('Failed to invite member:', err);
      setError(err.response?.data?.message || familiesT.inviteModal.inviteError);
    } finally {
      setInviting(false);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedUser(null);
    setRole('member');
    setRelationship('');
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{familiesT.inviteModal.title}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Selected User Display */}
        {selectedUser ? (
          <Box
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 1,
              bgcolor: 'primary.50',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={selectedUser.avatar_url || undefined} sx={{ mr: 2 }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedUser.display_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.email}
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={() => setSelectedUser(null)}
                sx={{ ml: 'auto' }}
              >
                {familiesT.inviteModal.changeUser}
              </Button>
            </Box>

            {/* Role Selection */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{familiesT.inviteModal.roleLabel}</InputLabel>
              <Select
                value={role}
                label={familiesT.inviteModal.roleLabel}
                onChange={(e) => setRole(e.target.value as 'admin' | 'member')}
              >
                <MenuItem value="member">{familiesT.inviteModal.roleMember}</MenuItem>
                <MenuItem value="admin">{familiesT.inviteModal.roleAdmin}</MenuItem>
              </Select>
            </FormControl>

            {/* Relationship Input */}
            <FormControl fullWidth>
              <InputLabel>{familiesT.inviteModal.relationshipLabel}</InputLabel>
              <Select
                value={relationship}
                label={familiesT.inviteModal.relationshipLabel}
                onChange={(e) => setRelationship(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">-- Không chọn --</MenuItem>
                <MenuItem value="ông">Ông</MenuItem>
                <MenuItem value="bà">Bà</MenuItem>
                <MenuItem value="bố">Bố</MenuItem>
                <MenuItem value="mẹ">Mẹ</MenuItem>
                <MenuItem value="anh">Anh</MenuItem>
                <MenuItem value="chị">Chị</MenuItem>
                <MenuItem value="em">Em</MenuItem>
                <MenuItem value="con">Con</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Hoặc nhập tự do (ví dụ: cô, dì, chú...)
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder={familiesT.inviteModal.relationshipPlaceholder}
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>
        ) : (
          <>
            {/* Search Box */}
            <TextField
              fullWidth
              placeholder={familiesT.inviteModal.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: searching && <CircularProgress size={20} />,
              }}
              sx={{ mb: 2, mt: 1 }}
            />

            {/* Search Results */}
            {searchResults.length > 0 && (
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {searchResults.map((user) => (
                  <ListItem
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.avatar_url || undefined}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.display_name}
                      secondary={user.email}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {searchQuery.trim().length >= 2 && !searching && searchResults.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                {familiesT.inviteModal.noResults}
              </Typography>
            )}

            {searchQuery.trim().length < 2 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                {familiesT.inviteModal.searchPlaceholder}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={inviting}>
          {familiesT.inviteModal.cancel}
        </Button>
        <Button
          onClick={handleInvite}
          variant="contained"
          disabled={!selectedUser || inviting}
        >
          {inviting ? <CircularProgress size={24} /> : familiesT.inviteModal.inviteButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
