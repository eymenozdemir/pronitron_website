import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getARefurbished } from "../features/refurbished/refurbishedSlice";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ViewRefurbished = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getARefurbished(id));
  }, [dispatch, id]);

  const refurbishedState = useSelector((state) => state?.refurbished?.refurbishedName);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3 className="mb-4 title">View Refurbished</h3>
      <button
        className="bg-transparent border-0 fs-4 mb-3"
        onClick={goBack}
      >
        <BiArrowBack />
      </button>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title mb-3">Refurbished Details</h5>
              <p className="card-text"><strong>Title:</strong> {refurbishedState?.title}</p>
              <p className="card-text"><strong>Item ID:</strong> {refurbishedState?.itemID}</p>
              <p className="card-text"><strong>Category:</strong> {refurbishedState?.category}</p>
              <p className="card-text"><strong>Condition:</strong> {refurbishedState?.condition}</p>
              <p className="card-text"><strong>Availability:</strong> {refurbishedState?.availability}</p>
              <p className="card-text"><strong>Manufacturer:</strong> {refurbishedState?.manufacturer}</p>
              <p className="card-text"><strong>Request Quote:</strong> {refurbishedState?.requestQuote}</p>
              <p className="card-text"><strong>Shipping:</strong> {refurbishedState?.shipping}</p>
              <p className="card-text"><strong>Description:</strong> {refurbishedState?.description}</p>
            </div>
            
            <div className="col-md-6">
              <div className="mt-3">
                <h5 className="mb-3">Images</h5>
                <div className="d-flex flex-wrap gap-3">
                  {refurbishedState?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Refurbished ${index + 1}`}
                      style={{ width: "200px", height: "auto" }}
                      className="img-thumbnail"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h5 className="mb-3">System Includes</h5>
              <ul className="list-group">
                {refurbishedState?.systemIncludes?.map((include, index) => (
                  <li key={index} className="list-group-item">
                    {include.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <h5 className="mb-3">Specifications</h5>
              <div className="list-group">
                {refurbishedState?.specifications?.map((spec, index) => (
                  <div key={index} className="list-group-item">
                    <h6 className="mb-2">{spec.title}</h6>
                    <p className="mb-0">{spec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRefurbished; 