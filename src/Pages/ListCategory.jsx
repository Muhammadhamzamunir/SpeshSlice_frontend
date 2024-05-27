import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import index from '../Components/API';

const ListCategory = () => {
    const { APIcall } = index();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        APIcall('/category', 'GET')
            .then((data) => {

                setCategories(data.data.map((category, index) => ({ ...category, key: index + 1 })));
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
            defaultSortOrder: 'ascend',
            width: '100px', // Set a fixed width for Sr. No column
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            render: (image_url) => <img src={image_url} alt="Category Image" style={{ width: '100px', height: 'auto' }} />,
        },
    ];

    return (
        <div className="md:container mx-auto md:px-4">
            <div className="w-full mb-3 md:p-8 shadow-2xl mt-9">
                <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Categories</h1>

                <div style={{ overflowX: 'auto' }}> {/* Apply horizontal scroll */}
                    <Table columns={columns} dataSource={categories} loading={loading} scroll={{ x: true }} />
                </div>
            </div>
        </div>
    );
};

export default ListCategory;
