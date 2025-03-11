import React from 'react';

type AnimalOfferingProps = {
  type: string;
  category: string;
  prices: {
    description: string;
    price: number;
  }[];
  onSelect: (type: string, price: number) => void;
};

const AnimalOfferingCard = ({ type, category, prices, onSelect }: AnimalOfferingProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{type}</h3>
        <div className="space-y-3 mb-4">
          {prices.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{item.description}</span>
              <span className="font-semibold">${item.price}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button 
            className="bg-[#008080] hover:bg-[#006666] text-white py-2 px-4 rounded-md transition w-full"
            onClick={() => onSelect(`${category} - ${type}`, prices[0].price)}
          >
            {prices.length > 1 ? 'Select Option' : 'Donate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalOfferingCard;