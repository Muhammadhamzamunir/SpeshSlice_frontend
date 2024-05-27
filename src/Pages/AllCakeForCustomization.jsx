import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function AllCakeForCustomization() {
    const [visibleModal, setVisibleModal] = useState(false);
    const [noofpound, setNoOfPound] = useState('');
    const [nooftier, setnooftier] = useState(1);

    const handleCustomize = () => {
        if (noofpound <= 0 || nooftier <= 0 || isNaN(noofpound) || isNaN(nooftier)) {
            toast.error("Please enter valid values for pound and serving.", {
                position: "bottom-right", theme: "dark"
            });

        } else {

            localStorage.setItem('customization', JSON.stringify({ noofpound, nooftier }));

            window.location.href = '/cake/1';
        }
    };

    const handleChangePound = (e) => {
        setNoOfPound(e.target.value);
    };

    const handleChangeServing = (e) => {
        setnooftier(e.target.value);
    };

    return (
        <div className='w-[90%] mt-8 m-auto'>
            <h1 className="my-6 font-bold text-2xl text-left text-pink-500">Cakes For Customization</h1>

            <div className="w-[33%] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <a href="#!">
                    <img className="rounded-t-lg w-full" src="./src/assets/images/customizeCake1.png" alt="" />
                </a>
                <div className="p-6">
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        A Beautiful Rounded Cake You can add Ribbons, Balls, and Border and can make it more beautiful
                    </p>
                    <button onClick={() => setVisibleModal(true)}>
                        <Button>Customize it</Button>
                    </button>
                </div>
            </div>

            <Modal
                title="Customize Cake"
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleCustomize}>
                        Customize it
                    </Button>
                ]}
            >
                <div>
                    <div className="mb-4">
                        <label htmlFor="" className=''>No of Pound</label>
                        <Input
                            type="number"
                            value={noofpound}
                            onChange={handleChangePound}
                            placeholder="Number of Pound"
                            className="border border-gray-200 rounded-lg h-12 outline-red-400 shadow-none pl-5 text-base w-full"

                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="" className=''>No of Tier (can't change)</label>
                        <Input
                            readOnly

                            type="number"
                            value={nooftier}
                            onChange={handleChangeServing}
                            placeholder="Number of Serving"
                            className="border border-gray-200 rounded-lg h-12 shadow-none pl-5 text-base w-full"

                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
