import React, { useEffect, useState } from "react";
import { Table, Spin, Modal, Select } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUserData } from "../Components/UserAuthentication(ContextApi)";
import index from "../Components/API";

const { Option } = Select;

const Orders = () => {
  const { userInfo } = useUserData();
  const bakery_id = userInfo.user.bakery.id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");

  const { APIcall } = index();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    APIcall(`/getBakeryOrder/${bakery_id}`, 'GET')
      .then((data) => {
        setOrders(data);
      })
      .finally(() => setLoading(false));
  };

  const handleStatusUpdate = () => {
    if (!selectedOrder || !selectedOrderStatus) return;

    const data = {
      status: selectedOrderStatus,
    };

    APIcall(`/orders/${selectedOrder.key}/update-status`, 'POST', data)
      .then((response) => {
        console.log("Status updated successfully");
        fetchOrders();
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
    setSelectedOrderStatus(order.status); 
  };

  const orderState = orders.map((order) => ({
    key: order.id,
    orderId: order.orderId,
    productName: order.product.name,
    productImage: (
      <img
        src={order.product.image_url}
        alt={order.product.name}
        style={{ maxWidth: 100, maxHeight: 100, objectFit: "cover" }}
      />
    ),
    amount: parseFloat(order.total_amount).toFixed(2),
    unitPrice: parseFloat(order.unit_price).toFixed(2),
    quantity: order.quantity,
    selectedAddress: order.selected_address,
    userPhone: order.user_phone,
    method: order.method,
    transactionId: order.transaction_id,
    status: order.status,
    createdAt: new Date(order.created_at).toLocaleString(),
  }));

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (text, record) => <div style={{ textAlign: "center" }}>{record.productImage}</div>,
      width: 120,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 100,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Selected Address",
      dataIndex: "selectedAddress",
      key: "selectedAddress",
      ellipsis: true,
      width: 200,
    },
    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
      width: 150,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      width: 100,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <p to="/" className="fs-3 text-danger" onClick={() => handleEdit(record)}>
          <BiEdit />
        </p>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={orderState}
          scroll={{ x: "max-content" }}
          bordered
        />
      </Spin>
      <Modal
        title="Update Order Status"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleStatusUpdate}
      >
        <p>Select status:</p>
        <Select
          defaultValue={selectedOrderStatus}
          style={{ width: 200 }}
          onChange={(value) => setSelectedOrderStatus(value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="Baking">Baking</Option>
          <Option value="completed">Completed</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Orders;
