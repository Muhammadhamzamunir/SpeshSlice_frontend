import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiPackage } from "react-icons/bi"; // Delivery icon
import { RiUserAddLine } from "react-icons/ri"; // Registration icon
import { AiOutlineMessage } from "react-icons/ai"; // Chat icon

export default function OurServices() {
  return (
    <div className="flex p-2 justify-between md:flex-nowrap flex-wrap  bg-gradient-to-r from-gradient-1 to-gradient-5  ">
      <div>
        <img src="./src/assets/images/servicesBoy.png" alt="" />
      </div>
      <div className="flex w-full md:w-1/2 gap-4 flex-wrap  md:p-6 justify-center">
        <div className="flex border rounded-2xl w-[47%] shadow-2xl p-4 h-36 items-center justify-center  ">
          <div className="text-5xl ">
            <MdOutlineLocalOffer />
          </div>
          <div>
            <p>Best Prices with Discounts</p>
            <p>Order upto $10</p>
          </div>
        </div>
        <div className="flex border p-4 rounded-2xl w-[47%] shadow-2xl h-36 items-center justify-center ">
          <div className="text-5xl ">
            <RiUserAddLine />
          </div>
          <div>
            <p>Earn through Register bakery</p>
            {/* <p>Order upto $50</p> */}
          </div>
        </div>
        <div className="flex border rounded-2xl shadow-2xl w-[47%] p-4 h-36 items-center justify-center ">
          <div className="text-5xl ">
            <BiPackage />
          </div>
          <div>
           
            <p>Offering Free home delivery </p>
          </div>
        </div>
        <div className="flex border p-4 h-36 rounded-2xl w-[47%] shadow-2xl items-center justify-center ">
          <div className="text-5xl ">
            <AiOutlineMessage />
          </div>
          <div>
           
            <p>Chat With Bakery owner</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
