"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Calculator, DollarSign, Percent, ArrowRight, Info, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';

// Nisab values (updated regularly)
const NISAB_GOLD = 3313.71; // Value in USD for ~85 grams of gold
const NISAB_SILVER = 210.83; // Value in USD for ~595 grams of silver
const ZAKAT_RATE = 0.025; // 2.5%

function ZakatCalculatorContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // State for storing all financial inputs
  const [financialData, setFinancialData] = useState({
    // Cash assets
    cashOnHand: 0,
    bankAccounts: 0,
    savingsAccounts: 0,
    moneyLent: 0,
    
    // Gold & Silver
    goldValue: 0,
    silverValue: 0,
    
    // Investments
    stocks: 0,
    bonds: 0,
    mutualFunds: 0,
    realEstateInvestments: 0,
    cryptocurrencies: 0,
    
    // Business assets
    businessBankAccounts: 0,
    accountsReceivable: 0,
    cashInHand: 0,
    stockInventory: 0,
    
    // Retirement accounts
    accessibleRetirementFunds: 0,
    
    // Liabilities
    debtsOwed: 0,
    businessExpenses: 0,
    livingExpenses: 0,
  });

  // State for calculation results
  const [calculationResults, setCalculationResults] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    netZakatableAmount: 0,
    zakatDue: 0,
    isEligibleForZakat: false,
    nisabThreshold: Math.min(NISAB_GOLD, NISAB_SILVER), // Using lower of the two
  });

  // Update calculation when financial data changes
  useEffect(() => {
    calculateZakat();
  }, [financialData]);

  // Handle input change for all financial fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert to number and handle empty strings
    const numericValue = value === '' ? 0 : parseFloat(value);
    
    setFinancialData({
      ...financialData,
      [name]: numericValue
    });
  };

  // Calculate Zakat based on entered financial data
  const calculateZakat = () => {
    // Calculate total assets
    const totalCash = 
      financialData.cashOnHand + 
      financialData.bankAccounts + 
      financialData.savingsAccounts + 
      financialData.moneyLent;
      
    const totalPreciousMetals = 
      financialData.goldValue + 
      financialData.silverValue;
      
    const totalInvestments = 
      financialData.stocks + 
      financialData.bonds + 
      financialData.mutualFunds + 
      financialData.realEstateInvestments + 
      financialData.cryptocurrencies;
      
    const totalBusinessAssets = 
      financialData.businessBankAccounts + 
      financialData.accountsReceivable + 
      financialData.cashInHand + 
      financialData.stockInventory;
      
    const totalRetirement = financialData.accessibleRetirementFunds;
    
    const totalAssets = totalCash + totalPreciousMetals + totalInvestments + totalBusinessAssets + totalRetirement;
    
    // Calculate total liabilities
    const totalLiabilities = 
      financialData.debtsOwed + 
      financialData.businessExpenses;
      // Note: Some scholars don't include living expenses as deductions, but others do
      // financialData.livingExpenses;
    
    // Calculate net zakatable amount
    const netZakatableAmount = totalAssets - totalLiabilities;
    
    // Calculate if eligible for Zakat (above Nisab)
    const isEligibleForZakat = netZakatableAmount >= Math.min(NISAB_GOLD, NISAB_SILVER);
    
    // Calculate Zakat due (2.5% of net zakatable amount if eligible)
    const zakatDue = isEligibleForZakat ? netZakatableAmount * ZAKAT_RATE : 0;
    
    setCalculationResults({
      totalAssets,
      totalLiabilities,
      netZakatableAmount,
      zakatDue,
      isEligibleForZakat,
      nisabThreshold: Math.min(NISAB_GOLD, NISAB_SILVER)
    });
  };

  // Handle donation of calculated Zakat amount
  const handleDonateZakat = () => {
    setProgramName("Zakat Payment");
    setDonationAmount(parseFloat(calculationResults.zakatDue.toFixed(2)));
    
    // Store donation details for custom amount flow
    localStorage.setItem("donationType", "custom");
    localStorage.setItem("customAmount", calculationResults.zakatDue.toFixed(2));
    localStorage.setItem("programType", "zakat");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Zakat Payment");
    localStorage.setItem("programDescription", "Fulfill your calculated Zakat obligation.");
    
    // Set the current modal to payment fees
    setCurrentModal('paymentFees');
  };

  // Function to navigate between steps
  const navigateToStep = (step: number) => {
    setActiveStep(step);
    // Smooth scroll to top of calculator
    document.getElementById('calculator-container')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Tooltip component for explanations
  const InfoTooltip = ({ text }) => (
    <div className="group relative inline-block ml-1">
      <HelpCircle className="w-4 h-4 text-[#FFA500]/70 inline cursor-help" />
      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity bg-gray-900 text-white p-2 rounded absolute z-10 text-xs w-60 bottom-full left-1/2 -translate-x-1/2 mb-1">
        {text}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Add donation modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-14 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#09869a] flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-[#09869a]">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs/zakat" className="hover:text-[#09869a]">
              Zakat
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#FFA500] font-medium">Zakat Calculator</span>
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FFA500]/10 text-[#FFA500] mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Zakat Calculation Tool
            </div>
            
            <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Calculate Your Zakat
            </h1>
            
            <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
              Use our Shariah-compliant calculator to determine your Zakat obligation based on 
              your assets and liabilities. Follow the simple steps below to calculate accurately.
            </p>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section id="calculator-container" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        activeStep === step 
                          ? 'bg-[#FFA500] text-white border-[#FFA500]'
                          : activeStep > step
                            ? 'bg-[#FFA500]/20 text-[#FFA500] border-[#FFA500]'
                            : 'bg-white text-gray-400 border-gray-300'
                      } font-medium text-sm cursor-pointer`}
                      onClick={() => navigateToStep(step)}
                    >
                      {activeStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-20 h-0.5 ${
                        activeStep > step ? 'bg-[#FFA500]' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-2">
                <div className="text-xs font-medium text-center w-8">Cash & Metals</div>
                <div className="text-xs font-medium text-center w-8">Investments</div>
                <div className="text-xs font-medium text-center w-8">Business & Liabilities</div>
                <div className="text-xs font-medium text-center w-8">Results</div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              {/* Step 1: Cash and Precious Metals */}
              {activeStep === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Step 1: Cash & Precious Metals
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-[#FFA500]/5 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <Info className="w-4 h-4 text-[#FFA500] mr-2" />
                        What to include in this section:
                      </h3>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Cash you own (in hand, at home, in bank accounts)</li>
                        <li>• Savings accounts and deposits</li>
                        <li>• Money others owe you that you expect to recover</li>
                        <li>• Gold and silver (jewelry, coins, bars) at current market value</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Cash Assets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cash on Hand
                            <InfoTooltip text="Physical money you have at home or on your person." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="cashOnHand"
                              value={financialData.cashOnHand || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bank Accounts
                            <InfoTooltip text="Total balance in checking accounts." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="bankAccounts"
                              value={financialData.bankAccounts || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Savings Accounts
                            <InfoTooltip text="Total balance in savings accounts, fixed deposits, etc." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="savingsAccounts"
                              value={financialData.savingsAccounts || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Money Lent to Others
                            <InfoTooltip text="Money you have lent that you expect to recover." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="moneyLent"
                              value={financialData.moneyLent || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Gold & Silver</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gold Value
                            <InfoTooltip text="Current market value of gold you own, including jewelry, coins, etc. Only include gold that exceeds what is customarily worn." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="goldValue"
                              value={financialData.goldValue || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Silver Value
                            <InfoTooltip text="Current market value of silver you own, including jewelry, coins, etc." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="silverValue"
                              value={financialData.silverValue || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => navigateToStep(2)}
                        className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center"
                      >
                        Next: Investments
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Investments */}
              {activeStep === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Step 2: Investments
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-[#FFA500]/5 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <Info className="w-4 h-4 text-[#FFA500] mr-2" />
                        What to include in this section:
                      </h3>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Stocks, shares, bonds, and similar investments at current market value</li>
                        <li>• Mutual funds and investment portfolios</li>
                        <li>• Real estate purchased as investment (not for personal use)</li>
                        <li>• Cryptocurrencies and digital assets</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Investment Assets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stocks & Shares
                            <InfoTooltip text="Current market value of stocks and shares you own as investments." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="stocks"
                              value={financialData.stocks || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bonds & Sukuk
                            <InfoTooltip text="Value of bonds, sukuk, and similar fixed-income investments." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="bonds"
                              value={financialData.bonds || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mutual Funds & ETFs
                            <InfoTooltip text="Current market value of mutual funds, ETFs, and similar investment vehicles." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="mutualFunds"
                              value={financialData.mutualFunds || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Investment Real Estate
                            <InfoTooltip text="Market value of real estate held as an investment, not for personal use. Only include property bought for resale or rental income." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="realEstateInvestments"
                              value={financialData.realEstateInvestments || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cryptocurrencies
                            <InfoTooltip text="Current market value of any cryptocurrencies or digital assets you own." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="cryptocurrencies"
                              value={financialData.cryptocurrencies || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Retirement Funds</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Accessible Retirement Funds
                            <InfoTooltip text="Include only the portion of retirement accounts that you could access now if needed. Some scholars suggest not including retirement funds that cannot be accessed without penalty." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="accessibleRetirementFunds"
                              value={financialData.accessibleRetirementFunds || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => navigateToStep(1)}
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors flex items-center"
                      >
                        <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                        Back: Cash & Metals
                      </button>
                      
                      <button
                        onClick={() => navigateToStep(3)}
                        className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center"
                      >
                        Next: Business & Liabilities
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Business & Liabilities */}
              {activeStep === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Step 3: Business Assets & Liabilities
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-[#FFA500]/5 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <Info className="w-4 h-4 text-[#FFA500] mr-2" />
                        What to include in this section:
                      </h3>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Business assets such as inventory for sale, business bank accounts, etc.</li>
                        <li>• Money owed to your business (accounts receivable)</li>
                        <li>• Debts you owe to others that are due now</li>
                        <li>• Business expenses that are due now</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Business Assets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Bank Accounts
                            <InfoTooltip text="Total cash in business bank accounts." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="businessBankAccounts"
                              value={financialData.businessBankAccounts || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Accounts Receivable
                            <InfoTooltip text="Money owed to your business that you expect to receive." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="accountsReceivable"
                              value={financialData.accountsReceivable || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Cash in Hand
                            <InfoTooltip text="Cash kept for business operations." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="cashInHand"
                              value={financialData.cashInHand || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock/Inventory
                            <InfoTooltip text="Value of goods held for sale. Use current market value, not purchase price." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="stockInventory"
                              value={financialData.stockInventory || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Liabilities (Deductions)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Debts Owed
                            <InfoTooltip text="Debts that are currently due. This includes loans, credit card balances, etc." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="debtsOwed"
                              value={financialData.debtsOwed || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Expenses Due
                            <InfoTooltip text="Business expenses that are currently due, such as rent, salaries, etc." />
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="businessExpenses"
                              value={financialData.businessExpenses || ''}
                              onChange={handleInputChange}
                              className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Living Expenses (Optional)
                              <InfoTooltip text="Some scholars allow deducting one month's essential living expenses. Others don't. Consider consulting with a scholar for guidance on your specific situation." />
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                name="livingExpenses"
                                value={financialData.livingExpenses || ''}
                                onChange={handleInputChange}
                                className="focus:ring-[#FFA500] focus:border-[#FFA500] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                min="0"
                              />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                              Note: Living expenses are not included in our default calculation as most scholars 
                              don't include them as deductions. Adjust based on your understanding or scholarly guidance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => navigateToStep(2)}
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors flex items-center"
                      >
                        <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                        Back: Investments
                      </button>
                      
                      <button
                        onClick={() => navigateToStep(4)}
                        className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center"
                      >
                        View Results
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

                            {/* Step 4: Results */}
                            {activeStep === 4 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Step 4: Zakat Calculation Results
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Overall Result */}
                    <div className="bg-[#FFA500]/5 p-6 rounded-lg text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Zakat Calculation</h3>
                      
                      {calculationResults.isEligibleForZakat ? (
                        <>
                          <div className="text-3xl font-bold text-[#FFA500] mb-3">
                            {formatCurrency(calculationResults.zakatDue)}
                          </div>
                          <p className="text-gray-700">
                            Based on your assets and liabilities, this is the amount of Zakat due.
                          </p>
                          
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={handleDonateZakat}
                              className="bg-[#FFA500] text-white px-8 py-3 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center"
                            >
                              <DollarSign className="w-5 h-5 mr-2" />
                              Pay Your Zakat Now
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-xl font-semibold text-gray-700 mb-3">
                            No Zakat Due
                          </div>
                          <div className="flex items-center justify-center text-gray-700 mb-4">
                            <AlertCircle className="w-5 h-5 text-[#FFA500] mr-2" />
                            Your wealth does not meet the minimum threshold (Nisab) for Zakat.
                          </div>
                          <p className="text-gray-600 text-sm">
                            The current Nisab threshold is {formatCurrency(calculationResults.nisabThreshold)} 
                            (based on the value of silver). Your net wealth is {formatCurrency(calculationResults.netZakatableAmount)}.
                          </p>
                          
                          <div className="mt-6">
                            <Link
                              href="/programs/sadaka"
                              className="text-[#09869a] font-medium hover:underline"
                            >
                              Consider giving Sadaqah (voluntary charity) instead
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Detailed Breakdown */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Detailed Calculation</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="px-4 py-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-600">Total Assets:</span>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(calculationResults.totalAssets)}</span>
                          </div>
                          <div className="text-xs text-gray-500 ml-4">
                            (Cash, gold, investments, business assets, etc.)
                          </div>
                        </div>
                        
                        <div className="px-4 py-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-600">Less Liabilities:</span>
                            <span className="text-sm font-medium text-gray-900">- {formatCurrency(calculationResults.totalLiabilities)}</span>
                          </div>
                          <div className="text-xs text-gray-500 ml-4">
                            (Debts and expenses due now)
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 bg-gray-50">
                          <div className="flex justify-between">
                            <span className="text-sm font-bold text-gray-700">Net Zakatable Amount:</span>
                            <span className="text-sm font-bold text-gray-900">{formatCurrency(calculationResults.netZakatableAmount)}</span>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium text-gray-600">Nisab Threshold:</span>
                              <div className="text-xs text-gray-500 ml-4">
                                (Minimum amount for Zakat eligibility)
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(calculationResults.nisabThreshold)}</span>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Zakat Rate:</span>
                            <span className="text-sm font-medium text-gray-900">2.5%</span>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 bg-[#FFA500]/5">
                          <div className="flex justify-between">
                            <span className="text-sm font-bold text-gray-700">Total Zakat Due:</span>
                            <span className="text-sm font-bold text-[#FFA500]">{formatCurrency(calculationResults.zakatDue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Important Notes */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Info className="w-4 h-4 text-[#FFA500] mr-2" />
                        Important Notes
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• This calculation is based on the information you provided and general Zakat principles.</li>
                        <li>• The Nisab threshold is calculated based on the lower value of gold (85g) and silver (595g) at current market rates.</li>
                        <li>• If you have complex financial situations, consider consulting with an Islamic finance expert or scholar.</li>
                        <li>• Remember that Zakat is due annually on wealth that has been in your possession for one lunar year.</li>
                      </ul>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap gap-4 justify-between">
                      <div className="space-x-4">
                        <button
                          onClick={() => navigateToStep(1)}
                          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors text-sm"
                        >
                          Restart Calculation
                        </button>
                        <button
                          onClick={() => navigateToStep(3)}
                          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors text-sm"
                        >
                          Edit Inputs
                        </button>
                      </div>
                      
                      {calculationResults.isEligibleForZakat && (
                        <button
                          onClick={handleDonateZakat}
                          className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center"
                        >
                          <DollarSign className="w-5 h-5 mr-2" />
                          Pay Zakat Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Zakat?</h3>
                <p className="text-gray-700">
                  Zakat is one of the Five Pillars of Islam, representing an obligatory charitable 
                  contribution that purifies wealth. Every Muslim who possesses wealth above a certain 
                  threshold (Nisab) for one lunar year is required to give 2.5% of that wealth to 
                  specific categories of people as mentioned in the Quran.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should I calculate and pay Zakat?</h3>
                <p className="text-gray-700">
                  Zakat is calculated and paid annually based on your Zakat anniversary date - the date 
                  when your wealth first reached the Nisab threshold. Many Muslims find it convenient 
                  to calculate their Zakat during Ramadan, though this is not required if your Zakat 
                  anniversary falls at another time.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What assets are exempt from Zakat?</h3>
                <p className="text-gray-700">
                  Assets exempt from Zakat include your primary residence, personal vehicles, clothing, 
                  household furniture, tools of your trade, and personal jewelry that is regularly worn 
                  (according to some scholars). Retirement accounts that cannot be accessed without penalty 
                  are subject to different scholarly opinions.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
                <p className="text-gray-700">
                  This calculator provides a good approximation based on common Zakat principles. However, 
                  individual circumstances may vary, and some financial situations may require specialized 
                  knowledge. We recommend consulting with a knowledgeable scholar for complex scenarios or 
                  if you have specific questions about your Zakat calculation.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link
                href="/programs/zakat"
                className="text-[#09869a] font-medium hover:underline flex items-center justify-center"
              >
                Learn more about our Zakat Program
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-[#FFA500]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Fulfill Your Zakat Obligation Today
            </h2>
            <p className="mb-8 text-white/90">
              Your Zakat helps those in need and purifies your wealth. We ensure 100% of your 
              Zakat reaches eligible recipients as required by Islamic principles.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {calculationResults.isEligibleForZakat ? (
                <button
                  onClick={handleDonateZakat}
                  className="bg-white text-[#FFA500] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Pay Your Calculated Zakat: {formatCurrency(calculationResults.zakatDue)}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigateToStep(1)}
                    className="bg-white text-[#FFA500] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Recalculate Your Zakat
                  </button>
                  <Link
                    href="/programs/zakat"
                    className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                  >
                    Learn About Our Zakat Programs
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function ZakatCalculator() {
  return (
    <DonationProvider>
      <ZakatCalculatorContent />
    </DonationProvider>
  );
}