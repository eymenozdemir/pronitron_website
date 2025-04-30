import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import { delImg, uploadImg, resetImg, getImgs, loadImg } from "../features/upload/uploadSlice";
import { createBanner, resetState, getBanner, updateBanner } from "../features/banner/bannerSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  link: yup.string().required("Link is Required"),
});

const AddBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBannerId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);

  const imgState = useSelector((state) => state?.upload?.images);
  const bannerState = useSelector((state) => state?.banner);
  const { isSuccess, isError, isLoading, createdBanner, updatedBanner, bannerData } = bannerState;

  useEffect(() => {
    if (getBannerId !== undefined) {
      dispatch(getBanner(getBannerId));
    } else {
      dispatch(resetState());
    }
  }, [getBannerId]);

  useEffect(() => {
    if (isSuccess && createdBanner) {
      toast.success("Banner Added Successfully!");
    }
    if (isSuccess && updatedBanner) {
      toast.success("Banner Updated Successfully!");
      dispatch(resetState());
      navigate("/admin/banner");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    //console.log("productphotos", productName?.images);
    dispatch(loadImg(bannerData?.images));
  }, [bannerData]);

  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState]);


  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setImages([...images, info?.file?.response]);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bannerData?.title || "",
      description: bannerData?.description || "",
      link: bannerData?.link || "",
      images: bannerData?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {

      if (getBannerId !== undefined) {
        const data = { id: getBannerId, bannerData: values, bannerImg: imgState };
        dispatch(updateBanner(data));
        formik.resetForm();
        dispatch(resetImg());
        dispatch(resetState());
      } else {
        const data = { bannerData: values, bannerImg: imgState };
        dispatch(createBanner(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetImg());
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Banner</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Banner Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Banner Description"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
              rows="4"
            />
          </div>
          <CustomInput
            type="text"
            label="Enter Banner Link"
            name="link"
            onChng={formik.handleChange("link")}
            onBlr={formik.handleBlur("link")}
            val={formik.values.link}
          />
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click <span style={{background:"#232f3e", color:"white"}}> &nbsp; here&nbsp; </span> &nbsp;to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.length > 0 && imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg({id:i.public_id, images:imgState}))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i?.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBannerId !== undefined ? "Edit" : "Add"} Banner
          </button>
          {formik.touched.title && formik.errors.title ? (
            <div className="error" style={{ color: "red" }}>
              {formik.touched.title && formik.errors.title} !
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBanner; 