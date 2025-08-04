import { createClient } from '@supabase/supabase-js';

// Supabase project URL and public anon key
const supabaseUrl = 'https://ryehatyshyahybxmrntc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZWhhdHlzaHlhaHlieG1ybnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTY0OTMsImV4cCI6MjA2ODgzMjQ5M30.gFVGs4-tv8H-O24zWYgykP-b-_-blRk_dB5wmy3w_I';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration is missing!');
  throw new Error('Supabase URL and Anon Key are required');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

// Create a single Supabase client for the app with better configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.53.0'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Test the connection with better error handling
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection test failed:', error);
  } else {
    console.log('Supabase connection test successful');
  }
}).catch(err => {
  console.error('Supabase connection test error:', err);
});

// Mock authentication for testing (fallback)
export const mockAuth = {
  user: null,
  session: null,
  
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    console.log('Mock signInWithPassword called with:', { email, password });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockUser = {
        id: 'mock-user-id',
        email: email,
        user_metadata: { name: email.split('@')[0] },
        created_at: new Date().toISOString()
      };
      
      this.user = mockUser;
      this.session = { user: mockUser };
      
      return { data: { user: mockUser, session: { user: mockUser } }, error: null };
    } else {
      return { data: null, error: { message: 'Email en wachtwoord zijn vereist' } };
    }
  },
  
  async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
    console.log('Mock signUp called with:', { email, password, options });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockUser = {
        id: 'mock-user-id',
        email: email,
        user_metadata: { name: options?.data?.name || email.split('@')[0] },
        created_at: new Date().toISOString()
      };
      
      this.user = mockUser;
      this.session = { user: mockUser };
      
      return { data: { user: mockUser, session: { user: mockUser } }, error: null };
    } else {
      return { data: null, error: { message: 'Email en wachtwoord zijn vereist' } };
    }
  },
  
  async signOut() {
    console.log('Mock signOut called');
    this.user = null;
    this.session = null;
    return { error: null };
  },
  
  async getSession() {
    return { data: { session: this.session }, error: null };
  },
  
  onAuthStateChange(callback: (event: string, session: any) => void) {
    // Mock auth state change listener
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
}; 