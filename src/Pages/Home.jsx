import React, { useState } from 'react'
import LoginButton from '../Components/Button'
import Card from '../Components/card'
import SimpleImageSlider from "react-simple-image-slider";
import Button from '../Components/Button';
import Input from '../Components/Input';
import Dropdown from '../Components/Dropdown';
import GraphComponent from '../Components/GraphComponent/GraphComponent';
import ProductCard from '../Components/ProductCard';
import BannerCard from '../Components/shopCard';
// import NearbyBakeriesRegistration from '../Components/Model';
import ModalExample from '../Components/Model';
import RegisterBakery from './RegisterBakery';
import ProductDetail from './ProductDetail';
import TopRatedProducts from '../Components/TopRatedProducts/TopRatedProducts';
import HeroSection from '../Components/Hero';
import TopRatedBakeries from '../Components/TopRatedBakeries/TopRatedBakeries';
import MyLocation from '../Components/Location';
import BakeryRegistrationForm from '../Components/BakeryRegisterationForm';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Feedback from '../Components/Feedback/Feedback';
import Categorywidgets from '../Components/Categorywidgets/Categorywidgets';
import BakeriesAndProductsNearUser from '../Components/BakeriesAndProductsNearUser/BakeriesAndProductsNearUser';
import { Link } from 'react-router-dom';
import OurServices from '../Components/OurServices/OurServices';
import RecentlyAdded from '../Components/RecentlyAded/RecentlyAded';
import BakeryDetails from '../Components/BakeryDetailsAndEdits';
import CustomizeCake from './CustomizeCake';
export default function Home() {

  const images = [
    { url: "./src/assets/images/cake.png" },
    { url: "./src/assets/images/cake.png" },
    { url: "./src/assets/images/cake.png" },

  ];





  return (
    <div>

      <div>
        <Feedback />




      </div>



      <HeroSection />
      <div className='px-6'>
        <h1 className="my-6 font-bold text-2xl  text-left"> Featured Categories</h1>


        <Categorywidgets />
        <div className='flex justify-between items-center'>
          <h1 className="my-6 font-bold text-2xl  text-left">Top Rated Bakeries</h1>
          <Link to="/bakeries"><p className='text-pink-500'>View All</p></Link>
        </div>
        <TopRatedBakeries />
        <div className='flex justify-between items-center'>
          <h1 className="my-6 font-bold text-2xl  text-left">Top Rated Products</h1>
          <Link to="/products"><p className='text-pink-500'>View All</p></Link>
        </div>
        <TopRatedProducts />
        <BakeriesAndProductsNearUser />

      </div>
      <OurServices />
      {/* <RecentlyAdded /> */}




    </div>

  )
}
