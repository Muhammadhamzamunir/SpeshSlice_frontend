import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Button from './Button';
import { Squares } from 'react-activity';
import {toast } from 'react-toastify';
export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setProcessing(false);

    if (error) {
      console.error('Error creating payment method:', error);
      toast.error(error.message, { position: "bottom-right", theme: "dark" });

    } else {
      

     props.handlePayment(paymentMethod)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <CardElement className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500" />
      </div>
      <Button type="submit" disabled={processing} className="w-full py-3 px-4 bg-pink-500 text-white font-semibold rounded-md shadow-sm focus:outline-none hover:bg-pink-600 transition duration-300">
        {processing ? <Squares/> : 'Pay And Place Order'}
      </Button>
    </form>
  );
}
