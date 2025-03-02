import React from 'react';
import { 
  FaMapMarkerAlt, FaEnvelope, FaPhone, 
  FaUniversity, FaFileAlt 
} from 'react-icons/fa';

const AboutRegistration = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-6 text-center">
          Legal Status & Registration
        </h2>
        <div className="w-20 h-1.5 bg-[#FA6418] rounded-full mb-8 mx-auto"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-2xl text-[#09869a] mr-4" />
              <h3 className="text-xl font-bold text-gray-800">Office Locations</h3>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Registered Office:</strong> No. 8 Ahmed Talib Street, NNDC QTRS, Sharada Kano, Kano State, Nigeria.
            </p>
            <p className="text-gray-700">
              <strong>Corporate Headquarters:</strong> No. 22, Gidan Baba Dan masani, Unity Road, Kano State, Nigeria.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-2xl text-[#09869a] mr-4" />
              <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> barischarutyfoundation@gmail.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +234 902 155 1584
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaUniversity className="text-2xl text-[#09869a] mr-4" />
              <h3 className="text-xl font-bold text-gray-800">Banking Details</h3>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Bank:</strong> Guarantee Trust Bank
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Swift Code:</strong> GTBINGLA
            </p>
            <p className="text-gray-700">
              <strong>Account (Euro):</strong> 0624917813
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaFileAlt className="text-2xl text-[#09869a] mr-4" />
              <h3 className="text-xl font-bold text-gray-800">Registration Information</h3>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Registration Number:</strong> CAC/IT/NO 155156
            </p>
            <p className="text-gray-700 mb-2">
              <strong>TIN:</strong> 23820441-0001
            </p>
            <p className="text-gray-700">
              <strong>SCUML Certificate:</strong> Compliant with anti-money laundering policies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRegistration;