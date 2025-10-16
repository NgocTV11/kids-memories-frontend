'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  ChildCare,
  PhotoAlbum,
  Photo,
  Celebration,
  AccountCircle,
  Logout,
  AdminPanelSettings,
  FamilyRestroom,
} from '@mui/icons-material';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18nStore } from '@/store/i18n.store';

export function AppNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { t } = useI18nStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
    handleMenuClose();
  };

  const navItems = [
    { path: '/dashboard', label: t.dashboard, icon: <Dashboard /> },
    { path: '/kids', label: t.kids, icon: <ChildCare /> },
    { path: '/albums', label: t.albums, icon: <PhotoAlbum /> },
    { path: '/photos', label: t.photos, icon: <Photo /> },
    { path: '/milestones', label: t.milestones, icon: <Celebration /> },
    { path: '/families', label: t.families, icon: <FamilyRestroom /> },
    ...(user?.role === 'admin' ? [
      { path: '/admin', label: 'Admin', icon: <AdminPanelSettings /> }
    ] : []),
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, mr: 4, cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => router.push('/dashboard')}
        >
          👶 Kids Memories
        </Typography>

        {/* Navigation Items */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              startIcon={item.icon}
              onClick={() => router.push(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.contrastText' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* User Menu */}
        {user && (
          <>
            <IconButton
              size="large"
              onClick={handleMenuOpen}
              color="inherit"
              sx={{ ml: 2 }}
            >
              {user.avatar_url ? (
                <Avatar src={user.avatar_url} alt={user.display_name} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {user.display_name}
                </Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} fontSize="small" />
                {t.logout}
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
