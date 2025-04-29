import React, { useEffect, useState } from "react";
import { BiEdit, BiShow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteAProduct} from "../features/product/productSlice";
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

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [prodId, setProdId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProdId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      itemID: productState[i].itemID,
      category: productState[i].category,
      condition: productState[i].condition,
      availability: productState[i].availability,
      manufacturer: productState[i].manufacturer,
      action: (
        <>
          <Link
            to={`/admin/products/${productState[i]._id}`}
            className="ms-3 fs-4 text-primary"
          >
            <BiShow />
          </Link>
          <Link
            to={`/admin/add-product/${productState[i]._id}`}
            className="ms-3 fs-4 text-info"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products List</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(prodId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
