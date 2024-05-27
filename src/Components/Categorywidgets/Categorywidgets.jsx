// import React, { useState, useEffect } from 'react';
// import Index from '../API';
// import Slider from 'react-slick';
// import Skeleton from 'react-loading-skeleton';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import { Link } from 'react-router-dom';
// export default function Categorywidgets() {
//     const { APIcall } = Index();
//     const [categories, setCategories] = useState([]);
//     const lightColors = ["#fffceb", "#ecffec", "#f2fce4", "#fffceb", "#fff3ff", "#fff3eb", "#feefea", "#fffceb", "#feefea"];

//     useEffect(() => {
//         APIcall('/category', 'GET')
//             .then((data) => {
                
//                 setCategories(data.data.sort((a, b) => b.id - a.id));
//             });
//     }, []);

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         loop: true,
//         slidesToShow: 9,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 6,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         <Slider {...settings}>
//             {categories.length > 0 ? (
//                 categories.map((category, index) => (
//                     <div key={index} className="category-item max-h-60 cursor-pointer">
//                         <Link to={`/products?category=${category.name}`}>
//                             <div className='rounded-lg flex flex-col justify-center p-4' style={{ backgroundColor: lightColors[index % lightColors.length] }}>
//                                 <img src={category.image_url} alt="No Image" className='h-20' />
//                                 <h2 className='text-center font-semibold text-[15px]'>{category.name}</h2>
//                                 <p className='text-center text-gray-400 text-[14px]'>{category.products_count} items</p>
//                             </div>
//                         </Link>
//                     </div>
//                 ))
//             ) : (
//                 [...Array(6)].map((_, index) => (
//                     <div key={index} className="category-item h-[240px] items-center">
//                         <div className='rounded-lg flex flex-col justify-center items-center p-5' style={{ backgroundColor: lightColors[index % lightColors.length] }}>
//                             <Skeleton height={70} width={70} style={{ borderRadius: '50%', margin: "auto" }} />
//                             <h2 className='text-center font-semibold text-[15px]'><Skeleton height={15} width={50} style={{ borderRadius: '10px', margin: "auto" }} /></h2>
//                             <p className='text-center text-gray-400 text-[14px]'><Skeleton height={15} width={40} style={{ borderRadius: '10px', margin: "auto" }} /></p>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </Slider>
//     );
// }

import React from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Index from '../API';

export default function CategoryWidgets() {
    const { APIcall } = Index();
    const fetchCategories = async () => {
        const response = await APIcall('/category');
        return response.data;
    };
    const { data: categories, isLoading, isError } = useQuery('categories', fetchCategories);

    const lightColors = ["#fffceb", "#ecffec", "#f2fce4", "#fffceb", "#fff3ff", "#fff3eb", "#feefea", "#fffceb", "#feefea"];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        default:true,
        arrows: true,
        loop: true,
        slidesToShow: 9, 
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    if (isLoading) {
        return (
            <Slider {...settings}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="category-item h-[240px] items-center">
                        <div className='rounded-lg flex flex-col justify-center items-center p-5' style={{ backgroundColor: lightColors[index % lightColors.length] }}>
                            <Skeleton height={70} width={70} style={{ borderRadius: '50%', margin: "auto" }} />
                            <h2 className='text-center font-semibold text-[15px]'><Skeleton height={15} width={50} style={{ borderRadius: '10px', margin: "auto" }} /></h2>
                            <p className='text-center text-gray-400 text-[14px]'><Skeleton height={15} width={40} style={{ borderRadius: '10px', margin: "auto" }} /></p>
                        </div>
                    </div>
                ))}
            </Slider>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <Slider {...settings}>
            {categories.map((category, index) => (
                <div key={index} className="category-item cursor-pointer">
                    <Link to={`/products?category=${category.name}`}>
                        <div className='rounded-lg flex flex-col justify-center px-2 h-40 py-4' style={{ backgroundColor: lightColors[index % lightColors.length] }}>
                            <img src={category.image_url} alt="No Image" className='h-20 w-20 m-auto rounded-full rou' />
                            <h2 className='text-center font-semibold text-[15px]'>{category.name}</h2>
                            <p className='text-center text-gray-400 text-[14px]'>{category.products_count} items</p>
                        </div>
                    </Link>
                </div>
            ))}
        </Slider>
    );
}
