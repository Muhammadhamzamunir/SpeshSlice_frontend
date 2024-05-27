
import { addCategorySchema } from '../Components/Schema';
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Button from '../Components/Button';
import index from '../Components/API';
import { Squares } from 'react-activity';
import { toast } from 'react-toastify';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../Components/Firebase/firebaseConfig';

const initialValues = {
    name: '',

};
export default function AddCategory() {


    const { loader, APIcall, setLoader } = index();
    const [provideDiscount, setProvideDiscount] = useState(false);
    const [PreviewimageLoading, setPreviewImageLoading] = useState(false);
    const storage = getStorage(app);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
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
                const fileName = `category_image_${timestamp}.${fileExtension}`;
                const storageRef = ref(storage, `category_image_/${fileName}`);

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
            <div className="w-full mb-3 md:p-8 shadow-2xl mt-9 flex flex-col md:flex-row  gap-4">
                <div className='w-1/2 h-[400px]'> <Formik
                    initialValues={initialValues}
                    validationSchema={addCategorySchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {

                        try {
                            setLoader(true);
                            const logoURL = await handleImageUpload();


                            if (logoURL) {
                                await APIcall('/category', 'POST', {
                                    ...values,
                                    image_url: logoURL,

                                }).then((data) => {
                                    if (data.success) {
                                        resetForm();
                                        setImageURL('')
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
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Add Category</h1>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    name="name"
                                    required
                                    className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4"
                                    placeholder="Category Name"
                                />
                                {errors.name && touched.name && <p className="text-red-500 text-left">{errors.name}</p>}
                            </div>
                            <div className="mb-4 p-4 bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center">
                                <label htmlFor="upload-input" className="text-center w-[50%] m-auto">
                                    Upload Image
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
                            <Button type="submit" className=" mt-4" disabled={isSubmitting}>
                                {isSubmitting ? <Squares /> : "Add Category"}
                            </Button>
                        </form>
                    )}
                </Formik></div>
                <div>
                    {imageURL && <img src={imageURL} alt="Selected Preview" className='h-[300px] object-cover' style={{ maxWidth: '90%', marginBottom: "20px" }} />}

                </div>

            </div>
        </div>

    )
};