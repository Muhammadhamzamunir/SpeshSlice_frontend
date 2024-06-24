import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, Button, Form } from "antd";
import Rating from "react-rating-stars-component";
import { FaPhone, FaMailBulk, FaClock, FaMoneyBillAlt, FaRegClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import Skeleton from "react-loading-skeleton";
import { useUserData } from "./UserAuthentication(ContextApi)";
// import "./CSS/bakeryDetail.css";

const BakeryDetailsAndEdits = () => {
    const { userInfo, fetchData } = useUserData();
    const [bakeryId, setBakeryId] = useState(userInfo.user.bakery.id);
    const [bakeryDetails, setBakeryDetails] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [walletInfo, setWalletInfo] = useState();
    const [form] = Form.useForm();
    useEffect(() => {
        fetchBakeryData();
    }, []);

    const fetchBakeryData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/bakery/${bakeryId}`);
            const response2 = await axios.get(`http://127.0.0.1:8000/api/getBakeryPaymentInfo/${bakeryId}`);
            setWalletInfo(response2.data.data);
            setBakeryDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching bakery data:", error);
        }
    };

    const handleEditClick = () => {
        setIsModalVisible(true);
        form.setFieldsValue({
            owner_name: bakeryDetails.owner_name,
            business_name: bakeryDetails.business_name,
            specialty: bakeryDetails.specialty,
            timing: bakeryDetails.timing,
            email: bakeryDetails.email,
            phone: bakeryDetails.phone,
            description: bakeryDetails.description,
            price_per_tier: bakeryDetails.price_per_tier,
            price_per_pound: bakeryDetails.price_per_pound,
            tax: bakeryDetails.tax,
            price_per_decoration: bakeryDetails.price_per_decoration
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            await axios.post(`http://127.0.0.1:8000/api/updateBakery-Details/${bakeryId}`, values);
            setIsModalVisible(false);
            fetchBakeryData();
        } catch (error) {
            console.error("Error saving bakery data:", error);
        }
    };

    return (
        <div className="bakery-details-container">
            <div className="bg-white shadow  rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center"> <div className="flex items-end gap-3"><h1 className="text-3xl">Wallet </h1> <h1>Ammount</h1></div>
                    <p>{walletInfo ? walletInfo.payment : 0.00} $</p></div>
                <p className=" text-gray-500">contact with Admin to get your money </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
                {bakeryDetails ? (
                    <>
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">
                                {bakeryDetails.business_name}
                            </h2>
                            <Button type="primary" onClick={handleEditClick}>
                                Edit
                            </Button>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row">
                            <div className="md:w-1/3 md:pl-8 pl-0">
                                <p className="text-pink-500 mt-2 font-semibold">
                                    {bakeryDetails.specialty}
                                </p>
                                <div className="flex items-center mt-4">
                                    <FaClock className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">{bakeryDetails.timing}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaPhone className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">{bakeryDetails.phone}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaMailBulk className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">{bakeryDetails.email}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaMoneyBillAlt className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">
                                        Price per pound: ${bakeryDetails.price_per_pound}
                                    </p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaMoneyBillAlt className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">
                                        Price per Decoration: ${bakeryDetails.price_per_decoration}
                                    </p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaMoneyBillAlt className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">
                                        Price per Tier:  ${bakeryDetails.price_per_tier}
                                    </p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaMoneyBillAlt className="h-4 w-4" />
                                    <p className="ml-2 text-gray-700">
                                        Tax : ${bakeryDetails.tax}
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/3 flex justify-center items-center md:mb-2 mb-0">
                                <div className="bg-white rounded-lg mb-6 md:mt-5 mt-3">
                                    <div className="flex gap-2 items-center">
                                        <Rating
                                            count={5}
                                            value={parseFloat(bakeryDetails.averageRating)}
                                            size={24}
                                            activeColor="#ff59ac"
                                            isHalf={true}
                                            edit={false}
                                        />
                                        <p>({bakeryDetails.rating_count})</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                                        <p className="text-lg text-gray-800 mb-2">
                                            {bakeryDetails.address.street}, {bakeryDetails.address.city}, {bakeryDetails.address.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={bakeryDetails.logo_url}
                                alt="Bakery Logo"
                                className="w-36 h-36 object-cover rounded-full border-2 md:ml-auto mt-10"
                            />
                        </div>
                    </>
                ) : (
                    <Skeleton count={1} height={200} className="w-full" />
                )}
            </div>

            <div className="reviews-container">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Reviews</h2>
                {bakeryDetails?.reviews?.map((review, index) => (
                    <div key={index} className="review-card border p-2 md:p-4 rounded-xl mb-4">
                        <div className="flex items-center">
                            <div className="user-info items-start">
                                <img src={review.user.profile_url} alt={review.user.username} className="user-avatar h-20 md:h-32 w-20 md:w-32" />
                            </div>
                            <div className="review-content">
                                <div className="flex items-center md:gap-4 gap-4">
                                    <p className="username font-semibold md:text-[20px]">{review.user.username}</p>
                                    <p className="text-gray-400 flex items-center gap-[2px]">
                                        <FaRegClock />
                                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                    </p>
                                </div>
                                <div className="mb-3 flex gap-1 items-center">
                                    <Rating
                                        count={5}
                                        size={16}
                                        value={parseFloat(review.rating)}
                                        edit={false}
                                        isHalf={true}
                                        activeColor="#ff579a"
                                    />
                                    <p className="text-gray-500">({review.rating})</p>
                                </div>
                            </div>
                        </div>
                        <p className="description text-gray-500 md:pl-[15%] pl-7">{review.description}</p>
                    </div>
                ))}
            </div>

            <Modal
                title="Edit Bakery Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="owner_name" label="Owner Name" rules={[{ required: true, message: "Please input the owner name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="business_name" label="Business Name" rules={[{ required: true, message: "Please input the business name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="specialty" label="Specialty" rules={[{ required: true, message: "Please input the specialty!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="timing" label="Timing" rules={[{ required: true, message: "Please input the timing!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input the phone number!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price_per_tier" label="price_per_tier" rules={[{ required: true, message: "Please input the price_per_tier!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price_per_pound" label="price_per_pound" rules={[{ required: true, message: "Please input the price_per_pound!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="tax" label="tax" rules={[{ required: true, message: "Please input the tax!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price_per_decoration" label="price_per_decoration" rules={[{ required: true, message: "Please input the price_per_decoration!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BakeryDetailsAndEdits;
