import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Custom error handler to prevent raw Supabase errors from being logged
const errorHandler = (error: any) => {
  // Prevent the default error from being logged
  error.preventDefault?.();
  
  // Don't log auth errors as they're handled by the auth store
  if (error.error?.message?.includes('invalid_credentials')) {
    return;
  }
  
  // Transform error into a more user-friendly format if needed
  const friendlyError = new Error(error.message || 'An unexpected error occurred');
  friendlyError.name = 'SupabaseError';
  
  // Only log non-auth errors
  console.error('Operation failed:', friendlyError.message);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Add auth-specific error handling
    storageKey: 'sb-auth-token',
    flowType: 'pkce',
    debug: false // Disable debug logs
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    },
    // Add global error handler
    onError: errorHandler
  },
  // Disable auto-logging of errors
  db: {
    schema: 'public'
  }
});