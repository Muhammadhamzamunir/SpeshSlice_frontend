import React from 'react';
import Rating from 'react-rating-stars-component';

const FilteredBakeryCard = ({ name, imgSrc, rating }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-full xl:w-full mt-5 mb-5">
      <div className="bg-white rounded-lg border-gray-200 border-[1px] shadow-md hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Right column for bakery image */}
          <div className="w-full md:w-1/2 p-4 md:order-2">
            <img src={imgSrc} alt="Bakery Image" className="rounded-full h-20 w-20 mx-auto md:mx-0 md:ml-auto" />
          </div>
          {/* Left column for bakery name and rating */}
          <div className="w-full md:w-1/2 p-4 md:order-1">
            <p className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-8">{name}</p>
            <Rating
              count={5}
              size={20}
              value={parseFloat(rating)}
              edit={false}
              isHalf={true}
              activeColor="#ff579a"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredBakeryCard;
