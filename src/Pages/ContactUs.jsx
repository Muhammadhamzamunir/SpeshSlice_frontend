import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const adminEmail = "admin@example.com";
  const phoneNumber = "+1 123 456 7890";
  const headOfficeAddress = "123 Baker Street, New York, NY, USA";

  return (
    <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg w-full h-full min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-semibold mb-6 text-pink-500">Contact Us</h2>
      <div className="mb-6 text-center">
        <p className="text-lg mb-4">
          <span className="font-semibold">Admin Email:</span> {adminEmail}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Phone Number:</span> {phoneNumber}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Head Office Address:</span>{" "}
          {headOfficeAddress}
        </p>
      </div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-pink-500">Follow Us</h3>
        <div className="flex space-x-4 justify-center">
          <a
            href="https://www.facebook.com"
            className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition-transform duration-200"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.twitter.com"
            className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition-transform duration-200"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.instagram.com"
            className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.whatsapp.com"
            className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition-transform duration-200"
          >
            <FaWhatsapp size={30} />
          </a>
        </div>
      </div>
      <div className="text-lg mb-4 text-center max-w-xl">
        <p>
          Feel free to reach out to us with any inquiries. Our team is here to
          assist you and ensure your experience with us is nothing short of
          exceptional.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
