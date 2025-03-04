import React from 'react';
import Image from 'next/image';
import { Eye, Download } from 'lucide-react';

const AboutReports = () => {
  // Sample reports data - you can replace with actual data
  const reports = [
    {
      id: 1,
      year: 2023,
      title: "2023 Annual Report",
      image: "/images/reports/annual-report-2023.jpg",
      viewUrl: "/reports/annual-report-2023",
      downloadUrl: "/reports/annual-report-2023.pdf"
    },
    {
      id: 2,
      year: 2022,
      title: "2022 Annual Report",
      image: "/images/reports/annual-report-2022.jpg",
      viewUrl: "/reports/annual-report-2022",
      downloadUrl: "/reports/annual-report-2022.pdf"
    },
    {
      id: 3,
      year: 2021,
      title: "2021 Annual Report",
      image: "/images/reports/annual-report-2021.jpg",
      viewUrl: "/reports/annual-report-2021",
      downloadUrl: "/reports/annual-report-2021.pdf"
    }
  ];

  return (
    <div className="py-8">
      <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-6">
        Annual Reports
      </h2>
      <p className="text-gray-700 mb-10">
        Our annual reports provide transparent insights into our organizational activities, financial statements, and impact metrics. Review our yearly progress and achievements in delivering humanitarian aid and community development.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
            {/* Report Image */}
            <div className="relative h-48 w-full">
              <Image
                src={report.image}
                alt={`Cover of ${report.title}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback image if the report cover fails to load
                  e.currentTarget.src = "https://via.placeholder.com/400x250?text=Annual+Report";
                }}
              />
            </div>
            
            {/* Report Details */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#09869a] mb-4">
                {report.title}
              </h3>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <a 
                  href={report.viewUrl} 
                  className="flex items-center justify-center gap-2 bg-[#09869a] text-white py-2 px-4 rounded-md hover:bg-[#09869a]/90 transition-colors flex-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </a>
                <a 
                  href={report.downloadUrl} 
                  className="flex items-center justify-center gap-2 bg-[#FA6418] text-white py-2 px-4 rounded-md hover:bg-[#FA6418]/90 transition-colors flex-1"
                  download
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutReports;