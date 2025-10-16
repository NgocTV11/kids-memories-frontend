import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authService, User, LoginData, RegisterData } from '../services/auth.service';
import { clearTokens, getAccessToken } from '../lib/api-client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        /**
         * Login user
         */
        login: async (data: LoginData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.login(data);
            
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
            });
            
            throw error;
          }
        },

        /**
         * Register new user
         */
        register: async (data: RegisterData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.register(data);
            
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
            });
            
            throw error;
          }
        },

        /**
         * Logout user
         */
        logout: async () => {
          set({ isLoading: true });
          
          try {
            await authService.logout();
          } catch (error: any) {
            console.error('Logout error:', error);
          } finally {
            // Always clear state and tokens, even if API call fails
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            
            clearTokens();
            
            // Clear persisted storage
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage');
            }
          }
        },

        /**
         * Load user profile
         */
        loadUser: async () => {
          const accessToken = getAccessToken();
          
          if (!accessToken) {
            console.log('[Auth] No access token found');
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }
          
          set({ isLoading: true });
          
          try {
            console.log('[Auth] Loading user profile...');
            const user = await authService.getProfile();
            console.log('[Auth] User loaded successfully:', user.email);
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            console.error('[Auth] Load user error:', error.response?.status, error.response?.data);
            
            // Clear everything on error
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            
            clearTokens();
            
            // Clear persisted storage
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage');
            }
            
            // Throw error to let ProtectedRoute handle redirect
            throw error;
          }
        },

        /**
         * Clear error message
         */
        clearError: () => {
          set({ error: null });
        },

        /**
         * Set user manually
         */
        setUser: (user: User | null) => {
          set({
            user,
            isAuthenticated: !!user,
          });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
