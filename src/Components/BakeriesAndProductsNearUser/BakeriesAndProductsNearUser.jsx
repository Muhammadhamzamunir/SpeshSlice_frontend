import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Button from '../Button';
import index from '../API';
import Rating from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { useUserData } from '../UserAuthentication(ContextApi)';

export default function BakeriesAndProductsNearUser() {
    const { APIcall } = index();
    const [bakeriesAndProducts, setBakeriesAndProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];
    const { userInfo, fetchData } = useUserData();

    useEffect(() => {
      if(userInfo){
        APIcall(`/bakeries-near-user/${userInfo.user.id}`, 'GET')
        .then((data) => {
            setBakeriesAndProducts(data.data);
        })
        .catch((error) => {
            console.error('Error fetching top rated bakeries:', error);
        })
        .finally(() => {
            setLoading(false);
        });
      }
    }, []);

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
            {bakeriesAndProducts.length > 0 && (
                <div>
                    <h1 className="my-6 font-bold text-2xl text-left">Bakeries Near You (10km)</h1>
                    {loading ? (
                        <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-skeleton w-[90%] m-auto">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="shadow-lg my-12">
                                    <Skeleton height={220} style={{ borderRadius: '10px' }} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <Carousel responsive={responsive} arrows={true} infinite={true} containerClass="carousel-container m-auto">
                            {bakeriesAndProducts.map((item, index) => (
                                <Link to={`/bakery/${item.bakery.id}`} key={index}>
                                    <div
                                        key={index}
                                        style={{ backgroundColor: lightColors[index % lightColors.length] }}
                                        className="rounded-xl flex p-6 h-[220px] justify-center items-center space-x-2 mr-0 md:mr-4"
                                    >
                                        <div className="w-[65%] justify-start text-left">
                                            <h2 className="text-2xl mb-6 font-semibold text-gray-800">{item.bakery.business_name}</h2>
                                            <p className="text-base text-gray-600 mt-2">Specialty: {item.bakery.specialty}</p>
                                            <p className="text-base text-gray-600">Timing: {item.bakery.timing}</p>
                                            <div className="flex gap-1 items-center">
                                                <Rating
                                                    count={5}
                                                    size={20}
                                                    value={parseFloat(item.bakery.averageRating)}
                                                    edit={false}
                                                    isHalf={true}
                                                    activeColor="#ff579a"
                                                    className="mt-4"
                                                />
                                                <p>({item.rating_count})</p>
                                            </div>
                                        </div>
                                        <div className="w-[35%]">
                                            <img src={item.bakery.logo_url} alt="" className="w-full rounded-full" />
                                            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Visit Now</Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </Carousel>
                    )}

                    <h1 className="my-6 font-bold text-2xl text-left">Products of bakeries Near You (10km)</h1>

                    <div className="flex flex-wrap">
                        {bakeriesAndProducts.slice(0, 8).map((item, index) =>
                            item.products.map((product, productIndex) => (
                                <div className="lg:w-1/4 md:w-1/2 w-full p-2 cursor-pointer" key={productIndex}>
                                    <Link to={`/product/${product.id}`} key={productIndex}>
                                        <div className="bg-white border rounded-lg overflow-hidden relative hover:shadow-xl">
                                            <div className="p-4">
                                                <img className="w-[150px] m-auto aspect-square mb-4 rounded-full" src={product.image_url} alt="" />
                                                <p className="text-gray-400 text-[14px] mt-2">{product.category.name}</p>
                                                <h2 className="text-lg font-bold text-ellipsis">{product.name}</h2>
                                                <div className="flex gap-1 items-center">
                                                    <Rating
                                                        count={5}
                                                        size={16}
                                                        value={parseFloat(product.rating)}
                                                        edit={false}
                                                        isHalf={true}
                                                        activeColor="#ff579a"
                                                        className="mt-4"
                                                    />
                                                    <p className="text-gray-400">({product.reviews_count})</p>
                                                </div>
                                                <div className="text-xs text-gray-400 cursor-pointer">
                                                    By <Link to={`/bakery/${product.bakery?.id}`} className="text-[#ff59ac]">{product.bakery?.business_name}</Link>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="product-price">
                                                        <span className="text-[#ff59ac]">${product.price}</span>
                                                    </div>
                                                    <div className="add-cart">
                                                        <Button className="w-full">Add</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
