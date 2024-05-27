import React, { useState, useEffect } from 'react';
import Rating from 'react-rating-stars-component';
import Index from '../API';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
const RecentlyAdded = () => {
    const { APIcall } = Index();
    const fetchproducts = async () => {
        const response = await APIcall('/products', 'GET');
        return response.data.sort((a, b) => b.id - a.id);
    };

    const { data: products, isLoading, isError } = useQuery('recentelyAdded', fetchproducts);







    return (
        isLoading ? (
            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-semibold mb-4">Recently Added Products</h2>
                <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((product, index) => (
                        <div key={index} className=" border hover:scale-105 border-gray-200 rounded-md p-2 transform transition duration-300  cursor-pointer"

                        >
                            <div className='flex gap-3'>

                                <Skeleton className="w-32 h-32 object-cover mb-2 rounded-md" />
                                <div className='flex flex-col'>
                                    <Skeleton className="w-40 h-5 rounded mb-9" />
                                    <Skeleton className="w-20 h-5 rounded" />
                                    <Skeleton className="w-20 h-5 rounded" />
                                    <Skeleton className="w-16 h-5 rounded" />
                                </div>
                                <div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        ) : (
            <div className='p-4'>
                <h1 className="my-6 font-bold text-2xl  text-left">Recently Added Products</h1>
                <div className="grid grid-cols-3 gap-1">
                    {products.map((product, index) => (
                        <div key={index} className=" border hover:scale-105 border-gray-200 rounded-md p-2 transform transition duration-300  cursor-pointer"

                        >
                            <Link to={`/product/${product.id}`}>
                                <div className='flex gap-3'>

                                    <img src={product.image_url} alt={product.name} className="w-32 h-32 object-cover mb-2 rounded-md" />
                                    <div><h3 className="text-lg font-semibold mb-1">{product.name}</h3>

                                        <p className="text-gray-800 mt-1">

                                            {product.discounts.length > 0 ? (
                                                <>
                                                    <br />

                                                    Standard Price:<s> ${parseFloat(product.price).toFixed(2)}</s>

                                                </>
                                            )
                                                :
                                                (<>Standard Price: ${parseFloat(product.price).toFixed(2)}</>)
                                            }
                                            {product.discounts.length > 0 && (
                                                <>
                                                    <br />
                                                    Discounted Price: ${parseFloat(product.price - (product.price * product.discounts[0].discount_percentage / 100)).toFixed(2)}
                                                </>
                                            )}
                                            {product.discounts.length < 0 && (
                                                <>
                                                    <br />
                                                    No Discount
                                                </>
                                            )}
                                        </p>
                                        <Rating
                                            count={5}
                                            size={16}
                                            value={parseFloat(product.rating)}
                                            edit={false}
                                            isHalf={true}
                                            activeColor="#ff579a"
                                            className="mt-4"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        )
    );
};

export default RecentlyAdded;
