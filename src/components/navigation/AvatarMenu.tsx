"use client"

import { useState, useRef, useEffect } from 'react';
import { AiOutlineUser, AiOutlineHistory, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';

interface AvatarMenuProps {
  onAuthClick: () => void;
}

export default function AvatarMenu({ onAuthClick }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="text-2xl hover:text-white/80 transition-colors duration-200 rounded-full p-1 border-2 border-transparent focus:border-white/30 focus:outline-none" 
        aria-label="User Profile" 
        title="User Profile"
        onClick={() => setIsOpen(!isOpen)}
        data-auth-trigger
      >
        <AiOutlineUser />
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
          <div className="py-1">
            <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <AiOutlineUser className="mr-3 text-gray-500" />
              <span>My Profile</span>
            </a>
            <a href="/donations" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <AiOutlineHistory className="mr-3 text-gray-500" />
              <span>Donation History</span>
            </a>
            <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <AiOutlineSetting className="mr-3 text-gray-500" />
              <span>Account Settings</span>
            </a>
            <div className="border-t mt-1 pt-1">
              <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                <AiOutlineLogout className="mr-3 text-red-500" />
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}