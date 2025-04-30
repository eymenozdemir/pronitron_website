import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Table } from "antd";
import { getAllBanners, deleteBanner } from "../features/banner/bannerSlice";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
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
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bannerlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBannerId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  const bannerState = useSelector((state) => state?.banner?.banners);
  const data1 = [];
  for (let i = 0; i < bannerState?.length; i++) {
    data1.push({
      key: i + 1,
      title: bannerState[i]?.title,
      description: bannerState[i]?.description,
      image: bannerState[i]?.images && bannerState[i].images.length > 0 ? (
        <img
          src={bannerState[i].images[0].url}
          alt="banner"
          style={{ width: "100px", height: "auto" }}
        />
      ) : (
        <span>No image available</span>
      ),
      action: (
        <>
          <Link
            to={`/admin/banner/${bannerState[i]?.id}`}
            className="ms-3 fs-4 text-primary"
          >
            <BiShow />
          </Link>
          <Link
            to={`/admin/add-banner/${bannerState[i]?.id}`}
            className="ms-3 fs-4 text-info"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(bannerState[i]?.id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBannerItem = (e) => {
    dispatch(deleteBanner(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllBanners());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Banners</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBannerItem(bannerId);
        }}
        title="Are you sure you want to delete this Banner?"
      />
    </div>
  );
};

export default Bannerlist; 