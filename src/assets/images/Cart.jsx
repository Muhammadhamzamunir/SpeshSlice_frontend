import React, { useState } from 'react';
import CartCard from "../Components/cartCard";
import cake from "../assets/images/cake.png";
import { MdOutlineDeleteForever } from "react-icons/md";
import Button from '../Components/Button';
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
export default function Cart() {
    const product = {
        image: cake,
        name: 'Sample Product',
        unitPrice: 25,
      };


      const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
   <div>
         <div className="flex flex-col md:flex-row ">
    <div className="bg-white shadow rounded-lg p-6 mb-6 w-full md:w-[70%]">
    <div className="flex flex-col md:flex-row justify-between">
    <div className=" p-2">
    <h1 className="text-4xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-2">Your Cart</h1>
    <p className="text-slate-500">You have 3 items in the Cart</p>
  </div>
  <div className="  p-2 mt-auto md:mr-3">
    <button className='text-slate-500 flex gap-2 cursor-pointer text-xl items-center'>Clear Cart <MdOutlineDeleteForever /></button>
  </div>
 
  
</div>
        {/* <div className="container flex flex-wrap gap-4 items-center mt-5 mb-5 bg-slate-300">
          
        </div> */}
        <div className="scroll-container overflow-y-auto" style={{ maxHeight: '500px', scrollbarWidth: 'thin', scrollbarColor: '#ff579a transparent', paddingRight: '15px' }}>
        <CartCard
        image={product.image}
        name={product.name}
        unitPrice={product.unitPrice}
      />
        </div>
        <div className="scroll-container overflow-y-auto" style={{ maxHeight: '500px', scrollbarWidth: 'thin', scrollbarColor: '#ff579a transparent', paddingRight: '15px' }}>
        <CartCard
        image={product.image}
        name={product.name}
        unitPrice={product.unitPrice}
      />
        </div>
       

        <div className="flex flex-col-reverse md:flex-row justify-between">
  {/* Right column for product image */}
  <Button className="w-half">
  <FaArrowLeft />
                        Continue Shopping
                        
                      </Button>
  <Button className="w-half md:mr-3">
                        Update Cart
                        <LuRefreshCw />
                      </Button>
 
  {/* Left column for product name */}
  
 
  
</div>
    </div>



  
    <div className=" md:block md:w-[30%] md:shadow md:rounded-lg md:p-6 md:mb-6 overflow-hidden relative md:pr-5">
            
           <div className=' border rounded-xl p-5 md:mt-32'>

            <div className=' flex justify-between p-3 border mb-3'>
              <p className='font-medium text-2xl text-slate-400' >Subtotal</p>
              <h3 className='font-bold text-3xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent'>$35</h3>
            </div>
            <div className=' flex justify-between p-3 border mb-3 '>
              <p className='font-semibold text-2xl text-slate-400' >Shipping</p>
              <h3 className='font-medium text-3xl text-slate-500'>Free</h3>
            </div>
            <div className=' flex justify-between p-3 border mb-3'>
              <p className='font-medium text-2xl text-slate-400' >Total</p>
              <h3 className='font-bold text-3xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent'>$35</h3>
            </div>

            <div className=' flex justify-between p-3 border mb-3'>
            <Button className="w-full">
 
                      Proceed To CheckOut
                        <FaArrowRightFromBracket />
                      </Button>
            </div>
           </div>
        </div>


        
</div>


</div>
 
  )
}
