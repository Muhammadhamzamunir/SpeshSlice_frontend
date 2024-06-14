import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Image } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

const ViewOrdersModal = ({ isOpen, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/getUserOrder/2');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleViewOrders();
    }, []);

    const handleEdit = (record) => {
        setSelectedOrder(record);
        // Logic to handle editing the order
    };

    const handleCancel = async (record) => {
        console.log(record);
        try {
            // Logic to handle canceling the order
            const response = await fetch(`http://127.0.0.1:8000/api/cancelOrder/${record.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.success) {
                // handleViewOrders();
            } else {
                console.error('Failed to cancel order');

            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const isOrderPlacedMoreThan6HoursAgo = (record) => {
        const orderPlacedTime = new Date(record.created_at);
        const currentTime = new Date();
        const diffInHours = (currentTime - orderPlacedTime) / (1000 * 60 * 60);
        return diffInHours > 6;
    };

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'product',
            key: 'product',
            render: (product) => <Image src={product.image_url} width={50} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'productName',
            render: (product) => product.name,
        },
        {
            title: 'Bakery Name',
            dataIndex: 'bakery',
            key: 'bakeryName',
            render: (bakery) => bakery.business_name,
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        {
            title: 'Selected Address',
            dataIndex: 'selected_address',
            key: 'selected_address',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    {!isOrderPlacedMoreThan6HoursAgo(record) && (
                        <>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(record)}
                            >
                                Edit
                            </Button>
                            <Button
                                type="danger"
                                icon={<CloseOutlined />}
                                onClick={() => handleCancel(record)}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </>
            ),
        },
    ];

    return (
        <Modal
            title="My Orders"
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Table
                dataSource={orders}
                columns={columns}
                loading={loading}
                rowKey="orderId"
            />
        </Modal>
    );
};

export default ViewOrdersModal;
