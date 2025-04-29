import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Table } from "antd";
import { getAllUsers, deleteUser } from "../features/auth/authSlice";
import CustomModal from "../components/CustomModal";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Userlist = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userState = useSelector((state) => state?.auth?.users);
  const data1 = [];
  for (let i = 0; i < userState?.length; i++) {
    data1.push({
      key: i + 1,
      name: userState[i].name,
      email: userState[i].email,
      role: userState[i].role,
      action: (
        <>
          <Link
            to={`/admin/users/${userState[i]._id}`}
            className="ms-3 fs-4 text-primary"
          >
            <BiShow />
          </Link>
          <Link
            to={`/admin/add-user/${userState[i]._id}`}
            className="ms-3 fs-4 text-info"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(userState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }


  const deleteUserItem = (e) => {
    dispatch(deleteUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Users</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUserItem(userId);
        }}
        title="Are you sure you want to delete this User?"
      />
    </div>
  );
};

export default Userlist; 