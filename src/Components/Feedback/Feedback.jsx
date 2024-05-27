import React, { useEffect, useState } from 'react';
import { Modal, Input, Button as button, Divider, Row, Col, message } from 'antd';
import Button from '../Button';
import Rating from 'react-rating-stars-component';
import Index from '../API';
import { useUserData } from '../UserAuthentication(ContextApi)';

export default function Feedback() {
    const { APIcall } = Index();
    const { userInfo } = useUserData();
    const [products, setProducts] = useState([]);
    const [bakeries, setBakeries] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBakery, setSelectedBakery] = useState(null);
    const [visibleFeedbackModal, setVisibleFeedbackModal] = useState(true)
    const [visibleProductModal, setVisibleProductModal] = useState(false);
    const [visibleBakeryModal, setVisibleBakeryModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [toxicComment, setToxicComment] = useState(false);
    const checkCommentToxicity = async (comment) => {
        try {
            const response = await fetch('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyC2tjuYnAXiw43cCasuP2RSde8VBou1400', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: { text: comment },
                    requestedAttributes: {
                        TOXICITY: {},
                        SPAM: {},
                        SEVERE_TOXICITY: {}

                    },
                }),
            });
            const responseData = await response.json();


            const toxicityScore = responseData.attributeScores.TOXICITY.summaryScore.value;
            const spamScore = responseData.attributeScores.SPAM.summaryScore.value;



            const toxicityThreshold = 0.7;
            const spamThreshold = 0.7;



            const isToxic = toxicityScore > toxicityThreshold;
            const isSpam = spamScore > spamThreshold;


            return isToxic || isSpam ;
        } catch (error) {
            console.error('Error analyzing comment:', error);
            return false;
        }
    };


    const handleConfirm = () => {
        setConfirmVisible(false);
        setVisibleFeedbackModal(false);
        APIcall(`/pending-feedback/${userInfo.user.id}`, 'DELETE')
    };

    const handleCancelConfirm = () => {
        setConfirmVisible(false);
    };
    useEffect(() => {
        checkPendingFeedback();
    }, []);
const checkPendingFeedback=()=>{
    APIcall(`/pending-feedback/${userInfo.user.id}`, 'GET')
    .then((data) => {
        setProducts(data.products);
        setBakeries(data.bakeries);
    })
    .catch((error) => {
        console.error('Error fetching products:', error);
    });
}
    const handleProductFeedback = (product) => {
        setSelectedProduct(product);
        setVisibleProductModal(true);
    };

    const handleBakeryFeedback = (bakery) => {
        setSelectedBakery(bakery);
        setVisibleBakeryModal(true);
    };

    const submitBakeryFeedback = async () => {
        const isToxic = await checkCommentToxicity(description);
        if (isToxic) {

            setToxicComment(true);

            
            return;
        }
        else {
            setToxicComment(false);
             const record = {
                user_id: userInfo.user.id,
                bakery_id:selectedBakery.id,
                rating:rating,
                description:description
             }
            APIcall(`/bakery/${selectedBakery.id}/review`, 'POST',record)
                .then((data) => {
                    setRating(0);
                    setVisibleBakeryModal(false)
                    checkPendingFeedback();
                    setDescription('')
                })

        }
    };

    const submitProductFeedback = async () => {
        const isToxic = await checkCommentToxicity(description);
        if (isToxic) {

            setToxicComment(true);

          
            return;
        }
        else {
            setToxicComment(false);
             const record = {
                user_id: userInfo.user.id,
                product_id:selectedProduct.id,
                rating:rating,
                description:description
             }
            APIcall(`/products/${selectedProduct.id}/review`, 'POST',record)
                .then((data) => {
                     setRating(0);
                     setVisibleProductModal(false)
                     checkPendingFeedback();
                     setDescription('')
                })

        }
    }
    return (
        <>
            <Modal
                title="Product Feedback"
                open={visibleProductModal}
                onCancel={() => { setToxicComment(false); setVisibleProductModal(false) }}
                footer={[
                    <Button key="submit" type="primary" onClick={submitProductFeedback}>
                        Submit
                    </Button>,
                ]}
            >
                <div>
                    <Rating
                        count={5}
                        size={20}
                        value={rating}
                        onChange={(rating) => setRating(rating)}
                        isHalf={true}
                        activeColor="#ff579a"
                        className="mt-4"
                    />
                    <label htmlFor="description">Description</label>
                    <Input
                        type="text"
                        name="description"
                        className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {toxicComment && (
                        <p className="text-red-500 mt-2">The comment contains toxic content or spam. Please revise.</p>
                    )}
                </div>
            </Modal>

            <Modal
                title="Bakery Feedback"
                open={visibleBakeryModal}
                onCancel={() => { setToxicComment(false); setVisibleBakeryModal(false) }}
                footer={[
                    <Button key="submit" type="primary" onClick={() => submitBakeryFeedback()}>
                        Submit
                    </Button>,
                ]}
            >
                <div>
                    <Rating
                        count={5}
                        size={20}
                        value={rating}
                        onChange={(rating) => setRating(rating)}
                        isHalf={true}
                        activeColor="#ff579a"
                        className="mt-4"
                    />
                    <label htmlFor="description">Description</label>
                    <Input
                        type="text"
                        name="description"
                        className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {toxicComment && (
                        <p className="text-red-500 mt-2">The comment contains toxic content. Please revise.</p>
                    )}
                </div>
            </Modal>
            {
                (products.length > 0 || bakeries.length > 0) && (
                    <Modal open={visibleFeedbackModal} title="FeedBack For The Prodcts You Buyed" onCancel={() => setVisibleFeedbackModal(false)} footer={[<button key="dontFeedback" type="primary" className='border p-2 rounded-md' onClick={() => setConfirmVisible(true)}>I don't want to give feedback</button>]}>
                        {products.length > 0 && (
                            <div>
                                <h2 className="text-gray-500 font-bold mb-2">Products</h2>
                                <Row gutter={[16, 16]}>
                                    {products.map((product) => (
                                        <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
                                            <div className="product-card border p-2 rounded-lg">
                                                <img className="w-full h-16  object-cover mb-2" src={product.image_url} alt={product.name} />
                                                <h6 className=" font-semibold">{product.name}</h6>
                                                <Button className={"px-3  "} onClick={() => handleProductFeedback(product)}>Give Feedback</Button>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        {bakeries.length > 0 && (
                            <>
                                <Divider />

                                <div>
                                    <h2 className="text-gray-500 font-bold mt-4">Bakeries</h2>
                                    <Row gutter={[16, 16]}>
                                        {bakeries.map((bakery) => (
                                            <Col key={bakery.id} xs={24} sm={12} md={8} lg={8}>
                                                <div className="bakery-card border p-4 rounded-lg">
                                                    <img className="w-full h-16  object-cover mb-2" src={bakery.logo_url} alt={bakery.business_name} />
                                                    <h6 className=" font-semibold">{bakery.business_name}</h6>
                                                    <Button className={"px-3  "} onClick={() => handleBakeryFeedback(bakery)}>Give Feedback</Button>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </>
                        )}
                    </Modal>


                )
            }
            <Modal
                title="Confirmation"
                open={confirmVisible}
                onOk={handleConfirm}
                onCancel={handleCancelConfirm}
            >
                <p>Are you sure you don't want to give feedback?</p>
            </Modal>
        </>

    );
}
