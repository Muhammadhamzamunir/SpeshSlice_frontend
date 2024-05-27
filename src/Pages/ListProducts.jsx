import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Modal, message, Input, Button, Checkbox, DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
import index from '../Components/API';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import moment from 'moment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../Components/Firebase/firebaseConfig';
const ListProduct = () => {
    const form = useRef()
    const { APIcall } = index();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const { userInfo } = useUserData();
    const [parsedEndDate, setparsedEndDate] = useState();
    const [parsedStartDate, setparsedStartDate] = useState();
    const [imageURL, setImageURL] = useState('');
    const [PreviewimageLoading, setPreviewImageLoading] = useState(false);
    const storage = getStorage(app);
    const [selectedImage, setSelectedImage] = useState(null);
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

                return downloadURL;
            } else {

                throw new Error("Please Upload Product Image");
            }
        } catch (error) {

            throw error;
        }
    };
    const handleEdit = (record) => {
        let StartDate = moment(record.discounts[0].start_date);
        let EndDate = moment(record.discounts[0].end_date);
        setparsedEndDate(EndDate);
        setparsedStartDate(StartDate);

        setEditingProduct(record);

    };


    const handleCancel = () => {

        setEditingProduct(null);
        setEditingProductData(null)
        setImageURL(null)
    };
    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Product',
            content: 'Are you sure you want to delete this product?',
            okText: 'ok',
            cancelText: 'Cancel',
            onOk() {

                APIcall(`/products/${id}`, 'DELETE')
                    .then(() => {

                        setProducts(products.filter(product => product.id !== id));

                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        message.error('Failed to delete product');
                    });
            },
        });
    };
    useEffect(() => {
        getProducts();
        APIcall(`/category`, 'GET')
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.error('Error fetching category details:', error);
            });
    }, []);


    const getProducts = () => {
        APIcall(`/bakery/${userInfo.user.bakery ? userInfo.user.bakery.id : userInfo.user.bakery_id}`, 'GET')
            .then((data) => {

                setProducts(data.data.products);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => b.id - a.id,
            defaultSortOrder: 'ascend',
            width: 100
        },

        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 300
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            width: 300
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            width: 200
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            sorter: (a, b) => a.category.name.localeCompare(b.category.name),
            width: 150
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            render: (image_url) => <img src={image_url} alt="Product Image" style={{ width: '200px', height: 'auto' }} />,
            width: 150
        },
        {
            title: 'No of Pounds',
            dataIndex: 'no_of_pounds',
            sorter: (a, b) => a.no_of_pounds - b.no_of_pounds,
            width: 150
        },
        {
            title: 'No of Serving',
            dataIndex: 'no_of_serving',
            sorter: (a, b) => a.no_of_serving - b.no_of_serving,
            width: 150
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            width: 150
        },
        {
            title: 'Is Available',
            dataIndex: 'is_available',
            sorter: (a, b) => a.is_available - b.is_available,
            render: (is_available) => (is_available ? 'Yes' : 'No'),
            width: 150
        },
        {
            title: 'Discount Percentage',
            dataIndex: 'discounts',
            render: (discounts) => discounts.map((discount) => `${discount.discount_percentage}%`).join(', '),
            width: 200
        },
        {
            title: 'Discount Start Date',
            dataIndex: 'discounts',
            render: (discounts) => discounts.map((discount) => discount.start_date).join(', '),
            width: 200
        },
        {
            title: 'Discount End Date',
            dataIndex: 'discounts',
            render: (discounts) => discounts.map((discount) => discount.end_date).join(', '),
            width: 200
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)} className="fs-3 text-danger">
                        <BiEdit />
                    </Button>
                    <Button onClick={() => handleDelete(record.id)} className="ms-3 fs-3 text-danger" danger>
                        <AiFillDelete />
                    </Button>
                </Space>
            ),
            width: 150
        },
    ];
    const [editingProductData, setEditingProductData] = useState(null);

    // Update initial values when editingProduct changes
    useEffect(() => {

        let initialValues;
        if (editingProduct) {

            initialValues = {
                id: editingProduct.id,
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                image_url: editingProduct.image_url,
                category: editingProduct.category.id,
                no_of_pounds: editingProduct.no_of_pounds,
                no_of_serving: editingProduct.no_of_serving,
                quantity: editingProduct.quantity,
                is_available: editingProduct.is_available,
                discount_percentage: editingProduct.discounts[0].discount_percentage,
                start_date: editingProduct.discounts[0].start_date ? moment(editingProduct.discounts[0].start_date) : null,
                end_date: editingProduct.discounts[0].end_date ? moment(editingProduct.discounts[0].end_date) : null,
            };
        }

        setEditingProductData(initialValues);
    }, [editingProduct]);

    return (
        <div className="md:container mx-auto md:px-4">
            <div className="w-full mb-3 p-8 shadow-2xl mt-9">
                <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent">Products</h1>
                <div style={{ overflowX: 'auto' }}>
                    <Table columns={columns} bordered dataSource={products} loading={loading} scroll={{ x: true }} size="default" />
                </div>
                {/* Modal for editing product */}
                <Modal
                    title="Edit Product"
                    open={!!editingProduct}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose
                >

                    {editingProductData && (
                        <Formik
                            initialValues={editingProductData}

                            validationSchema={Yup.object({
                                name: Yup.string().required('Required'),
                                description: Yup.string().required('Required'),
                                price: Yup.number().required('Required').min(0, 'Price must be greater than or equal to 0'),
                                image_url: Yup.string().url('Invalid URL'),
                                category: Yup.string().required('Required'),
                                no_of_pounds: Yup.number().required('Required'),
                                no_of_serving: Yup.number().required('Required'),
                                quantity: Yup.number().required('Required'),
                                is_available: Yup.boolean(),
                                discount_percentage: Yup.number().min(0, 'Discount percentage must be greater than or equal to 0').max(100, 'Discount percentage must be less than or equal to 100'),
                                start_date: Yup.date(),
                                end_date: Yup.date().when('start_date', (start_date, schema) => {
                                    return start_date ? schema.min(start_date, 'End date must be after start date') : schema;
                                })
                            })}
                            onSubmit={async (values,) => {
                                let updatedValues
                                if (imageURL) {
                                    const logoURL = await handleImageUpload();
                                    updatedValues = {
                                        ...values,
                                        image_url: logoURL,
                                        start_date: moment(values.start_date).format('YYYY-MM-DD'),
                                        end_date: moment(values.end_date).format('YYYY-MM-DD'),
                                    };
                                } else {
                                    updatedValues = {
                                        ...values,
                                        start_date: moment(values.start_date).format('YYYY-MM-DD'),
                                        end_date: moment(values.end_date).format('YYYY-MM-DD'),
                                    };
                                }

                                APIcall(`/update-products/${values.id}`, 'POST', updatedValues)
                                    .then((response) => {

                                        getProducts();
                                        setEditingProduct(null);
                                        setImageURL(null)
                                    })
                                    .catch(error => {
                                        console.error('Error updating product:', error);

                                    });
                            }}
                        >
                            {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    {/* Name field */}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <Input type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.name && touched.name && <div className="error">{errors.name}</div>}
                                    </div>
                                    {/* Description field */}
                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <Input type="text" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.description && touched.description && <div className="error">{errors.description}</div>}
                                    </div>
                                    {/* Price field */}
                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <Input type="number" name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.price && touched.price && <div className="error">{errors.price}</div>}
                                    </div>
                                    {/* Image URL field */}
                                    {/* <Input type="text" name="id" value={values.id} onChange={handleChange} onBlur={handleBlur} style={{ display: "none" }} />
                                    <div>
                                        <label htmlFor="image_url">Image URL</label>
                                        <Input type="text" name="image_url" value={values.image_url} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.image_url && touched.image_url && <div className="error">{errors.image_url}</div>}
                                    </div> */}
                                    {/* Category field */}
                                    <div>
                                        <label htmlFor="category">Category</label>
                                        <Field
                                            as="select"
                                            name="category"
                                            className="border border-gray-200 rounded p-2 w-full "
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.category}
                                        >

                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </Field>
                                        {errors.category && touched.category && <div className="error">{errors.category}</div>}
                                    </div>
                                    {/* Number of Pounds field */}
                                    <div>
                                        <label htmlFor="no_of_pounds">Number of Pounds</label>
                                        <Input type="number" name="no_of_pounds" value={values.no_of_pounds} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.no_of_pounds && touched.no_of_pounds && <div className="error">{errors.no_of_pounds}</div>}
                                    </div>
                                    {/* Number of Serving field */}
                                    <div>
                                        <label htmlFor="no_of_serving">Number of Serving</label>
                                        <Input type="number" name="no_of_serving" value={values.no_of_serving} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.no_of_serving && touched.no_of_serving && <div className="error">{errors.no_of_serving}</div>}
                                    </div>

                                    {imageURL ?
                                        <img src={imageURL} alt="Selected Preview" style={{ width: '200px', margin: 'auto' }} /> :
                                        <img src={values.image_url} alt="Selected Preview" style={{ width: '200px', margin: 'auto' }} />
                                    }
                                    <div className="mb-4 p-4 bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center">
                                        <label htmlFor="upload-input" className="text-center align-middle">
                                            change Image
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
                                    {/* Quantity field */}
                                    <div>
                                        <label htmlFor="quantity">Quantity</label>
                                        <Input type="number" name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.quantity && touched.quantity && <div className="error">{errors.quantity}</div>}
                                    </div>
                                    {/* Is Available field */}
                                    <div>
                                        <label htmlFor="is_available">Is Available</label>
                                        <Field
                                            as="select"
                                            name="is_available"
                                            className="border border-gray-200 rounded p-2 w-full "
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.is_available}
                                        >
                                            <option value="true">YES</option>
                                            <option value="false">NO</option>
                                        </Field>                                        {errors.is_available && touched.is_available && <div className="error">{errors.is_available}</div>}
                                    </div>
                                    {/* Discount Percentage field */}
                                    <div>
                                        <label htmlFor="discount_percentage">Discount Percentage</label>
                                        <Input type="number" name="discount_percentage" value={values.discount_percentage} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.discount_percentage && touched.discount_percentage && <div className="error">{errors.discount_percentage}</div>}
                                    </div>
                                    {/* Discount Start Date field */}
                                    <div>
                                        <label htmlFor="start_date">Discount Start Date</label>
                                        <DatePicker
                                            name="start_date"
                                            className="border border-gray-200 rounded p-2 w-full "
                                            value={values.start_date}
                                            onChange={val => handleChange({ target: { name: "start_date", value: val } })}
                                            onBlur={handleBlur}
                                        />
                                        {errors.start_date && touched.start_date && <div className="error">{errors.start_date}</div>}
                                    </div>
                                    {/* Discount End Date field */}
                                    <div>
                                        <label htmlFor="end_date">Discount End Date</label>
                                        <DatePicker
                                            className="border border-gray-200 rounded p-2 w-full "
                                            name="end_date"
                                            value={values.end_date}
                                            onChange={val => handleChange({ target: { name: "end_date", value: val } })}
                                            onBlur={handleBlur}
                                        />
                                        {errors.end_date && touched.end_date && <div className="error">{errors.end_date}</div>}
                                    </div>
                                    {/* Submit button */}
                                    <Button type="primary" htmlType="submit">Save</Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Modal>


            </div>
        </div>

    );
};

export default ListProduct;


