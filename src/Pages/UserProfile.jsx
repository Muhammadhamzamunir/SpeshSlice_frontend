import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import { Table, Space, Modal, message, Input, Checkbox, DatePicker, Select } from 'antd';
import Feedback from '../Components/Feedback/Feedback';
import { Squares } from 'react-activity';
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
import index from '../Components/API';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../Components/Firebase/firebaseConfig';
import { AiFillDelete } from "react-icons/ai";
import Cookies from 'js-cookie';
import { BiEdit } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function UserProfile() {
  const { userInfo, fetchData } = useUserData();
  const [showFeedback,setShowFeedback] =useState();
  const [editingProductData, setEditingProductData] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { APIcall } = index();
  const [imageURL, setImageURL] = useState('');
  const [PreviewimageLoading, setPreviewImageLoading] = useState(false);
  const storage = getStorage(app);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
  const [pendingFeedbackProucts, setProducts] = useState([]);
  const [pendingFeedbackBakeries, setBakeries] = useState([])
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
  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch address details using reverse geocoding
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=56bf39f3aa1f4abeb883cfad3d27113a`)
            .then(response => response.json())
            .then(data => {
              const { country, city, road, _normalized_city } = data.results[0].components;


              APIcall(`/userAddress/${userInfo.user.id}`, 'POST', {
                country: country || '',
                city: city ? city : _normalized_city || '',
                street: road || '',
                longitude: longitude.toString(),
                latitude: latitude.toString(), default: true
              })
                .then((data) => {
                  if (data.success) {
                    const userString = {
                      ...userInfo.user,
                      address: data.data
                    };

                    const cookieString = Cookies.get('logginUserCreditionals');
                    const cookieAttributes = cookieString ? JSON.parse(cookieString) : {};
                    const expirationDate = cookieAttributes.expires;



                    Cookies.set("logginUserCreditionals", JSON.stringify(userString), {
                      expires: expirationDate,
                      path: '/'
                    });
                    fetchData();


                  }

                  setLoading(false);
                  setModalOpen(false);
                })
                .catch(error => {
                  console.error('Error posting user address:', error);
                  setLoading(false);
                });
            })
            .catch(error => {
              console.error('Error fetching address details:', error);
              setLoading(false);
            });
        },
        (error) => {
          console.error('Error getting current location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };
  const handleCancel = () => {

    setEditingProduct(null);
    setEditingProductData(null)
    setImageURL(null)
  };
  const setAsDefault = (id) => {
    Modal.confirm({
      title: 'Set Default Address',
      content: 'Are you sure you want to set this Address as Default?',
      okText: 'ok',
      cancelText: 'Cancel',
      onOk() {

        APIcall(`/setUserDefaultAddress/${id}`, 'POST')
          .then((data) => {


            if (data.success) {
              const userString = {
                ...userInfo.user,
                address: data.data
              };

              const cookieString = Cookies.get('logginUserCreditionals');
              const cookieAttributes = cookieString ? JSON.parse(cookieString) : {};
              const expirationDate = cookieAttributes.expires;



              Cookies.set("logginUserCreditionals", JSON.stringify(userString), {
                expires: expirationDate,
                path: '/'
              });
              fetchData();


            }

          })
          .catch(error => {
            console.error('Error deleting product:', error);

          });
      },
    });
  }
  useEffect(() => {

    let initialValues;
    if (editingProduct) {

      initialValues = {
        id: editingProduct.id,
        username: editingProduct.username,
        email: editingProduct.email,
        phone: editingProduct.phone,
        profile_url: editingProduct.profile_url
      };
    }

    setEditingProductData(initialValues);
  }, [editingProduct]);
  const handleEdit = (record) => {


    setEditingProduct(record);

  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Address',
      content: 'Are you sure you want to delete this Address?',
      okText: 'ok',
      cancelText: 'Cancel',
      onOk() {

        APIcall(`/userAddress/${id}`, 'DELETE')
          .then((data) => {

            if (data.success) {
              const userString = {
                ...userInfo.user,
                address: data.data
              };

              const cookieString = Cookies.get('logginUserCreditionals');
              const cookieAttributes = cookieString ? JSON.parse(cookieString) : {};
              const expirationDate = cookieAttributes.expires;



              Cookies.set("logginUserCreditionals", JSON.stringify(userString), {
                expires: expirationDate,
                path: '/'
              });
              fetchData();


            }

          })
          .catch(error => {
            console.error('Error deleting product:', error);

          });
      },
    });
  };
  const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
  });
  const handleUpdatePassword = (values, { setSubmitting, resetForm }) => {

    APIcall(`/update-userPassword/${userInfo.user.id}`, 'post', values)
      .then(() => {
        setSubmitting(false);
        resetForm();
        setUpdatePasswordModalVisible(false);
        setEditingProduct(null);
        setImageURL(null)
      })
      .catch(error => {
        console.error('Error updating password:', error);
      });

  };
  const checkPendingFeedback = () => {
    APIcall(`/pending-feedback/${userInfo.user.id}`, 'GET')
      .then((data) => {
        setProducts(data.products);
        setBakeries(data.bakeries);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }
  useEffect(() => {
    checkPendingFeedback()
  }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center pt-10">
        <h2 className="text-base text-[#ff59ac] font-semibold tracking-wide uppercase">Profile</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Welcome, {userInfo.user.username}
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Here you can view and update your profile information.
        </p>
      </div>
      <div className="mt-10 p-5 bg-white rounded-lg shadow">
        <div className="grid gap-5 lg:grid-cols-2 lg:max-w-none">
          <div className="bg-blue-50 hover:shadow-lg transition duration-200 rounded-lg p-5">
            <div className="text-center">
              <div className="h-14 w-14 inline-flex items-center justify-center rounded-full bg-blue-200 text-white">
                <img src={userInfo.user.profile_url} alt="Profile image" className="h-full w-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{userInfo.user.username}</h3>
              <p className="mt-2 text-sm text-gray-500">{userInfo.user.email}</p>
              <p className="mt-2 text-sm text-gray-500">{userInfo.user.phone}</p>
              <p><button onClick={() => handleEdit(userInfo.user)} className="fs-3 text-danger ">
                <BiEdit />
              </button></p>
              <Button className="mt-4 " variant="outline" onClick={() => setUpdatePasswordModalVisible(true)}>
                Change Password
              </Button>
            </div>
          </div>
          <div className="bg-green-50 hover:shadow-lg transition duration-200 rounded-lg p-5">
            <div className="text-center  ">
              {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Address Book</h3> */}
              <div className='max-h-44 min-h-[155px] overflow-y-auto'>
                {userInfo.user.address.map((address, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Address {index + 1}</h3>
                    <p className="mb-2 mt-2 text-sm text-gray-500">
                      {address.street}, {address.city}, {address.country} {address.default ? <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Default</span> : <span class="bg-blue-100 text-white-200 cursor-pointer   text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300" onClick={() => setAsDefault(address.id)}> Set As Default</span>}
                      <span><button onClick={() => handleDelete(address.id)} className="" danger>
                        <AiFillDelete />
                      </button></span>
                    </p>
                  </div>
                ))}
              </div>
              <Button className="mt-4 text-center" variant="outline" onClick={() => setModalOpen(true)}>
                Add Address
              </Button>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-10 lg:text-center">
        <h2 className="text-base text-[#ff59ac] font-semibold tracking-wide uppercase">Feedbacks & Order History</h2>
      </div>
      <div className="mt-10 p-5 bg-white rounded-lg shadow">
        <div className="grid gap-5 lg:grid-cols-2 lg:max-w-none">
          <div className="bg-red-50 hover:shadow-lg transition duration-200 rounded-lg p-5">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pending FeedBack</h3>
              {/* <p className="text-sm text-gray-500">You have 3 items in your cart</p> */}
              {pendingFeedbackBakeries.length > 0 && pendingFeedbackProucts.length > 0 ? (
                <Button className="mt-4" variant="outline" onClick={() => setShowFeedback(true)}>
                  Show Pending Feedbacks
                </Button>
              ) : (
                <p className=" text-gray-500">No Pending Feedbacks!!!... Please make some purchases and then provide the feedback.</p>
              )}

              {showFeedback && <Feedback />}



            </div>
          </div>
          <div className="bg-purple-50 hover:shadow-lg transition duration-200 rounded-lg p-5">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order History</h3>
              <p className="text-sm text-gray-500">You have made 5 orders in total</p>
              <Button className="mt-4" variant="outline">
                View Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Change Password"
        visible={updatePasswordModalVisible}
        onCancel={() => setUpdatePasswordModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          validationSchema={PasswordSchema}
          onSubmit={handleUpdatePassword}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <Input
                  type="password"
                  name="oldPassword"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.oldPassword && touched.oldPassword && <div className="error">{errors.oldPassword}</div>}
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.newPassword && touched.newPassword && <div className="error">{errors.newPassword}</div>}
              </div>
              <div>
                <Button type="primary" className="mt-4" htmlType="submit" loading={isSubmitting}>
                  Update Password
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>

      <Modal
        title="Add Address"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl text-center font-bold">Location</h2>
          <div className="mt-2 mb-4">
            <div className="mt-2 p-4 bg-gray-200 cursor-pointer rounded-lg" onClick={getCurrentLocation}>
              <p className="flex justify-center">{loading ? <Squares /> : "Get Your Current Location"}</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Profile Information"
        open={!!editingProduct}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >

        {editingProductData && (
          <Formik
            initialValues={editingProductData}

            validationSchema={Yup.object({
              username: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),

            })}
            onSubmit={async (values,) => {

              let updatedValues
              if (imageURL != null) {
                const logoURL = await handleImageUpload();
                updatedValues = {
                  ...values,
                  profile_url: logoURL,

                };
              } else {
                updatedValues = {
                  ...values,

                };
              }

              APIcall(`/update-user/${values.id}`, 'POST', updatedValues)
                .then((data) => {
                  if (data.success) {
                    const userString = {
                      ...userInfo.user,
                      username: data.data.username,
                      phone: data.data.phone,
                      profile_url: data.data.profile_url,
                    };


                    const cookieString = Cookies.get('logginUserCreditionals');
                    const cookieAttributes = cookieString ? JSON.parse(cookieString) : {};
                    const expirationDate = cookieAttributes.expires;



                    Cookies.set("logginUserCreditionals", JSON.stringify(userString), {
                      expires: expirationDate,
                      path: '/'
                    });
                    fetchData();


                  }


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

                <div>
                  <label htmlFor="name">User Name</label>
                  <Input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                  {errors.username && touched.username && <div className="error">{errors.username}</div>}
                </div>
                {/* Description field */}
                <div>
                  <label htmlFor="description">Email</label>
                  <Input className='text-gray-500 outline-0' readOnly type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                  {errors.description && touched.description && <div className="error">{errors.description}</div>}
                </div>
                <div>
                  <label htmlFor="description">Phone Number</label>
                  <Input type="text" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                  {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
                </div>



                {imageURL ?
                  <img src={imageURL} alt="Selected Preview" style={{ width: '200px', margin: 'auto' }} /> :
                  <img src={values.profile_url} alt="Selected Preview" style={{ width: '200px', margin: 'auto' }} />
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




                <Button type="primary" htmlType="submit">Save</Button>
              </Form>
            )}
          </Formik>
        )}
      </Modal>

    </div >
  );
}

export default UserProfile;









