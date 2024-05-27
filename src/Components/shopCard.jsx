import React from 'react';
import Button from './Button';
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const BannerCard = ({ bakery }) => {
  return (
    <div className="rounded-xl flex px-5 py-8 justify-center items-center space-x-2 mr-0 md:mr-4">
      <div className="w-[65%] justify-start text-left">
        <h2 className="text-2xl font-semibold text-gray-800">{bakery.business_name}</h2>
        <div className='flex gap-1 items-center'>
          <Rating
            count={5}
            size={20}
            value={parseFloat(bakery.averageRating)}
            edit={false}
            isHalf={true}
            activeColor="#ff579a"
            className="mt-4"
          />
          <p>({bakery.rating_count})</p>
        </div>
        <Button className=" mt-4 rounded-md">
          <Link to={`/bakery/${bakery.id}`}>Visit Now</Link>
          <IoMdArrowRoundForward />
        </Button>
      </div>
      <div className="w-[40%]">
        <img src={bakery.logo_url} alt={bakery.business_name} className="w-full" />
      </div>
    </div>
  );
};

export default BannerCard;
