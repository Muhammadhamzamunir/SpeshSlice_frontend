import React, { useState } from 'react';
import Button from './Button';
const initialValues = {
    ownerName: "",
    businessName: "",
    speciality: "",
    contactNumber: "",
    contactEmail: "",
    timing: "",
    logo: null,
    termsAgreed: false,
};

function BakeryRegistrationForm({ handleChange, handleBlur, values = initialValues }) {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue("logo", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);

        }
    };


    return (
        <div className="container mx-auto px-4">
            <div className="w-full mb-3 p-4 shadow">
                <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Register Your Bakery</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-xl text-center mb-2">Bakery Details</h2>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ownerName}
                                name="ownerName"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Owner Name"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.businessName}
                                name="businessName"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Business Name"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.specialty}
                                name="specialty"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Specialty"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.timing}
                                name="timing"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Timing"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                name="email"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="tel"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                name="phone"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="mb-4">

                            <Button type="submit" className="md:w-full mt-4">{loading ? <Squares /> : "Upload Your Logo"}</Button>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-xl text-center ">Location</h2>
                        <div className="mb-2">
                            <Button type="submit" className="md:w-full mt-2">{loading ? <Squares /> : "Get Your Current Location"}</Button>
                        </div>
                        <div className="mb-2">
                            <h1 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">OR</h1>
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                name="country"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Country"
                            />
                        </div>

                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                name="city"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="City"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.street}
                                name="street"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Street"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.longitude}
                                name="longitude"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Longitude"
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.latitude}
                                name="latitude"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Latitude"
                            />
                        </div>
                        {/* Add similar input fields for other details */}
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-xl text-center mb-2">Cake Customization Info</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pricePerPound}
                                name="pricePerPound"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Price Per Pound"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pricePerDecoration}
                                name="pricePerDecoration"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Price Per Decoration"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pricePerTier}
                                name="pricePerTier"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Price Per Tier"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.priceForShape}
                                name="priceForShape"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Price For Shape"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tax}
                                name="tax"
                                required
                                className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                placeholder="Tax"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <Button type="submit" className="md:w-[12%] mt-4">{loading ? <Squares /> : "Register Bakery"}</Button>
                </div>
            </div>
        </div>
    );
}

export default BakeryRegistrationForm;
