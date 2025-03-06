"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, getUserProfile } from '@/lib/firebase';

interface AuthContextProps {
  currentUser: User | null;
  userProfile: any;
  isLoading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  userProfile: null,
  isLoading: true,
  isAdmin: false,
  logout: async () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Implement actual logout functionality
  const logout = async () => {
    try {
      await signOut(auth);
      // Auth state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch additional user profile data from Firestore
        const { profile, error } = await getUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
          // Check if user has admin role
          setIsAdmin(profile.role === 'admin');
        }
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    isLoading,
    isAdmin,
    logout // Use the actual function here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);