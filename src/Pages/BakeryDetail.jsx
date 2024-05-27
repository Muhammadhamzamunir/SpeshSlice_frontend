import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import index from "../Components/API";
import Skeleton from "react-loading-skeleton";
import Rating from "react-rating-stars-component";
import { FaPhone, FaMailBulk, FaClock, FaMoneyBillAlt } from "react-icons/fa";
import DealCard from "../Components/DealCard";
import { FaRegClock } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import "./CSS/bakeryDetail.css";
export default function BakeryDetail() {
  const { APIcall } = index();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('product');
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [bakeryDetails, setBakeryDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    APIcall(`/bakery/${id}`, 'GET')
      .then((data) => {
        setBakeryDetails(data.data);
      })
      .catch((error) => {
        console.error('Error fetching bakery details:', error);
      });

    APIcall(`/address/${id}`, 'GET')
      .then((data) => {
        setAddresses(data.data);
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
      });
  }, [id]);


  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        {bakeryDetails ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent ">
                {bakeryDetails.business_name}
              </h2>
            </div>
            <div className="flex flex-col-reverse md:flex-row">

              <div className="md:w-1/3 md:pl-8 pl-0">


                <div className="flex items-center md:mt-4">
                  {/* <FaClock className="h-4 w-4  " /> */}
                  <p className="text-pink-500 mt-2 font-semibold">
                    {bakeryDetails.specialty}
                  </p>
                </div>

                <div className="flex items-center mt-4">
                  <FaClock className="h-4 w-4  " />
                  <p className="ml-2 text-gray-700">{bakeryDetails.timing}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FaPhone className="h-4 w-4  " />
                  <p className="ml-2 text-gray-700">{bakeryDetails.phone}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FaMailBulk className="h-4 w-4  " />
                  <p className="ml-2 text-gray-700">{bakeryDetails.email}</p>
                </div>
                <div className="flex items-center mt-2">
                  <FaMoneyBillAlt className="h-4 w-4  " />
                  <p className="ml-2 text-gray-700">
                    Price per pound: ${bakeryDetails.price_per_pound}
                  </p>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center items-center md:mb-2 mb-0">

                <div className="bg-white rounded-lg mb-6 md:mt-5 mt-3">
                  <div className="flex gap-2 items-center ">
                    <Rating
                      count={5}
                      value={parseFloat(bakeryDetails.averageRating)}
                      size={24}
                      activeColor="#ff59ac"
                      isHalf={true}
                      edit={false}
                    />
                    <p>({bakeryDetails.rating_count})</p>
                  </div>
                  <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">
                          Address 
                        </h3>
                        <p className="text-lg text-gray-800 mb-2">
                          {bakeryDetails.address.street}, {bakeryDetails.address.city}, {bakeryDetails.address.country}
                        </p>
                      </div>
                  
                </div>

              </div>
              <img
                src={bakeryDetails.logo_url}
                alt="Bakery Logo"
                className="w-36 h-36 object-cover rounded-full border-2 md:ml-auto mt-10"
              />
            </div>
          </>
        ) : (
          <Skeleton count={1} height={200} className="w-full" />
        )}
      </div>
      <div className="flex flex-col md:flex-row ">
        <div className="bg-white shadow rounded-lg p-6 mb-6 w-full md:w-[80%]">
          <div className="container flex flex-wrap gap-4 items-center mt-5 mb-5">
            <p className={`px-2 py-1 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'bakery' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('product')}>Products</p>
            {/* <p className={`px-2 py-1 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'description' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('deal')}>Deals</p> */}
            <p className={`px-2 py-1 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'reviews' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('reviews')}>Reviews ({bakeryDetails?.reviews?.length})</p>
          </div>
          <div className="scroll-container overflow-y-auto" style={{ maxHeight: '500px', scrollbarWidth: 'thin', scrollbarColor: '#ff579a transparent', paddingRight: '15px' }}>
            {activeTab === 'product' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Products</h2>
                {bakeryDetails?.products?.map((product, index) => (
                  <Link to={`/product/${product.id}`}>
                  <DealCard
                    key={index}
                    name={product.name}
                    category={product.category.name}
                    imgSrc={product.image_url}
                    price={product.price}
                  /></Link>
                ))}
              </div>
            )}
            {/* {activeTab === 'deal' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Deals</h2>
                {bakeryDetails.deals.map((deal, index) => (
                  <DealCard
                    key={index}
                    name={deal.name}
                    imgSrc={deal.image_url}
                    price={deal.price}
                  />
                ))}
              </div>
            )} */}
            {activeTab === 'reviews' && (
              <div className="reviews-container">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Reviews</h2>
                {bakeryDetails?.reviews?.map((review, index) => (
                  <div key={index} className="review-card border p-2 md:p-4 rounded-xl mb-4">
                    <div className="flex items-center">
                      <div className="user-info items-start">
                        <img src={review.user.profile_url} alt={review.user.username} className="user-avatar h-20 md:h-32 w-20 md:w-32" />
                      </div>
                      <div className="review-content">
                        <div className="flex items-center md:gap-4 gap-4">
                          <p className="username font-semibold md:text-[20px]">{review.user.username}</p>
                          <p className="text-gray-400 flex items-center gap-[2px]">
                            <FaRegClock />
                            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="mb-3 flex gap-1 items-center">
                          <Rating
                            count={5}
                            size={16}
                            value={parseFloat(review.rating)}
                            edit={false}
                            isHalf={true}
                            activeColor="#ff579a"
                          />
                          <p className="text-gray-500">({review.rating})</p>
                        </div>
                      </div>
                    </div>
                    <p className="description text-gray-500 md:pl-[15%] pl-7">{review.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Hidden on small screens */}
        <div className="hidden md:block w-[20%] md:shadow md:rounded-lg md:p-6 md:mb-6 overflow-hidden relative md:pr-5">
          <div className="absolute top-0 animate-slideUp md:flex md:flex-col justify-center items-center" style={{ animation: 'slideUp 60s linear infinite', animationIterationCount: 'infinite', height: '100%' }}>
            <img src="../src/assets/images/girlwithcake.jpg" alt="" className="block mb-6" style={{}} />
            <img src="../src/assets/images/cycleshop.jpg" alt="" className="block mb-6" style={{ animationDelay: '-10s' }} />
            <img src="../src/assets/images/3.jpg" alt="" className="block mb-6" style={{ animationDelay: '-20s' }} />
            <img src="../src/assets/images/customization.jpg" alt="" className="block mb-6" style={{ animationDelay: '-30s' }} />
            <img src="../src/assets/images/1.jpg" alt="" className="block mb-6" style={{ animationDelay: '-40s' }} />
            <img src="../src/assets/images/bakery.jpg" alt="" className="block mb-6" style={{ animationDelay: '-50s' }} />
            <img src="../src/assets/images/girlwithcake.jpg" alt="" className="block mb-6" style={{ animationDelay: '-60s' }} />
            <img src="../src/assets/images/cycleshop.jpg" alt="" className="block mb-6" style={{ animationDelay: '-70s' }} />
            <img src="../src/assets/images/3.jpg" alt="" className="block mb-6" style={{ animationDelay: '-80s' }} />
            <img src="../src/assets/images/customization.jpg" alt="" className="block mb-6" style={{ animationDelay: '-90s' }} />
            <img src="../src/assets/images/1.jpg" alt="" className="block mb-6" style={{ animationDelay: '-100s' }} />
            <img src="../src/assets/images/bakery.jpg" alt="" className="block mb-6" style={{ animationDelay: '-110s' }} />
          </div>
        </div>
      </div>

    </div>

  );
}
{/* <Skeleton count={3} height={100} className="w-full h-24 mb-4" /> */ }