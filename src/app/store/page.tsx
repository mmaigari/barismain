"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

const products = [
  
];

export default function StorePage() {
  const [authModal, setAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 lg:pt-[120px] pb-16">
      <Navbar onAuthModalOpen={function (): void {
              throw new Error('Function not implemented.');
          } } />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      {/* Page Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">Charity Store</h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg mb-8">
            Every purchase from our store directly supports our mission. When you buy our products, 
            you&apos;re not just getting quality items – you&apos;re helping to fund life-changing projects 
            around the world.
          </p>
          <Link 
            href="/programs" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#09869a] text-white rounded-md hover:bg-[#09869a]/90 transition-colors duration-300 font-medium"
          >
            Learn About Our Programs
          </Link>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
              {/* Product Image */}
              <div className="relative h-64 w-full bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-montserrat font-bold text-lg text-[#09869a]">{product.name}</h3>
                  <span className="font-bold text-[#FA6418]">{product.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                  {product.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-[#09869a] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#09869a]/90 transition-colors duration-200 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <Link 
                    href="/donate" 
                    className="bg-[#FA6418] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#FA6418]/90 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Store Info */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-montserrat text-2xl font-bold text-[#09869a] mb-4">About Our Store</h2>
          <p className="text-gray-700 mb-6">
            All products in our store are ethically sourced and produced. We work with local artisans 
            and fair trade suppliers to ensure that our merchandise not only supports our charitable 
            programs but also provides sustainable livelihoods for the communities we serve.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-700 text-sm">Eco-friendly materials</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-700 text-sm">Fair trade practices</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-700 text-sm">100% of profits go to charity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-700 text-sm">Supporting local artisans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}