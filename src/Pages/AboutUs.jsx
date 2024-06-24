import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const AboutUs = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const totalVendors = 30;
  const totalSpecializedCakes = 500;

  useEffect(() => {
    let count = 0;
    const target = 1500;
    const increment = target / 100; // Change the increment value to control speed

    const updateCounter = () => {
      count += increment;
      if (count < target) {
        setTotalOrders(Math.ceil(count));
        setTimeout(updateCounter, 30); // Adjust timeout to control speed
      } else {
        setTotalOrders(target);
      }
    };

    updateCounter();
  }, []);

  return (
    <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg w-full h-full min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-semibold mb-6 text-pink-500">About Us</h2>
      <div className="mb-6 text-center">
        <p className="text-lg mb-4 text-center">
          <span className="font-semibold">Total Orders Delivered:</span>
          <span className="text-4xl ml-2 animate-pulse text-pink-500">
            {totalOrders}
          </span>
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Total Bakery Vendors:</span>{" "}
          {totalVendors}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">
            Total Specialized Cakes Delivered:
          </span>{" "}
          {totalSpecializedCakes}
        </p>
      </div>
      <div className="text-lg mb-4 text-center max-w-xl">
        <p>
          Our bakery delivery service connects you with the best local bakers.
          Whether you're looking for a customized cake for a special occasion or
          fresh bread for your daily needs, we have you covered. Our commitment
          to quality and customer satisfaction has made us a trusted name in the
          industry.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
