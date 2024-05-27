import React, { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import Button from "../Components/Button";
import cake from "../assets/images/cake.png";
import Index from "../Components/API";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import Rating from 'react-rating-stars-component';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegClock } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import ProductCard from "../Components/ProductCard";
import { useUserData } from "../Components/UserAuthentication(ContextApi)";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { FaShoppingCart } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';

export default function ProductDetail() {
  const navigate = useNavigate();
    const { APIcall } = Index();
    const { userInfo, fetchData } = useUserData();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [productDetail, setproductDetail] = useState();
    const [quantity, setQuantity] = useState(1);
    const currentDate = new Date();
    const [isDiscountActive, setIsDiscountActive] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [activeTab, setActiveTab] = useState('bakery');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleIncrement = () => {
        if (quantity < productDetail.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= productDetail.quantity) {
            setQuantity(value);
        }
    };


    const addToCarthandle = () => {
        if(userInfo.user){
        APIcall(`/cart/${userInfo.user.id}/${productDetail.id}/${quantity}`, 'POST')
    }else{
        navigate('/login')
      }

    }
    const NotAvailable =()=>{
  if(userInfo.user){
      toast.error( "THIS PRODUCT IS NOT AVAILABLE", { position: "bottom-right", theme: "dark" });

  }else{
    navigate('/login')
  }
    }
    useEffect(() => {
        if (productDetail) {
            const discount = productDetail.discounts[0];

            const isActive =
                currentDate >= new Date(discount?.start_date) &&
                currentDate <= new Date(discount?.end_date) ||
                discount?.discount_percentage > 0 && discount.end_date == null;

            setIsDiscountActive(isActive);

            if (isActive) {
                const price = parseFloat(productDetail.price);
                const discountPercentage = parseFloat(discount?.discount_percentage);
                const newDiscountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);
                setDiscountedPrice(newDiscountedPrice);
            }
        }
    }, [currentDate, productDetail]);

    useEffect(() => {
        APIcall(`/products/${id}`, 'GET')
            .then((data) => {
                setproductDetail(data.data);
                console.log(data.data);
                APIcall(`/products/category/${data.data.category.name}`, 'GET')
                    .then((catgoryData) => {

                        setRelatedProducts(catgoryData.data)

                    })
                    .finally(() => {
                        setLoading(false);
                    });

            })
            .finally(() => {
                // setLoading(false);
            });

    }, [id]);
    return (
        <>
            {productDetail ? (
                <>
                    <div className="w-full">
                        <section className="relative">
                            <div className="container mx-auto px-4">
                                <div className="mb-12 flex flex-wrap-reverse -mx-4 justify-end"></div>
                                <div className="flex flex-wrap-reverse -mx-4">
                                    <div className="mx-auto px-4 relative min-h-80  lg:w-6/12 w-full md:w-full">
                                        <div className="relative ">
                                            <div className="relative w-full overflow-hidden">
                                                <div className="w-full p-12 border-[1px] rounded-2xl transform duration-500 transition-all ease-in-out mx-auto block">
                                                    <img
                                                        alt="..."
                                                        src={productDetail.image_url}
                                                        className="w-full h-auto mx-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mr-auto px-4 relative  lg:w-6/12 w-full md:w-full text-left">
                                        <div className="w-full">
                                            {isDiscountActive && productDetail.discounts[0] && (
                                                <span className="text-pink-500 bg-pink-200 text-xs font-bold inline-block py-1 uppercase last:mr-0 mr-1 leading-tight rounded-md px-3">
                                                    Big Discount {productDetail.discounts[0]?.discount_percentage}%
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-3xl font-bold leading-tight mt-2 mb-0">
                                            {productDetail.name}
                                        </h2>
                                        <div className="pt-2 ">
                                            <div className='flex gap-1 items-center'>
                                                <Rating
                                                    count={5}
                                                    size={16}
                                                    value={parseFloat(productDetail.rating)}
                                                    edit={false}
                                                    isHalf={true}
                                                    activeColor="#ff579a"
                                                    className="mt-4"
                                                />
                                                <p className='text-gray-400'>({productDetail.reviews_count})</p>
                                            </div>

                                        </div>

                                        <div className="flex items-end gap-4">
                                            {isDiscountActive && discountedPrice ? (
                                                <>
                                                    <h2 className="text-5xl mt-8 font-bold  mb-2 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">
                                                        ${discountedPrice}
                                                    </h2>
                                                    <h2 className="mt-8  mb-2 text-gray-500"><del>
                                                        ${productDetail.price}
                                                    </del></h2>
                                                </>
                                            ) : (
                                                <h2 className="text-5xl mt-8 font-bold  mb-2 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">
                                                    ${productDetail.price}
                                                </h2>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-justify">
                                            {productDetail.description}
                                        </p>


                                        <div className="flex gap-5 items-center w-full my-5">
                                            <h5 className="mb-2 text-slate-500 font-medium">Size (pound):</h5>
                                            <div className="flex gap-3 flex-1">
                                                {
                                                    [...Array(7)].map((_, index) => (
                                                        <p key={index} className={`rounded border  p-1 text-center ${index + 1 === productDetail.no_of_pounds ? 'bg-[#ff579a] text-white' : ''}`} style={{ height: '30px', width: '30px', fontSize: '0.8rem' }}>
                                                            {index + 1}
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="mb-2 flex flex-wrap md:justify-left mt-3 ">
                                            <div className="w-[100px]">
                                                <div className="relative inline-flex flex-row items-stretch">
                                                    <div className="mr-2">
                                                        <div className="mb-3 pt-0 relative">
                                                            <input readOnly
                                                                type="text"
                                                                className="border-[#ff579a] p-2 mr-0 text-lg w-full placeholder-pink-200 text-[#ff579a] bg-white rounded-md outline-none focus:ring-pink-500 focus:ring-1 focus:border-pink-500 border border-solid transition duration-200"
                                                                value={quantity}
                                                                onChange={handleChange}
                                                            />
                                                            <div className="absolute bottom-2 right-0 flex flex-col items-center w-8">
                                                                <BsChevronUp className="text-[#ff579a] cursor-pointer text-[12px] mb-2" onClick={handleIncrement} />
                                                                <BsChevronDown className="text-[#ff579a] cursor-pointer text-[12px]" onClick={handleDecrement} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                           
                                           
                                                <Button className="" onClick={productDetail.is_available ? addToCarthandle : NotAvailable} >

                                                    Add to Cart

                                                    <FaShoppingCart />
                                                </Button>
                                           





                                        </div>

                                        <div className="w-full h-[1px] bg-gray-200 my-3"></div>
                                        <div className=" w-full lg:w-7/12 flex flex-col gap-x-10">
                                            <h5 className="mb-2 text-slate-500 font-normal">Category: <span className="text-[#ff579a] ml-2">{productDetail.category.name}</span> </h5>
                                            <h5 className="mb-2 text-slate-500 font-normal">Stock: <span className="text-[#ff579a] ml-2">{productDetail.quantity} Items </span> </h5>
                                            <h5 className="mb-2 text-slate-500 font-normal">Available: <span className="text-[#ff579a] ml-2">{productDetail.is_available ? "YES" : "NO"}  </span> </h5>
                                           


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="container mx-auto my-12">
                            <div className="p-4 border rounded-xl mx-4">
                                <div className="container flex flex-wrap gap-4 items-center">
                                    <p className={`p-2 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'bakery' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('bakery')}>Vendor/Bakery Detail</p>
                                    <p className={`p-2 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'description' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('description')}>Description</p>
                                    <p className={`p-2 border rounded-3xl cursor-pointer font-semibold ${activeTab === 'reviews' ? 'text-[#ff579a]' : 'text-gray-400 hover:text-[#ff579a]'} `} onClick={() => handleTabClick('reviews')}>Reviews ({productDetail.reviews.length})</p>
                                </div>
                                <div className="my-12 md:px-3 min-h-60">
                                    {activeTab === 'bakery' && (
                                        <div>

                                            <Link to={`/bakery/${productDetail.bakery.id}`}>

                                                <div className="flex items-center gap-4">
                                                    <img src={productDetail.bakery.logo_url} alt="Bakery Logo" className="w-24 h-24 rounded-full" />
                                                    <div>
                                                        <h2 className="text-xl font-semibold">{productDetail.bakery.business_name}</h2>
                                                        <div className='flex gap-1 items-center'>
                                                            <Rating
                                                                count={5}
                                                                size={16}
                                                                value={parseFloat(productDetail.bakery.averageRating)}
                                                                edit={false}
                                                                isHalf={true}
                                                                activeColor="#ff579a"
                                                                className="mt-4"
                                                            />
                                                            <p className='text-gray-400'>({productDetail.bakery.rating_count})</p>
                                                        </div>
                                                        <p className="text-gray-500">Speciality : {productDetail.bakery.specialty}</p>
                                                    </div>
                                                </div>

                                            </Link>
                                            <p className="text-gray-500 pt-3">{productDetail.bakery.description} </p>
                                            <Link to={`/bakery/${productDetail.bakery.id}`} >
                                                <p className="p-2 mt-4 text-[#ff579a] border-[2px] border-[#ff579a] w-[100px] text-center rounded"> Visit Now </p>
                                            </Link>
                                        </div>
                                    )}
                                    {activeTab === 'description' && (
                                        <div>
                                            <p className="text-gray-500">{productDetail.description}</p>
                                        </div>
                                    )}
                                    {activeTab === 'reviews' && (
                                        <div className="reviews-container">
                                            {productDetail.reviews.map((review, index) => (
                                                <div key={index} className="review-card border p-2 md:p-4 rounded-xl mb-4 ">
                                                    <div className="flex items-center">
                                                        <div className="user-info  items-start">
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
                                                    <p className="description text-gray-500 md:pl-[15%] pl-7">{review.description} </p>
                                                </div>
                                            ))}
                                        </div>


                                    )}
                                </div>
                            </div>

                        </section>




                    </div>

                </>

            ) : (<>
                <div className="w-full">
                    <section className="relative">
                        <div className="container mx-auto px-4">
                            <div className="mb-12 flex flex-wrap-reverse -mx-4 justify-end"></div>
                            <div className="flex flex-wrap-reverse -mx-4">
                                <div className="mx-auto px-4 relative min-h-80  lg:w-6/12 w-full md:w-full">
                                    <div className="relative ">
                                        <div className="relative w-full overflow-hidden">
                                            <div className="w-full p-12 border-[1px] rounded-2xl transform duration-500 transition-all ease-in-out mx-auto block">
                                                <Skeleton height={370} style={{ borderRadius: '10px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr-auto px-4 relative  lg:w-6/12 w-full md:w-full text-left">


                                    <h2 className="text-3xl mt-4 font-bold leading-tight  mb-0">
                                        <Skeleton height={25} style={{ borderRadius: '10px' }} />
                                    </h2>
                                    <div className="pt-2 ">
                                        <div className='flex gap-1 items-center'>
                                            <Skeleton height={15} width={100} style={{ borderRadius: '10px' }} />

                                        </div>

                                    </div>

                                    <div className="flex items-end gap-4">
                                        <Skeleton height={45} width={50} style={{ borderRadius: '10px' }} />
                                    </div>
                                    <p className="text-gray-500 text-justify">
                                        <Skeleton height={15} style={{ borderRadius: '10px' }} /> <Skeleton height={15} style={{ borderRadius: '10px' }} /> <Skeleton height={15} style={{ borderRadius: '10px' }} />
                                    </p>


                                    <div className="flex gap-5 items-center w-full my-5">


                                    </div>

                                    <div className="mb-2 flex flex-wrap md:justify-left mt-3 ">
                                        <div className="w-[100px]">
                                            <div className="relative inline-flex flex-row items-stretch">
                                                <div className="mr-2">
                                                    <div className="mb-3 pt-0 relative">
                                                        <Skeleton height={50} width={90} style={{ borderRadius: '10px' }} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Skeleton height={50} width={100} style={{ borderRadius: '10px' }} />




                                    </div>

                                    <div className="w-full h-[1px] bg-gray-200 my-3"></div>
                                    <div className=" w-full lg:w-7/12 flex flex-col gap-x-10">
                                        <Skeleton height={15} width={150} style={{ borderRadius: '10px' }} />
                                        <Skeleton height={15} width={150} style={{ borderRadius: '10px' }} />
                                        <Skeleton height={15} width={150} style={{ borderRadius: '10px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto my-12">
                        <div className="p-4 border rounded-xl mx-4">
                            <div className="container flex flex-wrap gap-4 items-center">
                                <Skeleton height={30} width={150} style={{ borderRadius: '40px' }} />

                                <Skeleton height={30} width={150} style={{ borderRadius: '40px' }} />
                                <Skeleton height={30} width={150} style={{ borderRadius: '40px' }} />                </div>
                            <div className="my-12 md:px-3 min-h-60">
                                {activeTab === 'bakery' && (
                                    <div>



                                        <div className="flex items-center gap-4">

                                            <Skeleton height={100} width={100} style={{ borderRadius: '50%' }} />
                                            <div>
                                                <Skeleton height={15} width={150} style={{ borderRadius: '40px' }} />
                                                <Skeleton height={30} width={150} style={{ borderRadius: '40px' }} />

                                            </div>
                                        </div>


                                        <Skeleton height={30} width={150} style={{ borderRadius: '40px' }} />
                                    </div>
                                )}


                            </div>
                        </div>

                    </section>




                </div>

            </>)}

            <h1 className="font-bold ml-[9%] text-3xl mt-12 mb-6">Related Products</h1>
            <div className="flex flex-wrap container m-auto">

                {loading > 0 ? (
                    [...Array(4)].map((_, index) => (

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
                    relatedProducts.slice(0, 4).map((product, index) => (
                        <div className="lg:w-[25%] md:w-1/2 w-full sm:w-1/2 p-2  cursor-pointer " key={index}>
                            <Link to={`/product/${product.id}`} key={index}>
                                <div className="bg-white border rounded-lg overflow-hidden  relative hover:shadow-xl ">
                                    {/* <div className="badge badge-secondary badge-outline absolute top-2 right-2">Sale</div> */}
                                    <div className="p-4">
                                        <img className="w-[125px] m-auto aspect-square mb-4" src={product.image_url} alt="" />
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
                                        <div className="text-xs text-gray-400 cursor-pointer">
                                            By <Link to={`/bakery/${product.bakery?.id}`} className='text-[#ff59ac]'>{product.bakery?.business_name}</Link>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="product-price">
                                                <span className="text-[#ff59ac]">${product.price}</span>
                                            </div>
                                            <div className="add-cart ">
                                                <Button className="w-full">
                                                    Add <FaShoppingCart />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}