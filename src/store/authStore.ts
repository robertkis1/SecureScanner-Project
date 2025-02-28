import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: Profile | null) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'user' | 'admin') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserCredentials: (userId: string, email: string, password?: string) => Promise<void>;
  updateUserProfile: (userId: string, data: { name: string; email: string; role: 'user' | 'admin' }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),

  initializeAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, name, email, role')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          set({ user: profile, error: null });
        } else {
          await supabase.auth.signOut();
          set({ user: null });
        }
      } else {
        set({ user: null });
      }
    } catch (error: any) {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        error: 'Failed to initialize authentication. Please try again.'
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    if (!email?.trim() || !password?.trim()) {
      throw new Error('Please enter both email and password');
    }

    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password.trim()
      });

      if (error) {
        // Always show "incorrect email or password" for security
        throw new Error('The email or password you entered is incorrect. Please try again.');
      }

      if (!data?.user?.id) {
        throw new Error('Authentication failed. Please try again.');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('The email or password you entered is incorrect. Please try again.');
      }

      set({ user: profile, error: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error; // Re-throw to let the component handle the error UI
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, name: string, role: 'user' | 'admin') => {
    if (!email?.trim() || !password?.trim() || !name?.trim()) {
      throw new Error('Please fill in all required fields');
    }

    try {
      set({ isLoading: true, error: null });

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password: password.trim(),
        options: {
          data: {
            name: name.trim(),
            role
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          throw new Error('This email is already registered. Please try logging in instead.');
        }
        throw signUpError;
      }

      if (!data?.user?.id) {
        throw new Error('Failed to create account. Please try again.');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email.toLowerCase().trim(),
          name: name.trim(),
          role
        })
        .select()
        .single();

      if (profileError) {
        // Clean up the created auth user if profile creation fails
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new Error('Failed to create user profile. Please try again.');
      }

      if (!profile) {
        throw new Error('Failed to create user profile. Please try again.');
      }

      set({ user: profile, error: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error: any) {
      set({ 
        error: 'Failed to sign out. Please try again.'
      });
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    if (!email?.trim()) {
      throw new Error('Please enter your email address');
    }

    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim());
      if (error) throw error;
    } catch (error: any) {
      set({ error: 'Failed to reset password. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserCredentials: async (userId: string, email: string, password?: string) => {
    if (!email?.trim()) {
      throw new Error('Email is required');
    }

    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.updateUser({
        email: email.toLowerCase().trim(),
        password: password?.trim()
      });
      if (error) throw error;
    } catch (error: any) {
      set({ error: 'Failed to update credentials. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserProfile: async (userId: string, data: { name: string; email: string; role: 'user' | 'admin' }) => {
    if (!data.name?.trim() || !data.email?.trim()) {
      throw new Error('Name and email are required');
    }

    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          role: data.role
        })
        .eq('id', userId);

      if (error) throw error;
    } catch (error: any) {
      set({ error: 'Failed to update profile. Please try again.' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));