import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBanner } from "../features/banner/bannerSlice";

const ViewBanner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanner(id));
  }, [dispatch, id]);

  const bannerState = useSelector((state) => state?.banner?.bannerData);

  return (
    <div>
      <h3 className="mb-4 title">View Banner</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {bannerState?.title}</h5>
          <p className="card-text">Description: {bannerState?.description}</p>
          <div className="mt-3">
            <h6>Images:</h6>
            {bannerState?.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Banner ${index + 1}`}
                style={{ width: "200px", height: "auto", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBanner; 