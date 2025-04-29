import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit, BiShow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { getAllSolutions, deleteSolution } from "../features/solutions/solutionsSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Solutionslist = () => {
  const [open, setOpen] = useState(false);
  const [solutionId, setSolutionId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setSolutionId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSolutions());
  }, [dispatch]);

  const solutionsState = useSelector((state) => state.solutions.solutions);
  const data1 = [];
  for (let i = 0; i < solutionsState.length; i++) {
    data1.push({
      key: i + 1,
      title: solutionsState[i].title,
      description: solutionsState[i].description,
      action: (
        <>
          <Link to={`/admin/solutions/${solutionsState[i]._id}`} className="fs-3 text-primary">
            <BiShow />
          </Link>
          <Link to={`/admin/add-solutions/${solutionsState[i]._id}`} className="ms-3 fs-3 text-success">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(solutionsState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteSolutionItem = (id) => {
    dispatch(deleteSolution(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllSolutions());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Solutions List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteSolutionItem(solutionId);
        }}
        title="Are you sure you want to delete this solution?"
      />
    </div>
  );
};

export default Solutionslist; 