import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSession = useCallback(async (session, isSignup = false) => {
    setSession(session);
    setUser(session?.user ?? null);

    // Fetch user profile if user exists
    if (session?.user) {
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle(); // Use maybeSingle instead of single to handle no rows

        if (!error && profileData) {
          setProfile(profileData);
          // Check if this is a new user (profile was just created - no created_at more than 1 minute old)
          const profileAge = new Date() - new Date(profileData.created_at);
          const isRecentlyCreated = profileAge < 60000; // Less than 1 minute
          if (isSignup || isRecentlyCreated) {
            setIsNewUser(true);
          }
        } else if (!profileData) {
          // Profile doesn't exist, create one - this is definitely a new user
          console.log('Profile not found, creating new profile...');
          setIsNewUser(true);
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || '',
              email: session.user.email,
              role: session.user.user_metadata?.role || 'user',
              goal: session.user.user_metadata?.goal || ''
            })
            .select()
            .single();

          if (!createError && newProfile) {
            setProfile(newProfile);
            console.log('Profile created successfully');
          } else {
            console.error('Error creating profile:', createError);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    } else {
      setProfile(null);
      setIsNewUser(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Check if this is an email confirmation redirect
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const isEmailConfirmation = hashParams.get('type') === 'signup' ||
        hashParams.get('type') === 'email_confirmation' ||
        window.location.pathname === '/welcome';

      handleSession(session, isEmailConfirmation);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        // Detect if this is a new signup (email verification or recovery)
        const isSignup = event === 'SIGNED_IN' && (
          window.location.pathname === '/welcome' ||
          window.location.hash.includes('type=signup') ||
          window.location.hash.includes('type=email_confirmation')
        );
        handleSession(session, isSignup);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    try {
      console.log('Attempting to sign up with:', { email, options });
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          ...options,
          emailRedirectTo: 'https://www.livingoncology.org/welcome'
        },
      });

      if (error) {
        console.error('Supabase signup error:', error);
        toast({
          variant: "destructive",
          title: "Sign up Failed",
          description: error.message || "Something went wrong",
        });
      } else {
        console.log('Signup successful');
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }

      return { error };
    } catch (err) {
      console.error('Network or other error:', err);
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: "Failed to fetch - please check your internet connection",
      });
      return { error: err };
    }
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  // Helper function to check if user is admin
  const isAdmin = useMemo(() => {
    return profile?.role === 'admin' || profile?.is_admin === true;
  }, [profile]);

  // Function to clear new user flag after onboarding
  const clearNewUserFlag = useCallback(() => {
    setIsNewUser(false);
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    profile,
    isAdmin,
    isNewUser,
    signUp,
    signIn,
    signOut,
    clearNewUserFlag,
  }), [user, session, loading, profile, isAdmin, isNewUser, signUp, signIn, signOut, clearNewUserFlag]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
