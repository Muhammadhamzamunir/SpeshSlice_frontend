import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import BakeryDetails from "../Components/BakeryDetailsAndEdits";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const orderState = [
    // Mock data to be replaced with actual data fetched from backend
    {
      key: 1,
      name: "John Doe",
      product: (
        <Link to="/admin/order/123">
          View Orders
        </Link>
      ),
      amount: 100,
      date: "2024-03-24T10:30:00",
    },
    {
      key: 2,
      name: "Jane Smith",
      product: (
        <Link to="/admin/order/456">
          View Orders
        </Link>
      ),
      amount: 150,
      date: "2024-03-25T11:45:00",
    },
  ];

  const data = orderState.map((order, index) => ({
    ...order,
    action: (
      <>
        <Link to="/" className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-3 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
