import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Image,Tag } from 'antd';
import { useUserData } from '../UserAuthentication(ContextApi)';
import index from '../API';

const ViewOrdersModal = ({ isOpen, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userInfo } = useUserData();
    const { APIcall } = index();

    const handleViewOrders = () => {
        setLoading(true);
        APIcall(`/getUserOrder/${userInfo.user.id}`).then(data => {
            
            setOrders(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching orders:', error);
            setLoading(false);
        });
    };

    useEffect(() => {
        handleViewOrders();
    }, []);

    const handleCancel = (record) => {
        APIcall(`/cancelOrder/${record.id}`, 'POST').then((data) => {
           
            handleViewOrders();
        }).catch(error => {
            console.error('Error cancelling order:', error);
        });
    };

    const isOrderPlacedMoreThan6HoursAgo = (record) => {
        const orderPlacedTime = new Date(record.created_at);
        const currentTime = new Date();
        const diffInHours = (currentTime - orderPlacedTime) / (1000 * 60 * 60);
        return record.status !== 'pending' || diffInHours > 6;
    };

    const columns = [
        {
            title: 'orderId',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Product Image',
            dataIndex: 'product',
            key: 'productImage',
            render: (product) => <Image src={product.image_url} width={50} />,
            fixed: 'left', 
        },
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'productName',
            render: (product) => product.name,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unitPrice',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'totalAmount',
        },
        {
            title: 'Bakery Name',
            dataIndex: 'bakery',
            key: 'bakeryName',
            render: (bakery) => bakery.business_name,
        },
        {
            title: 'Selected Address',
            dataIndex: 'selected_address',
            key: 'selectedAddress',
        },{
            title: 'Phone',
            dataIndex: 'user_phone',
            key: 'user_phone',
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
            render: (status) => (
                <Tag color={status === 'pending' ? 'blue' : status === 'completed' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    {!isOrderPlacedMoreThan6HoursAgo(record) && (
                        <>
                            {record.status === 'pending' && (
                                <Button
                                    type="danger btn"
                                    onClick={() => handleCancel(record)}
                                >
                                    Cancel
                                </Button>
                            )}
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
                rowKey="id" 
                scroll={{ x: 'max-content' }} 
                pagination={true} 
                responsive 
            />
        </Modal>
    );
};

export default ViewOrdersModal;
