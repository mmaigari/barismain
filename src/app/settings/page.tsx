"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Home, User, History, Settings, LogOut, Bell, Lock, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [authModal, setAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    donationReceipts: true,
    programUpdates: false,
    marketingEmails: false
  });
  const [updatingNotifications, setUpdatingNotifications] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Fetch user settings
  useEffect(() => {
    async function fetchUserSettings() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          if (userData.notifications) {
            setNotifications(userData.notifications);
          }
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserSettings();
  }, [currentUser]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const saveNotificationSettings = async () => {
    if (!currentUser) return;

    setUpdatingNotifications(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        notifications,
        updatedAt: new Date()
      });

      alert("Notification preferences updated successfully");
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      alert("Failed to update preferences. Please try again.");
    } finally {
      setUpdatingNotifications(false);
    }
  };

  const submitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (!passwordData.currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setChangingPassword(true);
    try {
      if (!currentUser || !currentUser.email) {
        throw new Error("User not authenticated");
      }

      const credential = EmailAuthProvider.credential(
        currentUser.email, 
        passwordData.currentPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, passwordData.newPassword);
      
      setPasswordSuccess("Password updated successfully");
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error("Error changing password:", errorMessage);
      if (errorMessage === 'auth/wrong-password') {
        setPasswordError("Current password is incorrect");
      } else {
        setPasswordError("Failed to update password. Please try again.");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleAccountDelete = () => {
    alert("Account deletion requires confirmation. Please contact support.");
  };

  if (loading) {
    return (
      <>
        <Navbar onAuthModalOpen={() => setAuthModal(true)} />
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Navbar onAuthModalOpen={() => setAuthModal(true)} />
        <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access account settings</p>
            <button 
              onClick={() => setAuthModal(true)}
              className="px-6 py-3 bg-[#09869A] text-white font-medium rounded-lg hover:bg-[#09869A]/90 transition-colors"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Page Header */}
      <div className="bg-[#09869A] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-2">
            <Link href="/" className="hover:text-white/80 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Account Settings</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Account Settings</h1>
        </div>
      </div>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="py-4 mb-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#09869A]/10 flex items-center justify-center text-[#09869A] font-medium text-lg">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{currentUser.displayName || "User"}</div>
                      <div className="text-sm text-gray-500">{currentUser.email}</div>
                    </div>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <Link 
                    href="/profile" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profile</span>
                  </Link>
                  
                  <Link 
                    href="/donations" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <History className="w-5 h-5 mr-3" />
                    <span>Donation History</span>
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="flex items-center px-4 py-3 text-white bg-[#09869A] rounded-lg"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="security" className="w-full">
                  <div className="bg-gray-50 px-6 py-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="security">Security</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="security" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <Lock className="w-5 h-5 mr-2" />
                          Password
                        </h3>
                        <p className="text-gray-500 mt-1 text-sm">
                          Change your password to keep your account secure
                        </p>
                      </div>
                      
                      <form onSubmit={submitPasswordChange} className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input 
                            type="password" 
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#09869A] focus:border-[#09869A]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input 
                            type="password" 
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#09869A] focus:border-[#09869A]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input 
                            type="password" 
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#09869A] focus:border-[#09869A]"
                          />
                        </div>
                        
                        {passwordError && (
                          <div className="text-red-500 text-sm">{passwordError}</div>
                        )}
                        
                        {passwordSuccess && (
                          <div className="text-green-500 text-sm">{passwordSuccess}</div>
                        )}
                        
                        <div>
                          <button 
                            type="submit" 
                            disabled={changingPassword}
                            className="px-4 py-2 bg-[#09869A] text-white font-medium rounded-md hover:bg-[#09869A]/90 disabled:opacity-50"
                          >
                            {changingPassword ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </form>
                      
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium flex items-center text-red-600">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Delete Account
                        </h3>
                        <p className="text-gray-500 mt-1 text-sm">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button 
                          onClick={handleAccountDelete}
                          className="mt-4 px-4 py-2 bg-white text-red-600 font-medium rounded-md border border-red-600 hover:bg-red-50"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <Bell className="w-5 h-5 mr-2" />
                          Email Notifications
                        </h3>
                        <p className="text-gray-500 mt-1 text-sm">
                          Manage how and when you receive email notifications
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Email Updates</h4>
                            <p className="text-gray-500 text-sm">Receive general updates about your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="emailUpdates"
                              checked={notifications.emailUpdates} 
                              onChange={handleNotificationChange} 
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#09869A]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Donation Receipts</h4>
                            <p className="text-gray-500 text-sm">Receive receipts for your donations</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="donationReceipts"
                              checked={notifications.donationReceipts} 
                              onChange={handleNotificationChange} 
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#09869A]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Program Updates</h4>
                            <p className="text-gray-500 text-sm">Receive updates about programs you&apos;ve supported</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="programUpdates"
                              checked={notifications.programUpdates} 
                              onChange={handleNotificationChange} 
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#09869A]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Marketing Emails</h4>
                            <p className="text-gray-500 text-sm">Receive promotional emails and newsletters</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="marketingEmails"
                              checked={notifications.marketingEmails} 
                              onChange={handleNotificationChange} 
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#09869A]"></div>
                          </label>
                        </div>
                        
                        <div className="pt-4">
                          <button 
                            onClick={saveNotificationSettings} 
                            disabled={updatingNotifications}
                            className="px-4 py-2 bg-[#09869A] text-white font-medium rounded-md hover:bg-[#09869A]/90 disabled:opacity-50"
                          >
                            {updatingNotifications ? 'Saving...' : 'Save Preferences'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}