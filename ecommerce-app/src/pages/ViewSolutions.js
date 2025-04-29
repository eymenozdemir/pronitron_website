import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSolutionById } from "../needed/solutions/solutionsSlice";
import { useTranslation } from 'react-i18next';

const ViewSolutions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const langSelection = i18n.language === 'en' ? 0 : 1; // 0 for English, 1 for other languages


  useEffect(() => {
    dispatch(getSolutionById(id));
  }, [dispatch, id]);

  const solutionsState = useSelector((state) => state?.solutions?.solutionData);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          {/* Main Content */}
          <article className="solution-post">
            {/* Header Image */}
            {solutionsState?.images?.[0] && (
              <div className="solution-header-image mb-4">
                <img
                  src={solutionsState.images[0].url}
                  alt={solutionsState.title.split('[trTranslation]')[langSelection]}
                  className="img-fluid rounded"
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
            )}

            {/* Title */}
            <h1 className="solution-title mb-4">{solutionsState?.title.split('[trTranslation]')[langSelection]}</h1>

            {/* Description */}
            <div className="solution-description mb-5">
              <p className="lead">{solutionsState?.description.split('[trTranslation]')[langSelection]}</p>
            </div>

            {/* Long Description */}
            <div className="solution-content mb-5">
              <div className="content-body">
                {solutionsState?.longDescription.split('[trTranslation]')[langSelection]}
              </div>
            </div>

            {/* Additional Images */}
            {solutionsState?.images?.length > 1 && (
              <div className="solution-gallery mb-5">
                <h4 className="mb-4">Gallery</h4>
                <div className="row g-3 justify-content-center">
                  {solutionsState.images.slice(1).map((image, index) => (
                    <div key={index} className="col-md-4">
                      <img
                        src={image.url}
                        alt={`Solution ${index + 2}`}
                        className="img-fluid rounded"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default ViewSolutions; 