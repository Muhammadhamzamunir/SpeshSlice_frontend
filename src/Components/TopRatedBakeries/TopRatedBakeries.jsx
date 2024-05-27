// import React, { useEffect, useState } from 'react';
// import Carousel from 'react-multi-carousel';
// import { useQuery } from 'react-query';
// import 'react-multi-carousel/lib/styles.css';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Button from '../Button';
// import index from '../API';
// import Rating from 'react-rating-stars-component';
// import { Link } from 'react-router-dom';
// export default function TopRatedBakeries() {

//     const { APIcall } = index();
//     // const [topRatedBakeries, setTopRatedBakeries] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];


//      const fetchCategories = async () => {
//         const response = await APIcall('/bakery','GET');
//         return response.data.sort((a, b) => b.averageRating - a.averageRating);
//     };

//     const { data: topRatedBakeries, loading, isError } = useQuery('topRatedBakeries', fetchCategories);


//     // useEffect(() => {
//     //     APIcall('/bakery', 'GET')
//     //         .then((data) => {

//     //             setTopRatedBakeries(data.data.sort((a, b) => b.averageRating - a.averageRating));

//     //         })
//     //         .catch((error) => {
//     //             console.error('Error fetching top rated bakeries:', error);
//     //         })
//     //         .finally(() => {
//     //             setLoading(false);
//     //         });
//     // }, []);

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 1
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 3,
//             partialVisibilityGutter: 40
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     };

//     return (
//         <div>
//             {loading ? (
//                 <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-skeleton w-[90%] m-auto">
//                     {[...Array(3)].map((_, index) => (
//                         <div key={index} className="shadow-lg my-12">
//                             <Skeleton height={220} style={{ borderRadius: '10px', }} />
//                         </div>
//                     ))}
//                 </Carousel>
//             ) : (
//                 <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-container  m-auto">
//                     {topRatedBakeries.map((item, index) => (
//                         <Link to={`/bakery/${item.id}`} key={index}>
//                             <div key={index} style={{ backgroundColor: lightColors[index % lightColors.length] }} className="rounded-xl flex p-6 h-[220px] justify-center items-center space-x-2  mr-0 md:mr-4">


//                                 <div className="w-[65%] justify-start text-left">
//                                     <h2 className="text-2xl mb-6 font-semibold text-gray-800">{item.business_name}</h2>
//                                     <p className="text-base text-gray-600 mt-2">Specialty: {item.specialty}</p>
//                                     <p className="text-base text-gray-600">Timing:  {item.timing}</p>


//                                     <div className='flex gap-1 items-center'>
//                                         <Rating
//                                             count={5}
//                                             size={20}
//                                             value={parseFloat(item.averageRating)}
//                                             edit={false}
//                                             isHalf={true}
//                                             activeColor="#ff579a"
//                                             className="mt-4"
//                                         /> <p >({item.rating_count})</p>
//                                     </div>
//                                 </div>

//                                 <div className="w-[35%]">
//                                     <img src={item.logo_url} alt="" className="w-full rounded-full" />
//                                     <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
//                                         Visit Now
//                                     </Button>
//                                 </div>


//                             </div>
//                         </Link>
//                     ))}
//                 </Carousel>
//             )}

//         </div>
//     );

// }
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useQuery } from 'react-query';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Button from '../Button';
import index from '../API';
import Rating from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
export default function TopRatedBakeries() {
    const { APIcall } = index();
    const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];


     const fetchProduct = async () => {
        const response = await APIcall('/bakery','GET');
       
        return response.data.sort((a, b) => b.averageRating - a.averageRating);
    };

    const { data: topRatedBakeries, isLoading, isError } = useQuery('topRatedBakeries', fetchProduct);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            {isLoading ? (
                <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-skeleton w-[90%] m-auto">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="shadow-lg my-12">
                            <Skeleton height={220} style={{ borderRadius: '10px', }} />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-container  m-auto">
                    {topRatedBakeries.map((item, index) => (
                        <Link to={`/bakery/${item.id}`} key={index}>
                            <div key={index} style={{ backgroundColor: lightColors[index % lightColors.length] }} className="rounded-xl flex p-6 h-[220px] justify-center items-center space-x-2  mr-0 md:mr-4">


                                <div className="w-[65%] justify-start text-left">
                                    <h2 className="text-2xl mb-6 font-semibold text-gray-800">{item.business_name}</h2>
                                    <p className="text-base text-gray-600 mt-2">Specialty: {item.specialty}</p>
                                    <p className="text-base text-gray-600">Timing:  {item.timing}</p>


                                    <div className='flex gap-1 items-center'>
                                        <Rating
                                            count={5}
                                            size={20}
                                            value={parseFloat(item.averageRating)}
                                            edit={false}
                                            isHalf={true}
                                            activeColor="#ff579a"
                                            className="mt-4"
                                        /> <p >({item.rating_count})</p>
                                    </div>
                                </div>

                                <div className="w-[35%]">
                                    <img src={item.logo_url} alt="" className="w-full rounded-full" />
                                    <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                                        Visit Now
                                    </Button>
                                </div>


                            </div>
                        </Link>
                    ))}
                </Carousel>
            )}

        </div>
    );

}
