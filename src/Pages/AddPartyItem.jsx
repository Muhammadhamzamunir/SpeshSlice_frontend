import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import Button from '../Components/Button';
import index from '../Components/API';
import { Squares } from 'react-activity';
import { ToastContainer, toast } from 'react-toastify';
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../Components/Firebase/firebaseConfig';

import { addProductSchema } from "../Components/Schema";

const initialValues = {
    name: "",
    description: "",
    price: "",
    bakery_id: "",
    image_url: "",
    category: "",
    no_of_pounds: "",
    no_of_serving: "",
    quantity: "",
    is_available: "",
    discount_percentage: null,
    start_date: null,
    end_date: null,
};

const AddPartyItem = () => {
    const { loader, APIcall, setLoader } = index();
    const [categories, setCategories] = useState([]);
    const [provideDiscount, setProvideDiscount] = useState(false);
    const { userInfo, fetchData } = useUserData();
    const [PreviewimageLoading, setPreviewImageLoading] = useState(false);
    const storage = getStorage(app);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState();
    useEffect(() => {
        APIcall(`/category`, 'GET')
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.error('Error fetching category details:', error);
            });
    }, []);

    const handleCheckboxChange = (e) => {
        setProvideDiscount(e.target.checked);
    };
    const handleImageChange = (event) => {
        setPreviewImageLoading(true);
        const file = event.target.files[0];
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImageURL(reader.result);
            setPreviewImageLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = async () => {
        try {
            if (selectedImage) {

                const timestamp = new Date().getTime();
                const fileExtension = selectedImage.name.split('.').pop().toLowerCase();
                const fileName = `bakery_image_${timestamp}.${fileExtension}`;
                const storageRef = ref(storage, `bakery_images/${fileName}`);

                await uploadBytes(storageRef, selectedImage);
                const downloadURL = await getDownloadURL(storageRef);
                console.log(downloadURL);
                return downloadURL;
            } else {

                throw new Error("Please Upload Product Image");
            }
        } catch (error) {

            throw error;
        }
    };
    return (
        <div className="md:container mx-auto md:px-4">
            <div className="w-full mb-3 md:p-4 shadow-2xl mt-9">
                <Formik
                    initialValues={initialValues}
                    validationSchema={addProductSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setLoading(true);

                        try {
                            setLoader(true);
                            const logoURL = await handleImageUpload();

                            if (!logoURL) {
                                throw new Error("Failed to upload image");
                            }

                            // If discount percentage is present, perform additional validations
                            if (values.discount_percentage !== undefined && values.discount_percentage !== null) {
                                // Validate discount percentage
                                if (isNaN(discountPercentage) || values.discount_percentage < 0 || values.discount_percentage > 100) {
                                    throw new Error("Please check discount percentage");
                                }

                                // Validate start date and end date if they are provided
                                if (values.start_date && values.end_date && values.start_date >= values.end_date) {
                                    throw new Error("End date should be greater than start date");
                                }
                            }
                            console.log(values)
                            // If all validations pass, make the API call
                            await APIcall('/products', 'POST', {
                                ...values,
                                image_url: logoURL,
                                bakery_id: userInfo.user.bakery ? userInfo.user.bakery.id : userInfo.user.bakery_id
                            }).then((data) => {
                                console.log(data);
                                if (data?.success) {
                                    resetForm();
                                    setImageURL('');
                                    setLoading(false);

                                }
                            });
                        } catch (error) {
                            setLoading(false);
                            toast.error(error.message || "Something Went Wrong", {
                                position: "bottom-right", theme: "dark"
                            });
                        } finally {
                            setLoader(false);
                            setSubmitting(false);
                        }
                    }}

                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Add Party Item</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-1 md:col-span-1">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            name="name"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Product Title"
                                        />
                                        {errors.name && touched.name && <p className="text-red-500 text-left">{errors.name}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <textarea
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            placeholder="Description"
                                            className="border border-gray-200 rounded-lg h-40 shadow-none pl-5 text-base w-full mb-4"
                                        />
                                        {errors.description && touched.description && <p className="text-red-500 text-left">{errors.description}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                            name="price"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Price in $"
                                        />
                                        {errors.price && touched.price && <p className="text-red-500 text-left">{errors.price}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.quantity}
                                            name="quantity"
                                            required
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Quantity"
                                        />
                                        {errors.quantity && touched.quantity && <p className="text-red-500 text-left">{errors.quantity}</p>}
                                    </div>

                                    {imageURL && <img src={imageURL} alt="Selected Preview" style={{ maxWidth: '100%', marginBottom: "20px" }} />}
                                    <div className="mb-4 p-4 bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center">
                                        <label htmlFor="upload-input" className="text-center align-middle">
                                            Upload Product Image
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
                                <div className="col-span-1 md:col-span-1">

                                    <div className="mb-4">
                                        <Field
                                            required
                                            as="select"
                                            name="category"
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.category || "partyItemId"} // Set default value to "partyItemId"
                                            disabled // Disable the select element
                                        >
                                            <option value="partyItemId" disabled className="text-gray-500 bg-gray-500">Party Item</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </Field>
                                        {errors.category && touched.category && <p className="text-red-500 text-left">{errors.category}</p>}
                                    </div>


                                    <div className="mb-4">
                                        <Field required
                                            as="select"
                                            name="is_available"
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.is_available}
                                        >
                                            <option value="" disabled >Select Availability</option>
                                            <option value="true">YES</option>
                                            <option value="false">NO</option>
                                        </Field>
                                        {errors.is_available && touched.is_available && <p className="text-red-500 text-left">{errors.is_available}</p>}
                                    </div>


                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.discount_percentage}
                                            name="discount_percentage"
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Discount Percentage (Optional)"
                                        />
                                        {errors.discount_percentage && touched.discount_percentage && <p className="text-red-500 text-left">{errors.discount_percentage}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.start_date}
                                            name="start_date"
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="Start Date (Optional)"
                                        />
                                        {errors.start_date && touched.start_date && <p className="text-red-500 text-left">{errors.start_date}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.end_date}
                                            name="end_date"
                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                            placeholder="End Date (Optional)"
                                        />
                                        {errors.end_date && touched.end_date && <p className="text-red-500 text-left">{errors.end_date}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button type="submit" className=" mt-4" >
                                    {loading ? <Squares /> : "Add Product"}
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );


};

export default AddPartyItem;


