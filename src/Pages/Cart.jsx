
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Squares } from "react-activity";
import React, { useEffect, useRef, useState } from 'react';
import CartCard from "../Components/cartCard";
import cake from "../assets/images/cake.png";
import { MdOutlineDeleteForever } from "react-icons/md";
import Button from '../Components/Button';
import { FaArrowLeft } from "react-icons/fa";
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
import Rating from 'react-rating-stars-component';
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Index from '../Components/API';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import PaymentForm from "../Components/PaymentForm";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51MxEkAAGnZ0yy3OxgJv8tTNK7zVot0Zf0JC5LqX8xfyCNBbJPOCTkTdbu7AHyUQQkJtXe0MyJTSWp8zDfvIEStwk0019yE6ubE');
export default function Cart() {

  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const { APIcall, loader } = Index();
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useUserData();
  const [quantity, setQuantity] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Card');
  const [selectedAddress, setSelectedAddress] = useState();
  const [userAddress, setUserAddress] = useState(userInfo.user.address);
  const [loading,setloading] =useState(false);
  const checkout = useRef()
  const handleProceedToCheckout = () => {
    if(cartItems.length>0){

      checkout.current.classList.remove('hidden');
    }else{
      toast.error( "Your Cart is Empty", { position: "top-right", theme: "dark" });

    }

  };




  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const handleIncrement = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    const updatedQuantity = { ...quantity };
    updatedQuantity[itemId] = (updatedQuantity[itemId] || 0) + 1;


    if (updatedQuantity[itemId] > item.quantity) {

      updatedQuantity[itemId] = item.quantity;
    }

    setQuantity(updatedQuantity);
  };


  const handleDecrement = (itemId) => {
    const updatedQuantity = { ...quantity };
    if (updatedQuantity[itemId] > 1) {
      updatedQuantity[itemId] -= 1;
      setQuantity(updatedQuantity);
    }
  };

  const handleRemoveFromCart = (itemId) => {

    APIcall(`/cart/${itemId}`, 'DELETE').then(() => {
      gettingCartData();
    })

  }

  useEffect(() => {
    gettingCartData()
  }, [quantity]);


  const gettingCartData = () => {
    APIcall(`/cart/${userInfo.user.id}`, 'GET').then((data) => {
      setCartItems(data.data);
      let total = 0;
      data.data.forEach(item => {
        total += parseFloat(item.price) * (1 - parseFloat(item.discounts[0]?.discount_percentage) / 100) * (quantity[item.id] || item.cart_quantity);
      });
      setSubtotal(total);
    });

  }


  const handlePayment = async (payment = null) => {
    if (!selectedAddress) {
      toast.error("Please Setect Address", { position: "bottom-right", theme: "dark" });
    } else {
      try {
 setloading(true)
        const paymentInfo = {
          cartItems: cartItems.map(item => ({
            id: item.id,
            quantity: quantity[item.id] || 1,

          })),
          totalAmount: subtotal.toFixed(2),
          selectedAddress: selectedAddress,
          method: selectedOption,
          userId: userInfo.user.id,
          userPhone: userInfo.user.phone,
          userEmail: userInfo.user.email,
          payment: payment || null,
        };

        APIcall('/process-payment', 'POST', paymentInfo).then((data) => {
          setloading(false);
          navigate("/")
        })



      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }
  };

  return (

    !cartItems.length >= 0 ? (
      <>
        <div className="flex flex-col md:flex-row  mt-4 m-auto ">

          <div className="bg-white shadow rounded-lg p-6 mb-6 w-full md:w-[70%] md:mr-3">
            <div className="flex flex-col md:flex-row justify-between">
              <div className=" p-2">
                <h1 className="text-4xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-2">Your Cart</h1>
                <p className="text-slate-500">You have {cartItems.length} items in the Cart</p>
              </div>

            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="scroll-container overflow-y-auto" style={{ maxHeight: '500px', scrollbarWidth: 'thin', scrollbarColor: '#ff579a transparent', paddingRight: '15px' }}>
                <div className="w-full sm:w-1/2 md:w-full lg:w-full xl:w-full mt-5 mb-5 ">
                  <div className="w-full border border-gray-300 p-4 flex flex-col md:flex-row md:gap-5 items-center">
                    <img src={item.image_url} alt="Product" className="w-32 md:mr-4 border border-gray-300 p-5" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 md:mr-56">{item.name}</h3>
                      <div className='flex gap-1 items-center'>
                        <Rating
                          count={5}
                          size={20}
                          value={parseFloat(item.rating)}
                          edit={false}
                          isHalf={true}
                          activeColor="#ff579a"
                          className="mt-4"
                        /> <p>({item.reviews_count})</p>
                      </div>
                    </div>
                    {item.discounts.length > 0 ?
                      <span className="font-bold text-slate-500 mr-2">{(parseFloat(item.price) * (1 - parseFloat(item.discounts[0]?.discount_percentage) / 100)).toFixed(2)}</span> :
                      <span className="font-bold text-slate-500 mr-2">${item.price}</span>
                    }
                    <div className="mb-2 flex md:justify-left mt-3 ">
                      <div className="w-[100px]">
                        <div className="relative inline-flex flex-row items-stretch">
                          <div className="mr-2">
                            <div className="mb-3 pt-0 relative">
                              <input
                                readOnly
                                type="text"
                                className="border-[rgb(255,87,154)] p-2 mr-0 text-lg w-full placeholder-pink-200 text-[#ff579a] bg-white rounded-md outline-none focus:ring-pink-500 focus:ring-1 focus:border-pink-500 border border-solid transition duration-200"
                                value={quantity[item.id] || item.cart_quantity}
                              />
                              <div className="absolute bottom-2 right-0 flex flex-col items-center w-8">
                                <BsChevronUp className="text-[#ff579a] cursor-pointer text-[12px] mb-2" onClick={() => handleIncrement(item.id)} />
                                <BsChevronDown className="text-[#ff579a] cursor-pointer text-[12px]" onClick={() => handleDecrement(item.id)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-pink-400">${((parseFloat(item.price) * (1 - parseFloat(item.discounts[0]?.discount_percentage) / 100)) * (quantity[item.id] || item.cart_quantity)).toFixed(2)}</div>
                    <div className="font-bold text-slate-500 cursor-pointer" onClick={() => handleRemoveFromCart(item.cart_id)}><MdOutlineDeleteForever /></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col-reverse md:flex-row justify-between">
              <Link to="/">
                <Button className="w-half">
                  <FaArrowLeft />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          <div className=" md:block md:w-[30%] md:shadow md:rounded-lg md:p-6 md:mb-6 overflow-hidden relative md:pr-5">
            <div className=' border rounded-xl p-5 md:mt-32'>
              <div className=' flex justify-between p-3 border mb-3'>
                <p className='font-medium text-slate-400' >Subtotal</p>
                <h3 className='font-bold bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent'>${subtotal.toFixed(2)}</h3>
              </div>
              <div className=' flex justify-between p-3 border mb-3 '>
                <p className='font-medium text-slate-400' >Shipping</p>
                <h3 className='font-medium text-slate-500'>Free</h3>
              </div>
              <div className='flex justify-between p-3 border mb-3'>
                <p className='font-medium text-slate-400'>Total</p>
                <h3 className='font-bold bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent'>${subtotal.toFixed(2)}</h3>
              </div>
              <div className='flex justify-between p-3 border mb-3'>
                <Button className="w-full" onClick={handleProceedToCheckout}>
                  Proceed To CheckOut
                  <FaArrowRightFromBracket />
                </Button>
              </div>
            </div>
          </div>

        </div>

        <div className="hidden" ref={checkout}>
          <div className=" p-5 flex md:items-center flex-col md:flex-row">
            <p className="mr-4 font-bold uppercase">Select Address:
            </p>

          </div>
          <div className="md:w-[90%] m-auto border rounded-lg p-6">


            {
              userAddress.map((address) => (
                <div key={address.id}>
                  <label>
                    <input
                      type="radio"
                      name="address"
                      value={`${address.street}, ${address.city}, ${address.country}`}
                      checked={selectedAddress === `${address.street}, ${address.city}, ${address.country}` || (selectedAddress === '' && address.default)}
                      onChange={handleAddressChange}
                      className="mr-2 appearance-none border border-black rounded-full w-4 h-4 checked:bg-pink-500 checked:border-transparent focus:outline-none"
                    />
                    {`${address.street}, ${address.city}, ${address.country}`}
                  </label>
                  <br />
                </div>
              ))
            }
            <Link to="/profile"><Button className={"my-7"}>ADD ADDRESS</Button></Link>
          </div>

          <div className=" p-5 flex md:items-center flex-col md:flex-row">
            <p className="mr-4 font-bold uppercase">Contact Info:
            </p>

          </div>
          <div className="md:w-[90%] m-auto border rounded-lg p-6">
            <p>phone: {userInfo.user.phone}</p>
            <p>Email: {userInfo.user.email}</p>
            <Link to="/profile"><Button className={"my-7"}>Change</Button></Link>
          </div>
          <div className=" p-5 flex md:items-center flex-col md:flex-row">
            <p className="mr-4 font-bold uppercase">Payment method:
            </p>

            <div className="flex items-center mr-8">
              <input
                type="radio"
                id="CashOnDelivery"
                name="paymentOption"
                value="CashOnDelivery"
                checked={selectedOption === 'CashOnDelivery'}
                onChange={handleOptionChange}
                className="mr-2 appearance-none border rounded-full w-4 h-4 checked:bg-pink-500 checked:border-transparent focus:outline-none"
              />
              <label htmlFor="CashOnDelivery">Cash On Delivery</label>
            </div>

            <div className="flex md:items-center ">
              <input
                type="radio"
                id="Card"
                name="paymentOption"
                value="Card"
                checked={selectedOption === 'Card'}
                onChange={handleOptionChange}
                className="mr-2 appearance-none border rounded-full w-4 h-4 checked:bg-pink-500 checked:border-transparent focus:outline-none"
              />
              <label htmlFor="Card">Card</label>
            </div>
          </div>


          {
            selectedOption === "Card" ? (
              <div className="border md:w-[90%] items-center m-auto rounded-md p-5 flex flex-col md:flex-row">

                <div className='md:w-1/2 '>
                  <img
                    src="./src/assets/images/visa.png"
                    alt="Card Image"
                    className="md:p-5 md:h-[300px]  mb-4 md:m-auto "
                  />
                </div>
                {
                  !paymentMethod ? (<div className="flex-1 mr-5">
                    <Elements stripe={stripePromise}>
                      <PaymentForm handlePayment={handlePayment} />
                    </Elements>
                  </div>

                  ) : (<div className="flex-1 mr-5">

                    <Button className={"my-5"}
                      onClick={() => { handlePayment(paymentMethod) }}

                    >
                       {loading? <Squares/>:"Pay and Place Order"} 
                      
                    </Button>
                  </div>

                  )
                }

              </div>

            ) : (
              <div className="md:w-[90%] m-auto border rounded-lg p-6">


                <p>Your are Choosing Cash on delivery </p>
                <Button className={"my-5"}
                  onClick={() => {
                    const payment = null
                    handlePayment(payment)
                  }}

                >
                 {loading? <Squares/>:"Place Order"} 
                </Button>
              </div>
            )
          }
        </div>
      </>

    ) : ("Loading")
  );
}

