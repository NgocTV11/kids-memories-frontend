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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
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
  Menu as MenuIcon,
  Close,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
    handleMenuClose();
    setDrawerOpen(false);
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
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: isMobile ? 1 : 0, 
              mr: isMobile ? 0 : 4, 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
            onClick={() => router.push('/dashboard')}
          >
            👶 {isMobile ? 'KM' : 'Kids Memories'}
          </Typography>

          {/* Desktop Navigation Items */}
          {!isMobile && (
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
          )}

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* User Menu */}
          {user && (
            <>
              <IconButton
                size={isMobile ? "medium" : "large"}
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: isMobile ? 1 : 2 }}
              >
                {user.avatar_url ? (
                  <Avatar 
                    src={user.avatar_url} 
                    alt={user.display_name}
                    sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
                  />
                ) : (
                  <AccountCircle sx={{ fontSize: isMobile ? 32 : 40 }} />
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
                <Divider />
                <MenuItem
                  onClick={() => {
                    router.push('/profile');
                    handleMenuClose();
                  }}
                >
                  <AccountCircle sx={{ mr: 1 }} fontSize="small" />
                  {t.myProfile}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          {/* Drawer Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}>
            <Typography variant="h6" fontWeight="bold">
              👶 Kids Memories
            </Typography>
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{ color: 'primary.contrastText' }}
            >
              <Close />
            </IconButton>
          </Box>

          <Divider />

          {/* User Info */}
          {user && (
            <>
              <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {user.avatar_url ? (
                    <Avatar src={user.avatar_url} alt={user.display_name} />
                  ) : (
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  )}
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {user.display_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </>
          )}

          {/* Navigation List */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={isActive(item.path)}
                  onClick={() => {
                    router.push(item.path);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive(item.path) ? 'primary.main' : 'inherit',
                    minWidth: 40,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Logout Button */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/profile');
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Thông tin cá nhân" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={t.logout} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
