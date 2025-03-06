"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export default function ProtectedRoute({ children, redirectPath = '/login' }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      // User is not authenticated, redirect
      router.push(redirectPath);
    }
  }, [currentUser, isLoading, redirectPath, router]);

  // Don't render children until we've checked auth state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // On line 28, you might have something like:
  // if (someCondition && currentUser) {
  //   // ERROR IS HERE - Fix by ensuring returnUrl is always a string
  //   const returnUrl = currentUser.email; // This could be undefined
  //   router.push(returnUrl); // This causes the error
  // }

  // Fixed version:
  // if (someCondition && currentUser) {
  //   const returnUrl = currentUser.email ?? redirectPath; // Provide default
  //   router.push(returnUrl); // Now it's always a string
  // }

  // If authenticated, show the protected content
  return currentUser ? <>{children}</> : null;
}