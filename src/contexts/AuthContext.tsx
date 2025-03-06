"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, getUserProfile } from '@/lib/firebase';
import { Timestamp } from 'firebase/firestore'; // Add this import

// Update interface to support Firestore Timestamps
interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  createdAt?: Date | Timestamp; // Accept both Date and Timestamp
  updatedAt?: Date | Timestamp; // Accept both Date and Timestamp
  // Add other properties your profile might have
}

interface AuthContextProps {
  currentUser: User | null;
  userProfile: UserProfile | null; // Use the interface instead of 'any'
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Implement actual logout functionality
  const logout = async () => {
    try {
      await signOut(auth);
      // Auth state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing out:", error); // Use the error in a console.error
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch additional user profile data from Firestore
        const { profile } = await getUserProfile(user.uid);
        if (profile) {
          // Extract uid from profile (if it exists) to avoid overwriting
          const { uid: _profileUid, ...restProfile } = profile;
          setUserProfile({
            uid: user.uid,
            ...restProfile
          });
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
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);