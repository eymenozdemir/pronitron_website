import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSolutionById } from "../features/solutions/solutionsSlice";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ViewSolutions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSolutionById(id));
  }, [dispatch, id]);

  const solutionsState = useSelector((state) => state?.solutions?.solutionData);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3 className="mb-4 title">View Solution</h3>
      <button
          className="bg-transparent border-0 fs-4 mb-3"
          onClick={goBack}
        >
          <BiArrowBack />
        </button>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {solutionsState?.title}</h5>
          <p className="card-text">Description: {solutionsState?.description}</p>
          <p className="card-text">Long Description: {solutionsState?.longDescription}</p>
          <div className="mt-3">
            <h6>Images:</h6>
            {solutionsState?.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Solution ${index + 1}`}
                style={{ width: "200px", height: "auto", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSolutions; 