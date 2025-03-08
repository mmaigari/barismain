"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MedicalProgramCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

const MedicalProgramCard: React.FC<MedicalProgramCardProps> = ({ title, imageSrc, href }) => {
  return (
    <Link href={href} className="block group">
      <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transition-transform transform group-hover:scale-[1.02]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MedicalProgramCard;