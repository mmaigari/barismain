"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineUser, AiOutlineHistory, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarMenuProps {
  onAuthClick: () => void;
}

export default function AvatarMenu({ onAuthClick }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="text-2xl hover:text-white/80 transition-colors duration-200 rounded-full p-1 border-2 border-transparent focus:border-white/30 focus:outline-none" 
        aria-label="User Profile" 
        title="User Profile"
        onClick={() => setIsOpen(!isOpen)}
        data-auth-trigger
      >
        {currentUser && currentUser.photoURL ? (
          <Image 
            src={currentUser.photoURL}
            alt="User Avatar"
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <AiOutlineUser />
        )}
      </button>
      
      {/* Avatar Flyout Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-50 origin-top-right overflow-hidden"
          style={{
            animation: "dropdown-appear 0.25s ease-out forwards",
            transformOrigin: "top right"
          }}
        >
          {currentUser ? (
            <>
              <div className="border-b px-4 py-4 bg-gradient-to-r from-[#09869A]/10 to-[#09869A]/5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {currentUser.photoURL ? (
                      <Image 
                        src={currentUser.photoURL}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#09869A]/20 flex items-center justify-center text-[#09869A]">
                        {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(false)}>
                  <AiOutlineUser className="mr-3 text-gray-500" />
                  <span>My Profile</span>
                </Link>
                <Link href="/donations" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(false)}>
                  <AiOutlineHistory className="mr-3 text-gray-500" />
                  <span>Donation History</span>
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(false)}>
                  <AiOutlineSetting className="mr-3 text-gray-500" />
                  <span>Account Settings</span>
                </Link>
                <div className="border-t mt-1 pt-1">
                  <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                    <AiOutlineLogout className="mr-3 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="border-b px-4 py-4 bg-gradient-to-r from-[#09869A]/10 to-[#09869A]/5">
              <div className="text-center">
                <button 
                  className="font-medium text-[#09869A] hover:text-[#09869A]/80 transition-all"
                  onClick={() => {
                    setIsOpen(false);
                    onAuthClick();
                  }}
                >
                  Sign In / Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}