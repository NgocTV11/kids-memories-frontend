'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { getAccessToken } from '../lib/api-client';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, loadUser, user } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only check once per pathname
    if (hasChecked) return;

    const checkAuth = async () => {
      const accessToken = getAccessToken();

      // No token, redirect immediately
      if (!accessToken) {
        console.log('[ProtectedRoute] No token, redirecting to login');
        setChecking(false);
        setHasChecked(true);
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // If already authenticated with user, skip loading
      if (isAuthenticated && user) {
        console.log('[ProtectedRoute] Already authenticated');
        setChecking(false);
        setHasChecked(true);
        return;
      }

      // Token exists but no user in store, load user
      if (!isLoading) {
        try {
          console.log('[ProtectedRoute] Loading user...');
          await loadUser();
          console.log('[ProtectedRoute] User loaded successfully');
          setChecking(false);
          setHasChecked(true);
        } catch (error) {
          // loadUser failed and cleared tokens, redirect to login
          console.error('[ProtectedRoute] loadUser failed:', error);
          setChecking(false);
          setHasChecked(true);
          router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hasChecked]);

  // Show loading spinner while checking authentication
  if (checking || isLoading || (!isAuthenticated && getAccessToken())) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not authenticated and no token, will be redirected
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated, render children
  return <>{children}</>;
}
