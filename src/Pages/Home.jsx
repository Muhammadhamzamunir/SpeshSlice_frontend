import React from 'react';
import { Link } from 'react-router-dom';
import Feedback from '../Components/Feedback/Feedback';
import HeroSection from '../Components/Hero';
import Categorywidgets from '../Components/Categorywidgets/Categorywidgets';
import TopRatedBakeries from '../Components/TopRatedBakeries/TopRatedBakeries';
import TopRatedProducts from '../Components/TopRatedProducts/TopRatedProducts';
import BakeriesAndProductsNearUser from '../Components/BakeriesAndProductsNearUser/BakeriesAndProductsNearUser';
import OurServices from '../Components/OurServices/OurServices';
import RecentlyAdded from '../Components/RecentlyAded/RecentlyAded';
import PartyItemCard from '../Components/PartyItemCard.jsx';

export default function Home() {
  return (
    <div>
      <div>
        <Feedback />
      </div>

      <HeroSection />
      <div className='px-6'>
        <h1 className="my-6 font-bold text-2xl text-left"> Featured Categories</h1>

        <Categorywidgets />
        
        <div className='flex justify-between items-center'>
          <h1 className="my-6 font-bold text-2xl text-left">Top Rated Bakeries</h1>
          <Link to="/bakeries"><p className='text-pink-500'>View All</p></Link>
        </div>
        <TopRatedBakeries />
        <div className='flex justify-between items-center'>
          <h1 className="my-6 font-bold text-2xl text-left">Top Rated Products</h1>
          <Link to="/products"><p className='text-pink-500'>View All</p></Link>
        </div>
        <TopRatedProducts />
        <div className='flex justify-between items-center'>
          <h1 className="my-6 font-bold text-2xl text-left">Party Items</h1>
          <Link to="/products?category=Party Items"><p className='text-pink-500'>View All</p></Link>
        </div>

        <PartyItemCard />
       
      </div>
      <OurServices />
      <RecentlyAdded />
      
      <BakeriesAndProductsNearUser />
    </div>
  );
}





























// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Feedback from '../Components/Feedback/Feedback';
// import HeroSection from '../Components/Hero';
// import Categorywidgets from '../Components/Categorywidgets/Categorywidgets';
// import TopRatedBakeries from '../Components/TopRatedBakeries/TopRatedBakeries';
// import TopRatedProducts from '../Components/TopRatedProducts/TopRatedProducts';
// import BakeriesAndProductsNearUser from '../Components/BakeriesAndProductsNearUser/BakeriesAndProductsNearUser';
// import OurServices from '../Components/OurServices/OurServices';
// import RecentlyAdded from '../Components/RecentlyAded/RecentlyAded';
// import PartyItemCard from '../Components/PartyItemCard.jsx';
// import Index from '../Components/API';

// export default function Home() {
//   const { APIcall } = Index();
//   const [loading, setLoading] = useState(true);
//   const [partyItems, setPartyItems] = useState([]);

//   useEffect(() => {
//     APIcall('/products', 'GET')
//       .then((data) => {
//         // Filter the party items based on the category name
//         const filteredPartyItems = data.data.filter(item => item.category.name === 'Party Items');
//         setPartyItems(filteredPartyItems);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <div>
//         <Feedback />
//       </div>

//       <HeroSection />
//       <div className='px-6'>
//         <h1 className="my-6 font-bold text-2xl text-left"> Featured Categories</h1>

//         <Categorywidgets />
//         <div className='flex justify-between items-center'>
//           <h1 className="my-6 font-bold text-2xl text-left">Top Rated Bakeries</h1>
//           <Link to="/bakeries"><p className='text-pink-500'>View All</p></Link>
//         </div>

//         <div className='flex flex-wrap'>
//           {loading ? (
//             [...Array(8)].map((_, index) => (
//               <div className="lg:w-[25%] md:w-1/2 w-full sm:w-1/2 p-2 cursor-pointer" key={index}>
//                 <div className="bg-white border rounded-lg overflow-hidden relative hover:shadow-xl">
//                   <div className="p-4">
//                     <Skeleton height={125} style={{ borderRadius: '10px', margin: "auto" }} />
//                     <p className='text-gray-400 text-[14px] mt-2'><Skeleton height={15} width={40} style={{ borderRadius: '10px' }} /></p>
//                     <h2 className="text-lg font-bold text-ellipsis"><Skeleton height={15} style={{ borderRadius: '10px' }} /></h2>
//                     <div className='flex gap-1 items-center'><Skeleton height={15} width={100} style={{ borderRadius: '10px' }} /></div>
//                     <div className="text-xs text-gray-400 cursor-pointer"><Skeleton height={15} width={60} style={{ borderRadius: '10px' }} /></div>
//                     <div className="flex items-center justify-between mt-3">
//                       <div className="product-price"><Skeleton height={15} width={40} style={{ borderRadius: '10px' }} /></div>
//                       <div className="add-cart "><Skeleton height={40} width={100} style={{ borderRadius: '10px' }} /></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             partyItems.map((item, index) => (
//               <div className="lg:w-[25%] md:w-1/2 w-full sm:w-1/2 p-2 cursor-pointer" key={index}>
//                 <PartyItemCard
//                   imageSrc={item.image_url}
//                   title={item.name}
//                   price={item.price}
//                   rating={parseFloat(item.rating)}
//                 />
//               </div>
//             ))
//           )}
//         </div>

//         <TopRatedBakeries />
//         <div className='flex justify-between items-center'>
//           <h1 className="my-6 font-bold text-2xl text-left">Top Rated Products</h1>
//           <Link to="/products"><p className='text-pink-500'>View All</p></Link>
//         </div>
//         <TopRatedProducts />
//         <BakeriesAndProductsNearUser />
//       </div>
//       <OurServices />
//       <RecentlyAdded />
//     </div>
//   );
// }
