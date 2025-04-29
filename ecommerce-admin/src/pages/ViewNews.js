import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNewsById } from "../features/news/newsSlice";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ViewNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsById(id));
  }, [dispatch, id]);

  const newsState = useSelector((state) => state?.news?.newsData);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View News</h3>
        <button
          className="bg-transparent border-0 fs-4 mb-3"
          onClick={goBack}
        >
          <BiArrowBack />
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <h5 className="card-title">Title:</h5>
            <p className="card-text">{newsState?.title}</p>
          </div>
          
          <div className="mb-3">
            <h5 className="card-title">Description:</h5>
            <p className="card-text">{newsState?.description}</p>
          </div>

          <div className="mb-3">
            <h5 className="card-title">Long Description:</h5>
            <p className="card-text">{newsState?.longDescription}</p>
          </div>

          <div className="mb-3">
            <h5 className="card-title">Category:</h5>
            <p className="card-text">{newsState?.category}</p>
          </div>

          <div className="mb-3">
            <h5 className="card-title">Date:</h5>
            <p className="card-text">{newsState?.date}</p>
          </div>

          <div className="mt-3">
            <h5 className="card-title">Images:</h5>
            <div className="d-flex flex-wrap gap-3">
              {newsState?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`News ${index + 1}`}
                  className="img-fluid"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNews; 