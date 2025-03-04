export default function ContactUsPage() {
  return (
    <div>
      <h1 className="font-montserrat text-3xl font-bold text-[#09869a] mb-4">Contact Us</h1>
      <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="mb-6 text-gray-700">
            We'd love to hear from you! Please call us or use one of the contact methods below:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Phone</h3>
              <p className="text-gray-700">+1 (234) 567-8900</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Email</h3>
              <p className="text-gray-700">info@barischarity.org</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Address</h3>
              <p className="text-gray-700">
                123 Charity Avenue<br />
                Suite 456<br />
                Humanitarian City, HC 12345<br />
                United States
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Office Hours</h3>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Locations</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600">Map placeholder</p>
              {/* You would typically embed a Google Map or similar here */}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#09869a]">
                Facebook
              </a>
              <a href="#" className="text-gray-500 hover:text-[#09869a]">
                Twitter
              </a>
              <a href="#" className="text-gray-500 hover:text-[#09869a]">
                Instagram
              </a>
              <a href="#" className="text-gray-500 hover:text-[#09869a]">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}