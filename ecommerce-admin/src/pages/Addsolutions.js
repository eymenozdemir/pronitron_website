import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createSolutions, resetState, getSolutionById, updateSolution } from "../features/solutions/solutionsSlice";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import { delImg, uploadImg, resetImg, getImgs, loadImg } from "../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  longDescription: yup.string().required("Long Description is Required"),
});

const AddSolutions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getSolutionsId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);

  const imgState = useSelector((state) => state?.upload?.images);
  const solutionsState = useSelector((state) => state?.solutions);
  const { isSuccess, isError, isLoading, createdSolutions, updatedSolutions, solutionData } = solutionsState;

  useEffect(() => {
    if (getSolutionsId !== undefined) {
      dispatch(getSolutionById(getSolutionsId));
    } else {
      dispatch(resetState());
    }
  }, [getSolutionsId]);

  useEffect(() => {
    if (isSuccess && createdSolutions) {
      toast.success("Solution Added Successfully!");
    }
    if (isSuccess && updatedSolutions) {
      toast.success("Solution Updated Successfully!");
      dispatch(resetState());
      navigate("/admin/solutions");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    dispatch(loadImg(solutionData?.images));
  }, [solutionData]);

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
      title: solutionData?.title || "",
      description: solutionData?.description || "",
      longDescription: solutionData?.longDescription || "",
      images: solutionData?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getSolutionsId !== undefined) {
        const data = { id: getSolutionsId, solutionData: values, solutionsImg: imgState };
        dispatch(updateSolution(data));
        formik.resetForm();
        dispatch(resetImg());
        dispatch(resetState());
      } else {
        const data = { solutionData: values, solutionsImg: imgState };
        dispatch(createSolutions(data));
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
      <h3 className="mb-4 title">{getSolutionsId !== undefined ? "Edit" : "Add"} Solution</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Solution Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Solution Description"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
              rows="4"
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Solution Long Description"
              name="longDescription"
              onChange={formik.handleChange("longDescription")}
              onBlur={formik.handleBlur("longDescription")}
              value={formik.values.longDescription}
              rows="6"
            />
          </div>
          
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
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg({id:i.public_id, images:imgState}))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getSolutionsId !== undefined ? "Edit" : "Add"} Solution
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

export default AddSolutions; 