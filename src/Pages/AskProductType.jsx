import React from 'react';

import { Link,Outlet } from 'react-router-dom';
export default function AskProductType() {
    

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="flex gap-7  flex-col md:flex-row items-center justify-center">
                <Link to="/bakery/add-product-cake">
                    <div className="border-2 border-pink-300 rounded-lg p-4 cursor-pointer" >
                        <img src="/cake.png" alt="Cake" className="w-44 h-44 mb-2" />
                        <h1 className="text-pink-500 text-center">Is It Cake?</h1>
                    </div></Link>
                <Link to="/bakery/add-product-party-item">
                <div className="border-2 border-pink-300 rounded-lg p-4 cursor-pointer " >
                    <img src="/partyItem.png" alt="Party Item" className="w-44 h-44 mb-2" />
                    <h1 className="text-pink-500 text-center">Is It Party Item?</h1>
                </div>
                </Link>
            </div>
            
        </div>
    );
}
