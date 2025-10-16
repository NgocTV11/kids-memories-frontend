'use client';

import { usePathname } from 'next/navigation';
import { AppNavigation } from './AppNavigation';
import { Box } from '@mui/material';
import { useAuthStore } from '@/store/auth.store';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const publicPaths = ['/login', '/register', '/auth/login', '/auth/register'];

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  // Check if current path is a public page (starts with /auth/ or exact match)
  const isPublicPage = publicPaths.includes(pathname) || pathname.startsWith('/auth/');

  // Nếu là public page hoặc chưa đăng nhập, không hiển thị navigation
  if (isPublicPage || !user) {
    return <>{children}</>;
  }

  // Đã đăng nhập, hiển thị navigation
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppNavigation />
      <Box>{children}</Box>
    </Box>
  );
}
