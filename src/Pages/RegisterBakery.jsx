// import React, { useState } from 'react';
// import Button from '../Components/Button';
// import { SignupSchema } from '../Components/Schema';
// import { Formik } from 'formik';
// import { Squares } from "react-activity";
// import "react-activity/dist/library.css";
// import { useNavigate } from 'react-router-dom';
// import bakery_reg from '../assets/images/cycleShop.jpg'
// import customization from '../assets/images/customization.jpg'
// const initialValues = {
//     owner_name: "",
//     business_name: "",
//     speciality: "",
//     contactNumber: "",
//     contactEmail: "",
//     timing: "",
//     logo: null,
//     termsAgreed: false,
// };

// const RegisterBakery = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageChange = (event, setFieldValue) => {
//         const file = event.currentTarget.files[0];
//         if (file) {
//             setFieldValue("logo", file);
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setSelectedImage(e.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div className="flex flex-col bg-gradient-to-r from-gradient-1 to-gradient-5 ">
//         <div className="container mx-auto flex justify-center lg:w-12/12 md:w-10/12">
//             <div className="w-full  bg-white rounded-lg p-8 lg:w-6/12 md:w-8/12 mx-auto">
//                 <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Register Your Bakery</h1>
//                 <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={async (values) => {
//                     setLoading(true);
//                     // Simulate form submission delay
//                     setTimeout(() => {
//                         setLoading(false);
//                         navigate("/login");
//                     }, 2000);
//                 }}>
//                     {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
//                         <form onSubmit={handleSubmit}>
//                             <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.owner_name} name="owner_name" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Owner Name" />
//                             {errors.owner_name && touched.owner_name && <p className="text-red-500 text-left">{errors.owner_name}</p>}
//                             <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.business_name} name="business_name" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Business Name" />
//                             {errors.business_name && touched.business_name && <p className="text-red-500 text-left">{errors.business_name}</p>}
//                             <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.speciality} name="speciality" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Speciality" />
//                             {errors.speciality && touched.speciality && <p className="text-red-500 text-left">{errors.speciality}</p>}
//                             <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.contactNumber} name="contactNumber" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Contact Number" />
//                             {errors.contactNumber && touched.contactNumber && <p className="text-red-500 text-left">{errors.contactNumber}</p>}
//                             <input type="email" onChange={handleChange} onBlur={handleBlur} value={values.contactEmail} name="contactEmail" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Contact Email" />
//                             {errors.contactEmail && touched.contactEmail && <p className="text-red-500 text-left">{errors.contactEmail}</p>}
//                             <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.timing} name="timing" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Timing" />
//                             {errors.timing && touched.timing && <p className="text-red-500 text-left">{errors.timing}</p>}
//                             <div className="flex items-right">
//                                 <label htmlFor="logo" className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4 cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-center items-center">
//                                     {selectedImage ? (
//                                         <img src={selectedImage} alt="Selected Logo" className="h-full mr-2" />
//                                     ) : (
//                                         <span>Select Logo</span>
//                                     )}
//                                 </label>
//                                 <input type="file" onChange={(event) => handleImageChange(event, setFieldValue)} id="logo" className="hidden" accept="image/*" />
//                             </div>
//                             {errors.logo && touched.logo && <p className="text-red-500 text-left">{errors.logo}</p>}

//                         </form>
//                     )}
//                 </Formik>
//             </div>
//             <div className='w-[50%]'>
//             {/* <div className="h-[800px] w-[500px] bg-white mt-10 rounded-lg transform rotate-45 ml-[300px]"></div> */}
//                 {/* <img src={bakery_reg} alt="" className=' h-[600px]  mt-12'/> */}
//             </div>
//         </div>

















//         <div className="container mx-auto flex justify-center lg:w-12/12 md:w-10/12">
//     <div className='w-[50%]'>
//         {/* <div className="h-[800px] w-[800px] bg-white mt-10 rounded-lg transform rotate-45 ml-[-500px]"></div> */}
//         {/* <img src={customization} alt="" /> */}
//     </div>
//     <div className="w-full bg-white rounded-lg p-8 lg:w-6/12 md:w-8/12 mx-auto">
//         <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Customize Cake Info</h1>
//         <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={async (values) => {
//             setLoading(true);
//             // Simulate form submission delay
//             setTimeout(() => {
//                 setLoading(false);
//                 navigate("/login");
//             }, 2000);
//         }}>
//             {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
//                 <form onSubmit={handleSubmit}>
//                     <div className="mt-2 flex flex-col lg:flex-row gap-4 mb-4">
//                         <input
//                             type="text"
//                             name="price_per_pound"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.price_per_pound}
//                             required
//                             className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base lg:w-1/2"
//                             placeholder="Price per pound"
//                         />
//                         <input
//                             type="text"
//                             name="price_per_decoration"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.price_per_decoration}
//                             required
//                             className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base lg:w-1/2"
//                             placeholder="Price per decoration"
//                         />
//                     </div>
//                     <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.priceForTiers} name="priceForTiers" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Price for tiers" />
//                     <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.price_for_shape} name="price_for_shape" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Price for shape" />
//                     <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.tax} name="tax" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" placeholder="Tax" />

//                     {errors.logo && touched.logo && <p className="text-red-500 text-left">{errors.logo}</p>}
//                     <div className="mt-5 flex items-center">
//                         <input type="checkbox" required id="terms" checked={values.termsAgreed} onChange={handleChange} name="termsAgreed" />
//                         <label htmlFor="terms" className="ml-2">I agree to terms & Policy.</label>
//                     </div>
//                     <Button type="submit" className="w-full mt-4">{loading ? <Squares /> : "Register Bakery"}</Button>
//                     <p className="text-xs text-gray-500 mt-4"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
//                 </form>
//             )}
//         </Formik>
//     </div>
// </div>

//         </div>
//     );
// };

// export default RegisterBakery;
import { RegisterBakerySchema } from '../Components/Schema';
import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import { Formik } from 'formik';
import { Squares } from 'react-activity';
import 'react-activity/dist/library.css';
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
const initialValues = {
    owner_name: "",
    business_name: "",
    specialty: "",
    timing: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    longitude: "",
    latitude: "",
    price_per_pound: "",
    price_per_decoration: "",
    price_per_tier: "",
    price_for_shape: "",
    tax: "",
    description: ""

};
import index from '../Components/API';
import app from '../Components/Firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
export default function RegisterBakery() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loader, APIcall, setLoader } = index();
    const { userInfo, fetchData } = useUserData();
    const [PreviewimageLoading, setpreiewImageLoading] = useState(false)
    const storage = getStorage(app);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const handleImageUpload = async () => {
        try {
            if (selectedImage) {
                const timestamp = new Date().getTime();
                const fileExtension = selectedImage.name.split('.').pop().toLowerCase();
                const fileName = `bakery_image_${timestamp}.${fileExtension}`;
                const storageRef = ref(storage, `bakery_images/${fileName}`);

                await uploadBytes(storageRef, selectedImage);
                const downloadURL = await getDownloadURL(storageRef);
                return downloadURL;
            } else {

                throw new Error("Please Upload Your Logo");
            }
        } catch (error) {

            throw error;
        }
    };


    const handleImageChange = (event) => {
        setpreiewImageLoading(true);
        const file = event.target.files[0];
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImageURL(reader.result);
            setpreiewImageLoading(false);

        };
        reader.readAsDataURL(file);
    };


    const getCurrentLocation = (setValues, values) => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Fetch address details using reverse geocoding
                    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=56bf39f3aa1f4abeb883cfad3d27113a`)
                        .then(response => response.json())
                        .then(data => {
                            const { country, city, road, _normalized_city } = data.results[0].components;

                            setValues({
                                ...values,
                                country: country || '',
                                city: city ? city : _normalized_city || '',
                                street: road || '',
                                longitude: longitude.toString(),
                                latitude: latitude.toString()
                            });
                            setLoading(false);

                        })
                        .catch(error => {
                            console.error('Error fetching address details:', error);
                            setLoading(false);
                        });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    };



    return (
        <div className="container mx-auto px-4">
            <div className="w-full mb-3 p-4  shadow-2xl mt-9">
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterBakerySchema}
                    onSubmit={async (values, action) => {
                        try {
                            setLoader(true);
                            const logoURL = await handleImageUpload();
                            if (logoURL) {
                                APIcall('/register-bakery', 'POST', {
                                    ...values,
                                    logo_url: logoURL,
                                    user_id: userInfo.user.id
                                }, action).then((data) => {

                                    if (data.success) {
                                        const userString = { ...userInfo.user, isBakeryRegistered: true, bakery_id: data.data?.id };
                                        const cookieString = Cookies.get('logginUserCreditionals');
                                        const cookieAttributes = cookieString ? JSON.parse(cookieString) : {};
                                        const expirationDate = cookieAttributes.expires;



                                        Cookies.set("logginUserCreditionals", JSON.stringify(userString), {
                                            expires: expirationDate,
                                            path: '/'
                                        });
                                        fetchData();

                                        navigate("/");
                                    }
                                });
                            } else {
                                throw new Error("Failed to upload image");
                            }
                        } catch (error) {
                            toast.error(error.message || "Something Went Wrong", {
                                position: "bottom-right", theme: "dark"
                            });
                        } finally {
                            setLoader(false);
                        }
                    }}
                >

                    {({ values,
                        errors,
                        touched, setValues,
                        handleChange,
                        handleBlur,
                        handleSubmit, }) => (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Register Your Bakery</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="col-span-1 md:col-span-1">
                                    <h2 className="text-xl text-center mb-2 font-bold">Bakery Details</h2>
                                    <div className="mb-4">

                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.owner_name}
                                            name="owner_name"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Owner Name"
                                        />
                                        {errors.owner_name && touched.owner_name && <p className="text-red-500 text-left">{errors.owner_name}</p>}
                                    </div>
                                    <div className="mb-4">

                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.business_name}
                                            name="business_name"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Business Name"
                                        />
                                        {errors.business_name && touched.business_name && <p className="text-red-500 text-left">{errors.business_name}</p>}

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
                                        {errors.specialty && touched.specialty && <p className="text-red-500 text-left">{errors.specialty}</p>}


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
                                        {errors.timing && touched.timing && <p className="text-red-500 text-left">{errors.timing}</p>}
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
                                        {errors.email && touched.email && <p className="text-red-500 text-left">{errors.email}</p>}
                                    </div>

                                    <div className='mb-4'>


                                        <textarea name="description" onChange={handleChange}
                                            onBlur={handleBlur} value={values.description} placeholder='Tell Somthing About your Bakery' className="border pt-3 border-gray-200 rounded-lg  shadow-none pl-5 text-base w-full mb-4"
                                            rows={10} cols={15} />
                                        {errors.description && touched.description && <p className="text-red-500 text-left">{errors.description}</p>}

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
                                        {errors.phone && touched.phone && <p className="text-red-500 text-left">{errors.phone}</p>}
                                    </div>
                                    {/* <div className="mb-4 p-4 bg-gray-200 cursor-pointer rounded-lg" onClick={handleImageUpload} >

                                        <p className="md:w-full ">Upload Your Logo</p>
                                    </div> */}

                                    {imageURL && <img src={imageURL} alt="Selected Preview" style={{ maxWidth: '100%', marginBottom: "20px" }} />}
                                    <div className="mb-4 p-4 bg-gray-200 cursor-pointer rounded-lg">
                                        <label htmlFor="upload-input" className="md:w-full">
                                            Upload Your Logo
                                        </label>
                                        <input
                                            id="upload-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            value={values.logo_url}
                                            name="logo_url"
                                            style={{ display: 'none' }}
                                        />
                                    </div>

                                </div>

                                <div className="col-span-1 md:col-span-1 ">
                                    <h2 className="text-xl text-center font-bold ">Location</h2>

                                    <div className="mt-2 mb-4">

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
                                        {errors.country && touched.country && <p className="text-red-500 text-left">{errors.country}</p>}
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
                                        {errors.city && touched.city && <p className="text-red-500 text-left">{errors.city}</p>}
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
                                        {errors.street && touched.street && <p className="text-red-500 text-left">{errors.street}</p>}
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
                                        {errors.longitude && touched.longitude && <p className="text-red-500 text-left">{errors.longitude}</p>}
                                    </div>
                                    <div className="">

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
                                        {errors.latitude && touched.latitude && <p className="text-red-500 text-left">{errors.latitude}</p>}
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">OR</h1>
                                    </div>
                                    <div className="mt-2 p-4 bg-gray-200 cursor-pointer rounded-lg" onClick={() => getCurrentLocation(setValues, values)}>
                                        <p className="md:w-full">{loading ? <Squares /> : "Get Your Current Location"}</p>
                                    </div>
                                    {/* Add similar input fields for other details */}
                                </div>
                                <div className="col-span-1 md:col-span-1">
                                    <h2 className="text-xl text-center mb-2 font-bold">Cake Customization Info</h2>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price_per_pound}
                                            name="price_per_pound"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Price Per Pound"
                                        />
                                        {errors.price_per_pound && touched.price_per_pound && <p className="text-red-500 text-left">{errors.price_per_pound}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price_per_decoration}
                                            name="price_per_decoration"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Price Per Decoration"
                                        />
                                        {errors.price_per_decoration && touched.price_per_decoration && <p className="text-red-500 text-left">{errors.price_per_decoration}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price_per_tier}
                                            name="price_per_tier"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Price Per Tier"
                                        />
                                        {errors.price_per_tier && touched.price_per_tier && <p className="text-red-500 text-left">{errors.price_per_tier}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price_for_shape}
                                            name="price_for_shape"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Price For Shape"
                                        />
                                        {errors.price_for_shape && touched.price_for_shape && <p className="text-red-500 text-left">{errors.price_for_shape}</p>}
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
                                        {errors.tax && touched.tax && <p className="text-red-500 text-left">{errors.tax}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button type="submit" className="md:w-[12%] mt-4">{loader ? <Squares /> : "Register Bakery"}</Button>
                            </div></form>)}
                </Formik>
            </div>
        </div>
    )
}

