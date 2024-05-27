import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import HeroImage from '../assets/images/cake.png';
import backgroundImage from '../assets/images/heroImage3.jpg';
import "../Pages/CSS/Hero.CSS";
import Button from './Button';
import { Link } from 'react-router-dom';
import { useUserData } from './UserAuthentication(ContextApi)';
const HeroSection = () => {
    const { userInfo } = useUserData();
    
    return (
        <div className="w-full  md:hero-fix bg-cover bg-center md:bg-right relative">
            {/* Desktop overlay */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-white opacity-0"></div>
            {/* Mobile overlay */}
            <div className="md:hidden absolute top-0 left-0 w-full h-full bg-white opacity-50"></div>
            <div className="bg-cover md:bg-center bg-right" style={{ backgroundImage: `url(${backgroundImage})`, objectFit:"cover", backgroundPosition:"100% 100%" }}>
                <div className="p-0 flex items-center overflow-hidden relative h-[500px]">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap -mx-4 items-center">
                            <div className="px-4 relative w-full md:w-6/12">
                                <h1 className="text-[30px] md:text-[60px] font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Sign Up Today and Become a Seller on Our Cake Marketplace!</h1>

                                <div className='flex gap-3'>
                                {
                                    userInfo.user.isBakeryRegistered ? (<Link to="/bakery"> <Button >
                                        Go To Your Store
                                        <FaArrowRight />
                                    </Button>
                                    </Link>) : (<Link to="/register-bakery"> <Button >
                                        Register Your Bakery Now
                                        <FaArrowRight />
                                    </Button>
                                    </Link>)
                                }
                                <Link to="/customize-cake"> <Button >
                                        Customize Cake
                                        
                                    </Button>
                                    </Link>
                                </div>
                                {/* <div className="rounded text-left p-6 flex items-start">
                                    <div className="bg-white rounded-full justify-center items-center inline-flex text-center w-12 h-12 text-blueGray-700"><FaBirthdayCake size={24} /></div>
                                    <div className="ml-6 flex-1">
                                        <h4 className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent text-2xl font-semibold leading-tight mt-2 mb-2">Celebrate Special Moments</h4>
                                        <p className="text-white opacity-60">Make your celebrations unforgettable with our delectable cakes, perfect for birthdays, weddings, and more.</p>
                                    </div>
                                </div>
                                <div className="rounded text-left p-6 flex items-start">
                                    <div className="bg-white rounded-full justify-center items-center inline-flex text-center w-12 h-12 text-blueGray-700"><FaHeart size={24} /></div>
                                    <div className="ml-6 flex-1">
                                        <h4 className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent text-2xl font-semibold leading-tight mt-2 mb-2">Made with Love</h4>
                                        <p className="text-white opacity-60">Our cakes are crafted with care and passion, using only the finest ingredients to ensure a delightful experience with every bite.</p>
                                    </div>
                                </div>
                                <div className="rounded text-left p-6 flex items-start">
                                    <div className="bg-white rounded-full justify-center items-center inline-flex text-center w-12 h-12 text-blueGray-700"><FaUtensils size={24} /></div>
                                    <div className="ml-6 flex-1">
                                        <h4 className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent text-2xl font-semibold leading-tight mt-2 mb-2">Taste the Difference</h4>
                                        <p className="text-white opacity-60">Experience the perfect blend of flavors and textures in every slice, crafted by our expert bakers with years of experience.</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
