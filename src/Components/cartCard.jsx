import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

const CartCard = ({ image, name, unitPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const subtotal = quantity * unitPrice;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-full lg:w-full xl:w-full mt-5 mb-5 ">
      
      <div className="w-full border border-gray-300 p-4 flex flex-col md:flex-row md:gap-5 items-center">
        <img src={image} alt="Product" className="w-32 md:mr-4 border border-gray-300 p-5" />
       
        <div>
          <h3 className="font-bold text-lg mb-2 md:mr-56">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <span className="ml-2 text-slate-500 ">5.0 (100 reviews)</span>
          </div>
        </div>
        <span className="font-bold    text-slate-500 mr-2">${unitPrice}</span>


        <div className="mb-2 flex  md:justify-left mt-3 ">
          <div className="w-[100px]">
            <div className="relative inline-flex flex-row items-stretch">
              <div className="mr-2">
                <div className="mb-3 pt-0 relative">
                  <input
                    readOnly
                    type="text"
                    className="border-[#ff579a] p-2 mr-0 text-lg w-full placeholder-pink-200 text-[#ff579a] bg-white rounded-md outline-none focus:ring-pink-500 focus:ring-1 focus:border-pink-500 border border-solid transition duration-200"
                    value={quantity}
                  />
                  <div className="absolute bottom-2 right-0 flex flex-col items-center w-8">
                    <BsChevronUp className="text-[#ff579a] cursor-pointer text-[12px] mb-2" onClick={handleIncrement} />
                    <BsChevronDown className="text-[#ff579a] cursor-pointer text-[12px]" onClick={handleDecrement} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" font-bold text-pink-400"> ${subtotal}</div>
        <div className=" font-bold text-slate-500"><MdOutlineDeleteForever /></div>
      </div>

    </div>
  );
};

export default CartCard;
