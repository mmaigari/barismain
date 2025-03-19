"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

// Mock cart data - in a real app, this would come from a state management solution
const initialCartItems = [
  
];

export default function CartPage() {
  const [authModal, setAuthModal] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;
  
  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      <div className="min-h-screen bg-gray-50 pt-24 lg:pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Your Shopping Cart</h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - Takes up 2/3 of the space on desktop */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h2 className="font-montserrat text-xl font-bold text-gray-800 mb-4">Cart Items ({cartItems.length})</h2>
                    
                    {/* Cart Items List */}
                    <div className="divide-y divide-gray-100">
                      {cartItems.map(item => (
                        <div key={item.id} className="py-6 flex flex-col md:flex-row gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="relative w-24 h-24 rounded-md overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="font-montserrat font-bold text-lg text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                            <p className="font-bold text-[#09869a]">${item.price.toFixed(2)}</p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
                            <div className="flex items-center border border-gray-200 rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center text-gray-700">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <p className="text-gray-700 font-semibold whitespace-nowrap">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link 
                    href="/store" 
                    className="inline-flex items-center text-[#09869a] font-medium hover:text-[#09869a]/80"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary - Takes up 1/3 of the space on desktop */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="font-montserrat text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-xl text-[#09869a]">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-[#09869a] text-white py-3 rounded-md font-semibold hover:bg-[#09869a]/90 transition-colors duration-300 mb-3">
                      Proceed to Checkout
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      All purchases support our charitable programs
                    </p>
                    
                    <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-500">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
                
                {/* Impact Note */}
                <div className="bg-[#09869a]/10 rounded-xl p-6 mt-6">
                  <h3 className="font-montserrat text-lg font-bold text-[#09869a] mb-3">Your Purchase Makes a Difference</h3>
                  <p className="text-gray-700 text-sm">
                    100% of profits from our store go directly to supporting our charitable programs 
                    around the world. Thank you for your contribution!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h2 className="font-montserrat text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet. 
                Visit our store to find products that support our charitable work.
              </p>
              <Link 
                href="/store" 
                className="inline-flex items-center bg-[#09869a] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#09869a]/90 transition-colors duration-300"
              >
                Browse Our Store
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}