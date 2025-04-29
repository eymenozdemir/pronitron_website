import React, { useEffect, useState } from "react";
import { BiEdit, BiShow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getRefurbisheds, deleteARefurbished} from "../features/refurbished/refurbishedSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";

const columns = [
  {
    Header: "SNo",
    accessor: "key",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Item ID",
    accessor: "itemID",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Condition",
    accessor: "condition",
  },
  {
    Header: "Availability",
    accessor: "availability",
  },
  {
    Header: "Manufacturer",
    accessor: "manufacturer",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Refurbishedlist = () => {
  const [open, setOpen] = useState(false);
  const [refId, setRefId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setRefId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRefurbisheds());
  }, []);
  const refurbishedState = useSelector((state) => state.refurbished.refurbisheds);
  const data1 = [];
  for (let i = 0; i < refurbishedState.length; i++) {
    data1.push({
      key: i + 1,
      title: refurbishedState[i].title,
      itemID: refurbishedState[i].itemID,
      category: refurbishedState[i].category,
      condition: refurbishedState[i].condition,
      availability: refurbishedState[i].availability,
      manufacturer: refurbishedState[i].manufacturer,
      action: (
        <>
          <Link
            to={`/admin/refurbished/${refurbishedState[i]._id}`}
            className="ms-3 fs-4 text-primary"
          >
            <BiShow />
          </Link>
          <Link
            to={`/admin/add-refurbished/${refurbishedState[i]._id}`}
            className="ms-3 fs-4 text-info"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(refurbishedState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteRefurbished = (e) => {
    dispatch(deleteARefurbished(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getRefurbisheds());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Refurbished List</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteRefurbished(refId);
        }}
        title="Are you sure you want to delete this Refurbished?"
      />
    </div>
  );
};

export default Refurbishedlist;
