"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Heart, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';
import { sacrificePrograms } from '@/data/foodPrograms';

// Animal options data
interface AnimalOption {
  id: string;
  type: string;
  description: string;
  price: number;
  weight?: string;
}

// Animal options data
const animalOptions: AnimalOption[] = [
  {
    id: 'sheep-small',
    type: 'Sheep',
    description: 'Small size sheep',
    weight: '20-25 kg',
    price: 80,
  },
  {
    id: 'sheep-large',
    type: 'Sheep',
    description: 'Large size sheep',
    weight: '40-50 kg',
    price: 120,
  },
  {
    id: 'goat',
    type: 'Goat',
    description: 'Standard size goat',
    price: 60,
  },
  {
    id: 'cow-small',
    type: 'Cow',
    description: 'Small size cow',
    weight: '80 kg',
    price: 300,
  },
  {
    id: 'cow-medium',
    type: 'Cow',
    description: 'Medium size cow',
    weight: '100 kg',
    price: 330,
  },
  {
    id: 'cow-large',
    type: 'Cow',
    description: 'Large size cow',
    weight: '120 kg',
    price: 360,
  },
];

// Service types
interface SacrificeService {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const sacrificeServices: SacrificeService[] = [
  {
    id: 'qurbani',
    title: 'Qurbani Services',
    description: 'Fulfill your Qurbani obligation during Eid al-Adha by sacrificing an animal and providing meat to those in need.',
    imageSrc: '/new/qurbani.jpg',
  },
  {
    id: 'aqeeqah',
    title: 'Aqeeqah Services',
    description: 'Celebrate the birth of a child through the Islamic tradition of Aqeeqah, while helping provide nutritious meat to families.',
    imageSrc: '/new/Aqeeqah.jpg',
  },
  {
    id: 'vows',
    title: 'Vows Services',
    description: "Fulfill religious vows and pledges (Nadhr/Nazar) that you've made to Allah, while supporting our mission to provide food.",
    imageSrc: '/new/vows.png',
  },
];

// Service Selection Modal
const ServiceSelectionModal = ({ onClose, onSelectService }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-lg mx-auto my-8 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Select Sacrifice Service</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {sacrificeServices.map((service) => (
            <div 
              key={service.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSelectService(service)}
            >
              <div className="w-full sm:w-16 h-32 sm:h-16 relative rounded-lg overflow-hidden flex-shrink-0 mb-3 sm:mb-0">
                <Image 
                  src={service.imageSrc} 
                  alt={service.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="sm:ml-4 flex-1">
                <h4 className="font-semibold text-gray-800">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
              <ChevronRight className="hidden sm:block w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animal Selection Modal
const AnimalSelectionModal = ({ serviceType, onClose, onSelectAnimal }) => {
  const service = sacrificeServices.find(s => s.id === serviceType);
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-3xl mx-auto my-8 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{service?.title} - Select Animal</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-h-[70vh] overflow-y-auto p-1">
          {/* Sheep Card */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Sheep</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <div className="font-medium">Small (20-25 kg)</div>
                  <div className="text-sm text-gray-500">Standard option</div>
                </div>
                <div className="text-xl font-bold text-[#008080]">$80</div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <div className="font-medium">Large (40-50 kg)</div>
                  <div className="text-sm text-gray-500">Premium option</div>
                </div>
                <div className="text-xl font-bold text-[#008080]">$120</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onSelectAnimal(animalOptions[0])}
                className="py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
              >
                Small $80
              </button>
              <button 
                onClick={() => onSelectAnimal(animalOptions[1])}
                className="py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
              >
                Large $120
              </button>
            </div>
          </div>
          
          {/* Goat Card */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Goat</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <div className="font-medium">Standard Size</div>
                  <div className="text-sm text-gray-500">Traditional option</div>
                </div>
                <div className="text-xl font-bold text-[#008080]">$60</div>
              </div>
              <div className="h-[52px]">
                {/* Empty space to match height with sheep card */}
              </div>
            </div>
            <button 
              onClick={() => onSelectAnimal(animalOptions[2])}
              className="w-full py-2 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition"
            >
              Select Goat $60
            </button>
          </div>
          
          {/* Cow Card */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Cow</h3>
            <div className="space-y-4 sm:space-y-3 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                  <div className="font-medium">Small (80 kg)</div>
                  <div className="text-sm text-gray-500">Basic option</div>
                  <div className="text-xl font-bold text-[#008080] mt-2">$300</div>
                  <button 
                    onClick={() => onSelectAnimal(animalOptions[3])}
                    className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                  >
                    Select This Option
                  </button>
                </div>
                
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                  <div className="font-medium">Medium (100 kg)</div>
                  <div className="text-sm text-gray-500">Popular size</div>
                  <div className="text-xl font-bold text-[#008080] mt-2">$330</div>
                  <button 
                    onClick={() => onSelectAnimal(animalOptions[4])}
                    className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                  >
                    Select This Option
                  </button>
                </div>
                
                <div>
                  <div className="font-medium">Large (120 kg)</div>
                  <div className="text-sm text-gray-500">Maximum benefit</div>
                  <div className="text-xl font-bold text-[#008080] mt-2">$360</div>
                  <button 
                    onClick={() => onSelectAnimal(animalOptions[5])}
                    className="mt-3 w-full py-2 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition"
                  >
                    Select This Option
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Final Donation Modal
const DonationConfirmModal = ({ serviceType, selectedAnimal, onClose, onProceed }) => {
  const service = sacrificeServices.find(s => s.id === serviceType);
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-md mx-auto my-8 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Confirm Your Donation</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {service?.title}
            </div>
            <div className="flex flex-wrap justify-between mb-2">
              <span className="text-gray-600">Animal:</span>
              <span className="font-medium">
                {selectedAnimal.type} {selectedAnimal.weight && `(${selectedAnimal.weight})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-[#008080]">${selectedAnimal.price}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            {serviceType === 'qurbani' && (
              "Your Qurbani donation will be performed according to proper Islamic guidelines, and the meat will be distributed to those in need during Eid al-Adha."
            )}
            {serviceType === 'aqeeqah' && (
              "Your Aqeeqah donation will be performed according to Islamic tradition, celebrating the birth of a child while providing meat to families in need."
            )}
            {serviceType === 'vows' && (
              "Your donation will fulfill your religious vow while providing meat to families in need, combining your spiritual obligation with charitable giving."
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="px-6 py-2 bg-[#008080] hover:bg-[#006666] text-white rounded-lg order-1 sm:order-2 mb-2 sm:mb-0"
          >
            Proceed to Donation
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to use the donation context
const SacrificePageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [animalModal, setAnimalModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalOption | null>(null);
  
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  // Handle service selection
  const handleServiceSelect = (service: SacrificeService) => {
    setSelectedService(service.id);
    setServiceModal(false);
    setAnimalModal(true);
  };
  
  // Handle animal selection
  const handleAnimalSelect = (animal: AnimalOption) => {
    setSelectedAnimal(animal);
    setAnimalModal(false);
    setConfirmModal(true);
  };
  
  // Handle donation confirmation
  const handleDonationConfirm = () => {
    const service = sacrificeServices.find(s => s.id === selectedService);
    const animalDescription = selectedAnimal?.weight 
      ? `${selectedAnimal.type} (${selectedAnimal.weight})`
      : selectedAnimal?.type;
      
    setProgramName(`${service?.title} - ${animalDescription}`);
    setDonationAmount(selectedAnimal?.price || 0);
    setConfirmModal(false);
    setCurrentModal('paymentFees');
  };
  
  // Open donation flow with service selection
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setServiceModal(true);
  };

  // Handle direct donation for a specific service
  const handleServiceDonateClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setAnimalModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Service Selection Modal */}
      {serviceModal && (
        <ServiceSelectionModal 
          onClose={() => setServiceModal(false)}
          onSelectService={handleServiceSelect}
        />
      )}
      
      {/* Animal Selection Modal */}
      {animalModal && selectedService && (
        <AnimalSelectionModal 
          serviceType={selectedService}
          onClose={() => setAnimalModal(false)}
          onSelectAnimal={handleAnimalSelect}
        />
      )}
      
      {/* Confirmation Modal */}
      {confirmModal && selectedService && selectedAnimal && (
        <DonationConfirmModal 
          serviceType={selectedService}
          selectedAnimal={selectedAnimal}
          onClose={() => setConfirmModal(false)}
          onProceed={handleDonationConfirm}
        />
      )}
      
      {/* Donation Flow Modals */}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#008080] to-[#007070] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/new/qurbani-hero.jpg" 
            alt="Sacrifice Program Background" 
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-white">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs/food" className="hover:text-white">
              Food
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-white font-medium">Sacrifice Program</span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
                Sacrifice Program Services
              </h1>
              <div className="w-24 h-1 bg-white rounded-full mb-4"></div>
              <p className="text-lg max-w-2xl text-white/90 mb-6">
                Our Sacrifice Program fulfills important religious practices while providing 
                nutritious meat to those in need. Choose from our Qurbani, Aqeeqah, and Vows 
                services to combine spiritual obligations with charitable giving.
              </p>
              
              {/* Donation and volunteer buttons */}
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleDonateClick}
                  className="px-8 py-4 text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all mr-4"
                >
                  Donate Now
                </a>
                <Link
                  href="/volunteer?program=sacrifice"
                  className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Volunteer with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Sacrifice Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sacrificeServices.map((service) => (
                <div 
                  key={service.id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src={service.imageSrc} 
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <button
                      onClick={() => handleServiceDonateClick(service.id)} 
                      className="w-full py-3 bg-[#008080] hover:bg-[#006666] text-white rounded-lg transition"
                    >
                      Make a {service.id === 'qurbani' ? 'Qurbani' : service.id === 'aqeeqah' ? 'Aqeeqah' : 'Vow'} Donation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Sacrifice Programs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Sacrifice Services</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What are Sacrifice Services?</h3>
              <p className="text-gray-600 mb-4">
                Our Sacrifice Services offer a way to fulfill important religious obligations 
                such as Qurbani, Aqeeqah, and Vows while providing essential nutrition to 
                vulnerable communities. Each sacrifice is performed according to proper Islamic 
                guidelines, and the meat is distributed to those in need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Qurbani</h3>
                <p className="text-gray-600 mb-3">
                  Fulfill your Qurbani obligation during Eid al-Adha by sacrificing an animal 
                  and providing meat to those in need, following the tradition of Prophet Ibrahim.
                </p>
                <button 
                  onClick={() => handleServiceDonateClick('qurbani')} 
                  className="text-[#008080] font-medium hover:underline flex items-center"
                >
                  Donate for Qurbani <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Aqeeqah</h3>
                <p className="text-gray-600 mb-3">
                  Celebrate the birth of a child through the Islamic tradition of Aqeeqah, 
                  while helping provide nutritious meat to families facing food insecurity.
                </p>
                <button 
                  onClick={() => handleServiceDonateClick('aqeeqah')} 
                  className="text-[#008080] font-medium hover:underline flex items-center"
                >
                  Donate for Aqeeqah <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Vows</h3>
                <p className="text-gray-600 mb-3">
                  Fulfill religious vows and pledges (Nadhr/Nazar) that you've made to Allah, 
                  while supporting our mission to provide food to those in need.
                </p>
                <button 
                  onClick={() => handleServiceDonateClick('vows')} 
                  className="text-[#008080] font-medium hover:underline flex items-center"
                >
                  Donate for Vows <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-[#008080]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Fulfill Your Religious Duties While Helping Others
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your sacrifice provides nutritious meat to families in need, combining spiritual 
            obligations with humanitarian service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#"
              onClick={handleDonateClick}
              className="px-8 py-4 text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all"
            >
              Donate Now
            </a>
            <Link 
              href="/volunteer?program=sacrifice" 
              className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
};

// Main component wrapped with DonationProvider
const SacrificePage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="sacrifice">
        <SacrificePageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default SacrificePage;