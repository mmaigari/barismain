import React from 'react';

export const metadata = {
  title: 'Our Team | BCF',
}

interface TeamLayoutProps {
  children: React.ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  return children;
}