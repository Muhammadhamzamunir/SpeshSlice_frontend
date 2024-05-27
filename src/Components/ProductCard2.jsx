import React from 'react';
import Button from './Button';
import { FaShoppingCart } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const ProductCard = ({ product }) => {
  // Check if product is undefined or null
  if (!product) {
    return null; // Or any other fallback UI
  }

  // Check if product.image_url exists before accessing it
  const imageUrl = product.image_url ? product.image_url : '';

  return (
    <div className="w-full p-2 cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <div className="bg-white border rounded-lg overflow-hidden relative hover:shadow-xl">
          <div className="p-4">
            <img className="w-[100%] object-cover m-auto aspect-square mb-4" src={imageUrl} alt="" />
            <p className='text-gray-400 text-[14px] mt-2'>{product.category?.name}</p>
            <h2 className="text-lg font-bold text-ellipsis">
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
            <div className="text-xs text-gray-400 cursor-pointer">
              By <Link to={`/bakery/${product.bakery?.id}`} className='text-[#ff59ac]'>{product.bakery?.business_name}</Link>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="product-price">
                <span className="text-[#ff59ac]">${product.price}</span>
              </div>
              <div className="add-cart">
                <Button className="w-full">
                  Add <FaShoppingCart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
