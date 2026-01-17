import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('tyo_token') : null,
  setAuth: (user, token) => {
    localStorage.setItem('tyo_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('tyo_token');
    set({ user: null, token: null });
  },
}));
