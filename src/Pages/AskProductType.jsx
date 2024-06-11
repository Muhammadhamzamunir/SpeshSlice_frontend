import React from 'react';

import { Link,Outlet } from 'react-router-dom';
export default function AskProductType() {
    

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="flex gap-7 items-center justify-center">
                <Link to="/bakery/add-product-cake">
                    <div className="border-2 border-pink-500 rounded-lg p-4 cursor-pointer" >
                        <img src="/myLogo.png" alt="Cake" className="w-24 h-24 mb-2" />
                        <h1 className="text-pink-500">Is It Cake?</h1>
                    </div></Link>
                <Link to="/bakery/add-product-party-item">
                <div className="border-2 border-pink-500 rounded-lg p-4 cursor-pointer " >
                    <img src="/myLogo.png" alt="Party Item" className="w-24 h-24 mb-2" />
                    <h1 className="text-pink-500">Is It Party Item?</h1>
                </div>
                </Link>
            </div>
            
        </div>
    );
}
