"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, PencilLine, ChevronRight, Home, User, History, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [authModal, setAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    bio: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [donations, setDonations] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Fetch user profile data
  useEffect(() => {
    async function fetchUserProfile() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setProfileData({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            phone: userData.phone || '',
            country: userData.country || '',
            city: userData.city || '',
            bio: userData.bio || ''
          });

          // Fetch user's donation history
          // This would be implemented based on your database structure
          // For now, we'll leave it as an empty array
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setUpdating(true);
    try {
      // Update Firestore document
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        phone: profileData.phone,
        country: profileData.country,
        city: profileData.city,
        bio: profileData.bio,
        updatedAt: new Date()
      });

      // Update display name in Firebase Auth
      if (profileData.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: profileData.displayName
        });
      }

      // Upload and update avatar if changed
      if (avatarFile) {
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(avatarRef, avatarFile);
        const photoURL = await getDownloadURL(avatarRef);
        
        await updateProfile(currentUser, { photoURL });
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
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

  if (loading) {
    return (
      <>
        <Navbar onAuthModalOpen={() => setAuthModal(true)} />
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
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
            <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
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
            <span>My Profile</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
        </div>
      </div>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4 group">
                    {currentUser.photoURL ? (
                      <Image 
                        src={currentUser.photoURL} 
                        alt="Profile avatar" 
                        width={100} 
                        height={100} 
                        className="rounded-full object-cover w-24 h-24"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#09869A]/20 flex items-center justify-center text-[#09869A] text-3xl">
                        {profileData.displayName ? profileData.displayName[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {profileData.displayName || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                </div>
                
                <nav className="mt-6 space-y-2">
                  <Link 
                    href="/profile" 
                    className="flex items-center px-4 py-3 text-[#09869A] bg-[#09869A]/10 rounded-lg font-medium"
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
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Account Settings</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-3 text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal">
                <TabsList className="bg-white p-1 rounded-lg mb-6 shadow-sm">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="avatar">Profile Picture</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                      <div className="p-1 rounded-full bg-[#FA6418]/10">
                        <PencilLine className="w-5 h-5 text-[#FA6418]" />
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={profileData.displayName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A]/50 focus:border-[#09869A]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                          />
                          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A]/50 focus:border-[#09869A]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={profileData.country}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A]/50 focus:border-[#09869A]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={profileData.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A]/50 focus:border-[#09869A]"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869A]/50 focus:border-[#09869A]"
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          type="submit"
                          disabled={updating}
                          className="px-6 py-2 bg-[#09869A] text-white font-medium rounded-lg hover:bg-[#09869A]/90 transition-colors disabled:opacity-70"
                        >
                          {updating ? "Updating..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="avatar">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h3>
                    
                    <div className="flex flex-col items-center">
                      <div className="relative mb-8">
                        {avatarPreview ? (
                          <img 
                            src={avatarPreview} 
                            alt="Avatar preview" 
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : currentUser.photoURL ? (
                          <Image 
                            src={currentUser.photoURL} 
                            alt="Current avatar" 
                            width={128} 
                            height={128} 
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-[#09869A]/20 flex items-center justify-center text-[#09869A] text-4xl">
                            {profileData.displayName ? profileData.displayName[0].toUpperCase() : "U"}
                          </div>
                        )}
                        
                        <label 
                          htmlFor="avatar-upload" 
                          className="absolute bottom-0 right-0 w-10 h-10 bg-[#09869A] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#09869A]/90 transition-colors"
                        >
                          <Camera className="w-5 h-5 text-white" />
                        </label>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleAvatarChange} 
                          className="hidden" 
                        />
                      </div>
                      
                      {avatarFile && (
                        <div className="text-center">
                          <button
                            onClick={handleSubmit}
                            disabled={updating}
                            className="px-6 py-2 bg-[#09869A] text-white font-medium rounded-lg hover:bg-[#09869A]/90 transition-colors disabled:opacity-70"
                          >
                            {updating ? "Uploading..." : "Upload New Picture"}
                          </button>
                          <button
                            onClick={() => {
                              setAvatarFile(null);
                              setAvatarPreview(null);
                            }}
                            className="px-6 py-2 bg-transparent text-gray-700 font-medium rounded-lg hover:bg-gray-100 ml-2 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      
                      {!avatarFile && (
                        <div className="text-center text-gray-500 mt-4">
                          <p>Click the camera icon to upload a new profile picture</p>
                          <p className="text-xs mt-2">Recommended: Square image, at least 300x300 pixels</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Donations</h3>
                  <Link href="/donations" className="text-[#09869A] text-sm font-medium hover:underline">
                    View All
                  </Link>
                </div>
                
                {donations && donations.length > 0 ? (
                  <div className="space-y-4">
                    {/* Render donations here */}
                    <p>You have no recent donations</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No donation history yet</p>
                    <Link 
                      href="/donate" 
                      className="mt-4 inline-block px-6 py-2 bg-[#FA6418] text-white font-medium rounded-lg hover:bg-[#FA6418]/90 transition-colors"
                    >
                      Make Your First Donation
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}