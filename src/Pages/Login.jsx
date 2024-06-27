import React, { useEffect, useState } from 'react';
import "./CSS/Login.css"
import Button from '../Components/Button';
import { Modal, Input, message } from 'antd';
import { loginSchema } from '../Components/Schema';
import { Formik, Field } from 'formik';

import 'react-toastify/dist/ReactToastify.css';
import { Squares } from "react-activity";
import "react-activity/dist/library.css";
import index from '../Components/API';
import { SetCookie } from '../Components/Cookies';
import { useNavigate, } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
let initialValues = {
    email: "",
    password: "",
    securityCode: "",
    remember_me: ""
}
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
const Login = () => {
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(false);
    const { fetchData } = useUserData();
    const [email, setEmail] = useState('');
    const [securityCode, setSecurityCode] = useState(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    const { loader, APIcall } = index();
    const [loading,setLoading]= useState(false);
    const [F_loading, setFLoading] = useState(false)

    const handleForgetPassword = () => {
        const emailRegex = /@[^.]*\./;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid Email.", {
                position: "bottom-right", theme: "dark"
            });
        } else {
            
            setFLoading(true)
            
            APIcall('/forgetpassword', 'POST', {email:email}).then((data) => {
                console.log(data);
                toast.success(data?.message, {
                    position: "bottom-right", theme: "dark"
                });
                setFLoading(false)
            setVisibleModal(false)
            });
            
        }
    }
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    return (

        <div className="page-content pt-20 pb-20">

            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="lg:w-12/12 md:w-10/12">
                        <div className="lg:flex">
                            <div className="hidden lg:block lg:w-5/12  ">
                                <img className="" src="./src/assets/images/Login_image.jpg" alt="" />
                            </div>
                            <div className="lg:w-6/12 md:w-8/12 mx-auto">
                                <div className="bg-white rounded-lg">
                                    <div className="p-8 flex justify-start items-start flex-col">
                                        <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Login</h1>

                                        <p className="mb-6">Don't have an account? <a href="/SignUp" className="bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Create here</a></p>

                                        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={async (values, action) => {

                                            if (values.securityCode == securityCode) {
                                                setLoading(true)
                                                APIcall('/login', 'POST', values, action).then((data) => {

                                                    if (data.success && data.rememberMe) {
                                                      
                                                      SetCookie(data.token, data.user, 720);
                                                       navigate("/", { replace: true });
                                                       action.resetForm();

                                                    } else if (data.success && !data.rememberMe) {
                                                        SetCookie(data.token, data.user, 1);
                                                         navigate("/", { replace: true });
                                                         action.resetForm();
                                                    }else{
                                                        
                                                        setSecurityCode(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000    )

                                                    }
                                                     fetchData();
                                                    setLoading(false)
                                                })


                                            } else {
                                                toast.error("Security Code Is Not Same !", {
                                                    position: "bottom-right", theme: "dark"
                                                });
                                                setLoading(false)
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
                                                        <input type="text" name='email' onChange={handleChange} onBlur={handleBlur} values={values.email} required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Enter Email" />
                                                        {errors.email && touched.email ? (
                                                            <p className=" text-red-500   text-left">{errors.email + "*"}</p>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-4">
                                                        <input type="password" name='password' onChange={handleChange} onBlur={handleBlur} values={values.password} required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full" placeholder="Your Password" />
                                                        {errors.password && touched.password ? (
                                                            <p className=" text-red-500   text-left">{errors.password + "*"}</p>
                                                        ) : null}
                                                    </div>

                                                    <div className=" mt-2 flex items-center justify-between ">
                                                        <input type="text" name='securityCode' onChange={handleChange} onBlur={handleBlur} values={values.securityCode} required className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base" placeholder="Security code *" />
                                                        <span className=" rounded-lg h-16 leading-16 px-10 text-lg font-bold bg-pink-200 text-gray-700 flex items-center justify-between gap-1">
                                                            <b className="text-black-500">{securityCode}</b>

                                                        </span>
                                                    </div>
                                                    {errors.securityCode && touched.securityCode ? (
                                                        <p className=" text-red-500   text-left">{errors.securityCode + "*"}</p>
                                                    ) : null}

                                                    <div className="mb-5 mt-5 flex items-center justify-between gap-15">
                                                        <div>
                                                            <Field type="checkbox" id="terms" name="remember_me" value="remember_me" />
                                                            <label htmlFor="terms" className="ml-2">Remember me</label>
                                                        </div>

                                                        <div>
                                                            <div className=" ">
                                                                <p  className="cursor-pointer"  onClick={() => setVisibleModal(true)} >Forgot password?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <Button type="submit" className="w-full">{loading ? <Squares /> : "Login"}</Button>
                                                    </div>
                                                    <p className="text-xs text-gray-500"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
                                                </form>)}
                                        </Formik>
                                    </div>
                                </div>
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
            <Modal
                title="Customize Cake"
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleForgetPassword}>
                       {F_loading ? <Squares />: "Send"}  
                    </Button>
                ]}
            >
                <div>
                    <div className="mb-4">
                        <label htmlFor="" className=''>Enter Your Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            placeholder="e.g: abc@gmail.com"
                            className="border border-gray-200 rounded-lg h-12 outline-red-400 shadow-none pl-5 text-base w-full"

                        />
                    </div>
                  
                </div>
            </Modal>
        </div>
    );




























    // return (
    //     <div className="page-content">
    //         <div className="main-container ">

    //                 <div className="img-container ">
    //                     <img className="" src="./src/assets/images/Login_image.jpg" alt="" />
    //                 </div>
    //                 <div className="form-container">

    //                         <div className="element">
    //                             <h1 className="Login_text">Login</h1>
    //                             <p>Don't have an account? <a href="page-register.html" className="text">Create here</a></p>
    //                         </div>
    //                         <form>
    //                             <div className="element">
    //                                 <input type="text" required name="email" placeholder="Username or Email *" className="Input" />
    //                             </div>
    //                             <div className="element">
    //                                 <input required type="password" name="password" placeholder="Your password *" className="Input" />
    //                             </div>
    //                             <div className="element sub-element code">
    //                                 <input type="text" required name="email" placeholder="Security code *" className="Input "/>
    //                                 <span class="security-code">
    //                                                 <b class="text-new">8</b>
    //                                                 <b class="text-hot">6</b>
    //                                                 <b class="text-sale">7</b>
    //                                                 <b class="text-best">5</b>
    //                                             </span>
    //                             </div>
    //                            <div className='element sub-element code'>
    //                            <div className=" element sub-element">
    //                                 <input className="" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
    //                                 <label htmlFor="exampleCheckbox1" className="">  Remember me</label>
    //                             </div>
    //                             <div className=" element sub-element">
    //                                 <a href="#" className="" >Forgot password?</a>
    //                             </div>
    //                            </div>
    //                             <div>

    //                             <Button type="submit" className="w-full">Login</Button>
    //                             </div>
    //                         </form>

    //                 </div>

    //         </div>
    //     </div>
    // );
};

export default Login;
