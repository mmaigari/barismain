import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the message to your server here
    console.log('Message submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-[#09869a]/10 mr-4">
          <Phone className="h-8 w-8 text-[#09869a]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        Have questions or need assistance? We're here to help. Feel free to reach out using any of the methods below.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        {/* Contact Information */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-[#09869a] mr-4 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                <a href="mailto:info@barischarityfoundation.org" className="text-gray-600 hover:text-[#09869a]">
                  info@barischarity.org
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-[#09869a] mr-4 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-600">+234 (902) 155-1584</p>
                <p className="text-gray-600">+234 (902) 155-1584 (Donations)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-[#09869a] mr-4 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600">
                No. 22, Gidan Baba Dan masani,<br />
                Unity Road, Kano,<br />
                Kano State, Nigeria
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-[#09869a] mr-4 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/barischarityfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#09869a]/10 rounded-full hover:bg-[#09869a]/20 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-[#09869a]" />
                </a>
                <a 
                  href="https://facebook.com/barischarityfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#09869a]/10 rounded-full hover:bg-[#09869a]/20 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-[#09869a]" />
                </a>
                <a 
                  href="https://twitter.com/barischarityfdn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#09869a]/10 rounded-full hover:bg-[#09869a]/20 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-[#09869a]" />
                </a>
                <a 
                  href="https://youtube.com/barischarityfoundation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#09869a]/10 rounded-full hover:bg-[#09869a]/20 transition-colors"
                >
                  <Youtube className="h-5 w-5 text-[#09869a]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h2>
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your message has been sent successfully. We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="inline-flex items-center px-6 py-3 text-white bg-[#09869a] hover:bg-[#09869a]/90 rounded-md font-medium transition-colors"
                >
                  Send Message <Send className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <div className="aspect-[16/9] lg:aspect-[21/9] w-full h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0825364515762!2d-122.41941492356964!3d37.78092011202578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5959cf0!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1696532496069!5m2!1sen!2sus"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Bariş Charity Foundation Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;