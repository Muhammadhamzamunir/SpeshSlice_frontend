
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Rating from 'react-rating-stars-component';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Index from '../API';
import 'react-toastify/dist/ReactToastify.css';
import { useUserData } from '../UserAuthentication(ContextApi)';
import { useQuery } from 'react-query';

const backgroundColors = [
  'bg-pink-50',
  'bg-green-50',
  'bg-yellow-50',
  'bg-purple-50'
];

const PartyItemCard = () => {
  const { userInfo } = useUserData();
  const { APIcall } = Index();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await APIcall('/products', 'GET');
    return response.data.filter(item => item.category.name === 'Party Items').slice(0, 4);
  }

  const { data: partyItems, isLoading, isError } = useQuery('partyItems', fetchData);

  const addToCartHandle = (product) => {
    if (userInfo && userInfo.user) {
      let quantity = 1;
      APIcall(`/cart/${userInfo.user.id}/${product.id}/${quantity}`, 'POST')
        .then(() => toast.success("Added to cart!", { position: "bottom-right", theme: "dark" }))
        .catch((error) => {
          console.error("Error adding to cart:", error);
          toast.error("Failed to add to cart.", { position: "bottom-right", theme: "dark" });
        });
    } else {
      navigate('/login');
    }
  };

  const notAvailable = () => {
    if (userInfo && userInfo.user) {
      toast.error("THIS PRODUCT IS NOT AVAILABLE", { position: "bottom-right", theme: "dark" });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='p-4'>
      <div className="flex flex-wrap">
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div className="w-full md:w-1/2 lg:w-1/4 p-2 cursor-pointer " key={index}>
              <div className={`bg-white border rounded-lg overflow-hidden px-2 relative hover:shadow-xl flex ${backgroundColors[index % backgroundColors.length]}`}>
                <Skeleton className="w-32 h-32 object-cover rounded-md " height={125} style={{ margin: "auto" }} />
                <div className="p-4 flex-1">
                  <p className='text-gray-400 text-[14px] mt-2'><Skeleton height={15} width={40} style={{ borderRadius: '10px' }} /></p>
                  <h2 className="text-lg font-bold text-ellipsis"><Skeleton height={15} style={{ borderRadius: '10px' }} /></h2>
                  <div className="flex items-center justify-between mt-3">
                    <div className="product-price"><Skeleton height={15} width={40} style={{ borderRadius: '10px' }} /></div>
                    <div className="add-cart"><Skeleton height={40} width={40} style={{ borderRadius: '50%' }} /></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          partyItems.map((item, index) => (
            <div className="w-full md:w-1/2 lg:w-1/4 p-2 cursor-pointer" key={index}>
              <Link to={`/product/${item.id}`}>
                <div className={`border rounded-lg overflow-hidden relative hover:shadow-xl flex ${backgroundColors[index % backgroundColors.length]}`}>
                  <img src={item.image_url} alt={item.name} className="w-32 h-32 object-cover rounded-md" />
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold mb-1 truncate">{item.name}</h3>
                    <p className="text-gray-800 mt-1 text-sm">
                      {item.discounts.length > 0 ? (
                        <>
                          <s>${parseFloat(item.price).toFixed(2)}</s>
                          <br />
                          Discounted Price: ${parseFloat(item.price - (item.price * item.discounts[0].discount_percentage / 100)).toFixed(2)}
                        </>
                      ) : (
                        <>Standard Price: ${parseFloat(item.price).toFixed(2)}</>
                      )}
                    </p>
                    <Rating
                      count={5}
                      size={16}
                      value={parseFloat(item.rating)}
                      edit={false}
                      isHalf={true}
                      activeColor="#ff579a"
                      className="mt-4"
                    />
                    <div
                      className="absolute bottom-4 right-4 text-pink-500 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        item.is_available ? addToCartHandle(item) : notAvailable();
                      }}
                    >
                      <FaShoppingCart size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PartyItemCard;
