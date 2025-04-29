import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews, deleteNews } from "../features/news/newsSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "../components/CustomTable";

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
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Newslist = () => {
  const [open, setOpen] = useState(false);
  const [newsId, setNewsId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setNewsId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  const newsState = useSelector((state) => state?.news?.news);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < newsState?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
      key: tempIdx,
      id: newsState[i]._id,
      title: newsState[i].title,
      category: newsState[i].category,
      date: newsState[i].date,
      action: (
        <>
          <Link
            to={`/admin/news/${newsState[i]._id}`}
            className="ms-3 fs-4 text-primary"
          >
            <BiShow />
          </Link>
          <Link
            to={`/admin/add-news/${newsState[i]._id}`}
            className="ms-3 fs-4 text-info"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(newsState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteNewsItem = (e) => {
    dispatch(deleteNews(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllNews());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">News List</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteNewsItem(newsId);
        }}
        title="Are you sure you want to delete this News?"
      />
    </div>
  );
};

export default Newslist; 