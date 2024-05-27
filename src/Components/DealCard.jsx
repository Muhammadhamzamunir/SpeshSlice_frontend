import React from 'react';

export default function DealCard({ name, imgSrc, price,category }) {
 
  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-full xl:w-full mt-5 mb-5 ">
      <div className="bg-white rounded-lg border-gray-200 border-[1px] shadow-md hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Right column for product image */}
          <div className="w-full md:w-1/2 p-4 md:order-2">
            <img src={imgSrc} alt="Product Image" className="rounded-full h-20 w-20 mx-auto md:mx-0 md:ml-auto" />
          </div>
          {/* Left column for product name */}
          <div className="w-full md:w-1/2 p-4 md:order-1">
            <p className="text-slate-600 font-bold mb-2">{name}</p>
            <p className="text-slate-400 mb-1">{category}</p>
            <p className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
