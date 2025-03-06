"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  allowedRoles = ["user", "admin"]  // Default roles that can access
}) => {
  const { currentUser, userProfile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      // Save the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname || '/');
      router.push('/login');
    }
    
    // Check role-based access
    if (!isLoading && currentUser && userProfile && !allowedRoles.includes(userProfile.role)) {
      // User is logged in but doesn't have permission
      router.push('/unauthorized');
    }
  }, [currentUser, isLoading, router, pathname, userProfile, allowedRoles]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09869A]"></div>
      </div>
    );
  }

  // If not loading and we have a user with the right role, render children
  if (!isLoading && currentUser && userProfile && allowedRoles.includes(userProfile.role)) {
    return <>{children}</>;
  }

  // This will briefly show before redirect happens
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09869A]"></div>
    </div>
  );
};

export default ProtectedRoute;