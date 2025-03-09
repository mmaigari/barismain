import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

interface CampaignUpdatesProps {
  campaignId: string;
  accentColor: string;
  updates: Update[];
}

const CampaignUpdates: React.FC<CampaignUpdatesProps> = ({ 
  campaignId,
  accentColor,
  updates 
}) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Latest Updates</h3>
      
      {updates.length > 0 ? (
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {update.imageUrl && (
                <div className="relative h-48 w-full">
                  <img 
                    src={update.imageUrl} 
                    alt={update.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" style={{ color: accentColor }} />
                  <span>{update.date}</span>
                </div>
                
                <h4 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
                  {update.title}
                </h4>
                
                <div className="text-gray-700 prose-sm">
                  <p>{update.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No updates yet for this campaign.</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon for the latest information.</p>
        </div>
      )}
    </div>
  );
};

export default CampaignUpdates;