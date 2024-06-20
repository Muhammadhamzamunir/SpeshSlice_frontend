import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { FaShoppingCart } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Index from '../API';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { useUserData } from '../UserAuthentication(ContextApi)';
import { toast } from 'react-toastify';
const TopRatedProducts = () => {
    const navigate = useNavigate();
    const { APIcall } = Index();
    const { userInfo } = useUserData();
    const fetchCategories = async () => {
        const response = await APIcall('/products', 'GET');
        localStorage.setItem("products",JSON.stringify(response.data))
        return response.data.sort((a, b) => b.rating - a.rating);
    };

    const { data: topRatedProducts, isLoading, isError } = useQuery('topRatedProducts', fetchCategories);

    const addToCarthandle = (product) => {
        if (userInfo.user) {
            let quantity = 1;
            APIcall(`/cart/${userInfo.user.id}/${product.id}/${quantity}`, 'POST')
        } else {
            navigate('/login')
        }

    }
    const NotAvailable = () => {
        if (userInfo.user) {
            toast.error("THIS PRODUCT IS NOT AVAILABLE", { position: "bottom-right", theme: "dark" });

        } else {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-wrap">
            {isLoading ? (
                [...Array(8)].map((_, index) => (

                    <div className="lg:w-[25%] md:w-1/2 w-full sm:w-1/2 p-2  cursor-pointer " key={index}>
                        <div className="bg-white border rounded-lg overflow-hidden  relative hover:shadow-xl">
                            <div className="p-4">
                                <Skeleton height={125} style={{ borderRadius: '10px', margin: "auto" }} />

                                <p className='text-gray-400 text-[14px] mt-2'> <Skeleton height={15} width={40} style={{ borderRadius: '10px' }} /></p>
                                <h2 className="text-lg  font-bold  text-ellipsis">
                                    <Skeleton height={15} style={{ borderRadius: '10px' }} />
                                </h2>
                                <div className='flex gap-1 items-center'>
                                    <Skeleton height={15} width={100} style={{ borderRadius: '10px' }} />
                                </div>
                                <div className="text-xs text-gray-400 cursor-pointer">
                                    <Skeleton height={15} width={60} style={{ borderRadius: '10px' }} />
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="product-price">
                                        <Skeleton height={15} width={40} style={{ borderRadius: '10px' }} />
                                    </div>
                                    <div className="add-cart ">
                                        <Skeleton height={40} width={100} style={{ borderRadius: '10px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            ) : (
                topRatedProducts.slice(0, 8).map((product, index) => (
                    <div className="lg:w-[25%] md:w-1/2 w-full sm:w-1/2 p-2  cursor-pointer " key={index}>
                        <div className="bg-white border rounded-lg overflow-hidden  relative hover:shadow-xl ">
                            {/* <div className="badge badge-secondary badge-outline absolute top-2 right-2">Sale</div> */}
                            <div className="p-4">

                                <Link to={`/product/${product.id}`} key={index}>
                                    <img className="w-[100%] object-cover m-auto aspect-square mb-4" src={product.image_url} alt="" />
                                    <p className='text-gray-400 text-[14px] mt-2'>{product.category.name}</p>
                                    <h2 className="text-lg  font-bold  text-ellipsis">
                                        {product.name}
                                    </h2>
                                    <div className='flex gap-1 items-center'>
                                        <Rating
                                            count={5}
                                            size={16}
                                            value={parseFloat(product.rating)}
                                            edit={false}
                                            isHalf={true}
                                            activeColor="#ff579a"
                                            className="mt-4"
                                        />
                                        <p className='text-gray-400'>({product.reviews_count})</p>
                                    </div>
                                    </Link>

                                    <div className="text-xs text-gray-400 cursor-pointer">
                                        By <Link to={`/bakery/${product.bakery?.id}`} className='text-[#ff59ac]'>{product.bakery?.business_name}</Link>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                    <Link to={`/product/${product.id}`} key={index}>

                                        <div className="product-price flex gap-2 items-center">
                                            {product.discounts.length > 0 && (
                                                <>

                                                    <p className='text-[#ff59ac] text-[20px]'> ${parseFloat(product.price - (product.price * product.discounts[0].discount_percentage / 100)).toFixed(2)}</p>
                                                </>
                                            )}
                                            {product.discounts.length > 0 ? (
                                                <>


                                                    <s className=' p-2 text-gray-400 text-[13px]'> ${parseFloat(product.price).toFixed(2)}</s>

                                                </>
                                            )
                                                :
                                                (<><p className='text-[#ff59ac] text-[20px]'>${parseFloat(product.price).toFixed(2)} </p></>)
                                            }

                                        </div>
                                </Link>
                                <div className="add-cart ">
                                    <Button className="w-full" onClick={product.is_available ? (()=>{addToCarthandle(product)}) : NotAvailable}>
                                        Add <FaShoppingCart />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                       
                    </div>
    ))
            )}
        </div >
    );
};

export default TopRatedProducts;

{/* <div className="flex justify-between items-center">
            <div className="product-action-1">
              <a aria-label="Add To Wishlist" className="action-btn" href="shop-wishlist.html">
                <i className="fi-rs-heart"></i>
              </a>
              <a aria-label="Compare" className="action-btn" href="shop-compare.html">
                <i className="fi-rs-shuffle"></i>
              </a>
              <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                <i className="fi-rs-eye"></i>
              </a>
            </div>
          </div> */}