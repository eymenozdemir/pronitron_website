import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "../needed/news/newsSlice";
import { BiArrowBack } from "react-icons/bi";
import { useTranslation } from 'react-i18next';

const ViewNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const langSelection = i18n.language === 'en' ? 0 : 1; // 0 for English, 1 for other languages

  useEffect(() => {
    dispatch(getNewsById(id));
  }, [dispatch, id]);

  const newsState = useSelector((state) => state?.news?.newsData);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          

          {/* Main Content */}
          <article className="blog-post">
            {/* Header Image */}
            {newsState?.images?.[0] && (
              <div className="blog-header-image mb-4">
                <img
                  src={newsState.images[0].url}
                  alt={newsState.title.split('[trTranslation]')[langSelection]}
                  className="img-fluid rounded"
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
            )}

            {/* Title and Meta */}
            <div className="blog-meta mb-2">
              <span className="badge bg-primary me-2">{newsState?.category.split('[trTranslation]')[langSelection]}</span>
            </div>
            <div className="blog-meta mb-4">
              <span className="text-muted">{newsState?.date}</span>
            </div>

            <h1 className="blog-title mb-4">{newsState?.title.split('[trTranslation]')[langSelection]}</h1>

            {/* Description */}
            <div className="blog-description mb-5">
              <p className="lead">{newsState?.description.split('[trTranslation]')[langSelection]}</p>
            </div>

            {/* Long Description */}
            <div className="blog-content mb-5">
              <div className="content-body">
                {newsState?.longDescription.split('[trTranslation]')[langSelection]}
              </div>
            </div>

            {/* Additional Images */}
            {newsState?.images?.length > 1 && (
              <div className="blog-gallery mb-5">
                <h4 className="mb-4">Gallery</h4>
                <div className="row g-3 justify-content-center">
                  {newsState.images.slice(1).map((image, index) => (
                    <div key={index} className="col-md-4">
                      <img
                        src={image.url}
                        alt={`News ${index + 2}`}
                        className="img-fluid rounded"
                        style={{ width: "100%", height: "200px", objectFit: "contain" }}
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

export default ViewNews; 