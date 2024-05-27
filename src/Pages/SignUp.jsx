import React, { useState } from 'react';
import Button from '../Components/Button';
import { SignupSchema } from '../Components/Schema';
import { Formik } from 'formik';
import index from '../Components/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Squares } from "react-activity";
import "react-activity/dist/library.css";
import { useNavigate } from 'react-router-dom';
let initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: '',
    securityCode: "",
}





const SignUp = () => {
    const navigate = useNavigate();
    const [securityCode, setSecurityCode] = useState(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    const { loader, APIcall } = index();
    return (
        <div className="page-content pt-20 pb-20 z-0">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="lg:w-12/12 md:w-10/12">
                        <div className="lg:flex">
                            <div className="lg:w-6/12 md:w-8/12 mx-auto">
                                <div className="bg-white rounded-lg">
                                    <div className="px-8 flex justify-start items-start flex-col">
                                        <h1 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Create an Account</h1>

                                        <p className="mb-2">Already have an account? <a href="#" className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Login</a></p>

                                        <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={async (values, action) => {

                                            if (values.securityCode == securityCode) {

                                                APIcall('/signup', 'POST', values, action).then((data) => {
                                                    if (data.success) {
                                                        navigate("/login")
                                                    }

                                                })

                                            } else {
                                                toast.error("Security Code Is Not Same !", {
                                                    position: "bottom-right", theme: "dark"
                                                });

                                            }

                                        }}>
                                            {({ values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit, }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-4">
                                                        <input type="text" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.username} name="username" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Username" />
                                                        {errors.username && touched.username ? (
                                                            <p className=" text-red-500   text-left">{errors.username + "*"}</p>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-4">
                                                        <input type="text" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email} name="email" required 
                                                            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" 
                                                            placeholder="Email" />
                                                        {errors.email && touched.email ? (
                                                            <p className="text-red-500    text-left">{errors.email + "*"}</p>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-4">
                                                        <input type="password" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password} name="password" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Password" />
                                                        {errors.password && touched.password ? (
                                                            <p className="text-red-500    text-left">{errors.password + "*"}</p>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-4">
                                                        <input type="password" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.confirm_password} name="confirm_password" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Confirm password" />
                                                        {errors.confirm_password && touched.confirm_password ? (
                                                            <p className="text-red-500    text-left">{errors.confirm_password + "*"}</p>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-4">
                                                        <input type="text" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.phone} name="phone" required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Phone Number" />
                                                        {errors.phone && touched.phone ? (
                                                            <p className=" text-red-500   text-left">{errors.phone + "*"}</p>
                                                        ) : null}
                                                    </div>
                                                    <div className=" mt-2 flex items-center justify-between gap-15">
                                                        <input type="text" name="securityCode" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.securityCode} required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base" placeholder="Security code " />
                                                        <span className="rounded-lg h-16 leading-16 px-10 text-lg font-bold bg-pink-200 text-gray-700 flex items-center justify-between gap-1">
                                                            <b className="text-black-500">{securityCode}</b>

                                                        </span>
                                                    </div>{errors.securityCode && touched.securityCode ? (
                                                        <p className="text-red-500 text-left">{errors.securityCode + "*"}</p>
                                                    ) : null}


                                                    <div className="mb-4 mt-5 text-left">
                                                        <input type="checkbox" required id="terms" />
                                                        <label htmlFor="terms" className="ml-2 text-left">I agree to terms & Policy.</label>
                                                    </div>
                                                    <div className="mb-4">
                                                        <Button type="submit" className="w-full">{loader ? <Squares /> : "Submit & Register"}</Button>
                                                    </div>
                                                    <p className="text-xs text-gray-500"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block lg:w-6/12 h-full ">
                                <img className="" src="./src/assets/images/Login_image.jpg" alt="" />
                            </div>
                            {/* <div className="hidden lg:block lg:w-6/12 shadow-md ">
                                <div className="mt-8">
                                    <a href="#" className="btn btn-facebook w-full mb-4">Continue with Facebook</a>
                                    <a href="#" className="btn btn-google w-full mb-4">Continue with Google</a>
                                    <a href="#" className="btn btn-apple w-full">Continue with Apple</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
