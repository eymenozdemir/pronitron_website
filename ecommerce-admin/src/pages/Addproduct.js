import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createProducts, resetState, getAProduct, updateAProduct } from "../features/product/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import { delImg, uploadImg, resetImg, getImgs, loadImg, loadDownloadables, delDownloadables, uploadDownloadables} from "../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  itemID: yup.string().required("Item ID is Required"),
  category: yup.string().required("Category is Required"),
  condition: yup.string(),
  availability: yup.string(),
  manufacturer: yup.string(),
  requestQuote: yup.string(),
  shipping: yup.string(),
  description: yup.string(),
  video: yup.string(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  const [downloadables, setDownloadables] = useState([]);
  const [systemIncludes, setSystemIncludes] = useState([{ description: "" }]);
  const [specifications, setSpecifications] = useState([{ title: "", description: "" }]);

  const imgState = useSelector((state) => state?.upload?.images);
  const downloadableState = useSelector((state) => state?.upload?.downloadables);
  const productState = useSelector((state) => state?.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  const { isSuccess, isError, isLoading, createdProduct, updatedProduct, productName } = productState;

  const [formValues, setFormValues] = useState({
    title: "",
    itemID: "",
    category: "",
    condition: "",
    availability: "",
    manufacturer: "",
    requestQuote: "",
    shipping: "",
    description: "",
    video: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    if (getProdId !== undefined) {
      dispatch(getAProduct(getProdId));
    } else {
      dispatch(resetState());
    }
  }, [getProdId]);

  useEffect(() => {
    if (productName) {
      setFormValues({
        title: productName.title || "",
        itemID: productName.itemID || "",
        category: productName.category || "",
        condition: productName.condition || "",
        availability: productName.availability || "",
        manufacturer: productName.manufacturer || "",
        requestQuote: productName.requestQuote || "",
        shipping: productName.shipping || "",
        description: productName.description || "",
        video: productName.video || "",
      });

      // Set systemIncludes from product data
      if (productName.systemIncludes && productName.systemIncludes.length > 0) {
        setSystemIncludes(productName.systemIncludes);
      } else {
        setSystemIncludes([{ description: "" }]);
      }

      // Set specifications from product data
      if (productName.specifications && productName.specifications.length > 0) {
        setSpecifications(productName.specifications);
      } else {
        setSpecifications([{ title: "", description: "" }]);
      }
    }
  }, [productName]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
      navigate("/admin/products");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");
      dispatch(resetState());
      navigate("/admin/products");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    dispatch(loadImg(productName?.images));
    dispatch(loadDownloadables(productName?.downloadables));
  }, [productName]);

  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState]);

  useEffect(() => {
    formik.values.downloadables = downloadableState;
  }, [downloadableState]);

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setImages([...images, info?.file?.response]);
    }
  };

  const addSystemInclude = () => {
    setSystemIncludes([...systemIncludes, { description: "" }]);
  };

  const removeSystemInclude = (index) => {
    const newSystemIncludes = [...systemIncludes];
    newSystemIncludes.splice(index, 1);
    setSystemIncludes(newSystemIncludes);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { title: "", description: "" }]);
  };

  const removeSpecification = (index) => {
    const newSpecifications = [...specifications];
    newSpecifications.splice(index, 1);
    setSpecifications(newSpecifications);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onDrop = async (acceptedFiles) => {
    try {
      console.log('Files received:', acceptedFiles);
      
      // Filter files by type
      const validFiles = acceptedFiles.filter(file => {
        const fileType = file.type;
        console.log('File type:', fileType);
        return (
          fileType === 'application/pdf' ||
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'image/png' ||
          fileType === 'image/jpeg' ||
          fileType === 'image/jpg'
        );
      });

      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Some files were rejected. Please only upload PDF, DOCX, or image files.");
        return;
      }

      console.log('Valid files:', validFiles);

      // Create FormData
      const formData = new FormData();
      validFiles.forEach(file => {
        formData.append('downloadables', file);
      });

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Dispatch the upload action
      const result = await dispatch(uploadDownloadables(validFiles));
      console.log('Upload result:', result);
      
      if (result.error) {
        toast.error("Upload failed. Please try again.");
      } else {
        toast.success("Files uploaded successfully!");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Upload failed. Please try again.");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        prodData: {
          ...values,
          systemIncludes: systemIncludes,
          specifications: specifications,
        },
        prodImg: imgState,
        prodDownloadables: downloadableState,
      };

      if (getProdId !== undefined) {
        dispatch(updateAProduct({ id: getProdId, ...data }));
      } else {
        dispatch(createProducts(data));
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/products");
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getProdId !== undefined ? "Edit" : "Add"} Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={handleInputChange}
            val={formValues.title}
          />
          <CustomInput
            type="text"
            label="Enter Item ID"
            name="itemID"
            onChng={handleInputChange}
            val={formValues.itemID}
          />
          <div className="mb-3">
            <select
              name="category"
              onChange={handleInputChange}
              value={formValues.category}
              className="form-control py-3"
            >
              <option value="">Select Category</option>
              {categoryState && Array.isArray(categoryState) && categoryState?.map((category, index) => (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <CustomInput
            type="text"
            label="Enter Condition"
            name="condition"
            onChng={handleInputChange}
            val={formValues.condition}
          />
          <CustomInput
            type="text"
            label="Enter Availability"
            name="availability"
            onChng={handleInputChange}
            val={formValues.availability}
          />
          <CustomInput
            type="text"
            label="Enter Manufacturer"
            name="manufacturer"
            onChng={handleInputChange}
            val={formValues.manufacturer}
          />
          <CustomInput
            type="text"
            label="Enter Request Quote"
            name="requestQuote"
            onChng={handleInputChange}
            val={formValues.requestQuote}
          />
          <CustomInput
            type="text"
            label="Enter Shipping Details"
            name="shipping"
            onChng={handleInputChange}
            val={formValues.shipping}
          />
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Product Description"
              name="description"
              onChange={handleInputChange}
              value={formValues.description}
              rows="4"
            />
          </div>
          <CustomInput
            type="text"
            label="Enter Product Video URL"
            name="video"
            onChng={handleInputChange}
            val={formValues.video}
          />
          
          <div className="mb-3">
            <h5>System Includes</h5>
            {systemIncludes.map((include, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter System Include"
                  value={include.description}
                  onChange={(e) => {
                    const newSystemIncludes = [...systemIncludes];
                    newSystemIncludes[index].description = e.target.value;
                    setSystemIncludes(newSystemIncludes);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeSystemInclude(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={addSystemInclude}
            >
              Add System Include
            </button>
          </div>

          <div className="mb-3">
            <h5>Specifications</h5>
            {specifications.map((spec, index) => (
              <div key={index} className="d-flex flex-column gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Specification Title"
                  value={spec.title}
                  onChange={(e) => {
                    const newSpecifications = [...specifications];
                    newSpecifications[index].title = e.target.value;
                    setSpecifications(newSpecifications);
                  }}
                />
                <textarea
                  className="form-control"
                  placeholder="Enter Specification Description"
                  value={spec.description}
                  onChange={(e) => {
                    const newSpecifications = [...specifications];
                    newSpecifications[index].description = e.target.value;
                    setSpecifications(newSpecifications);
                  }}
                  rows="2"
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeSpecification(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={addSpecification}
            >
              Add Specification
            </button>
          </div>

          <h5>Product Images</h5>
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

          <h5>Downloadables</h5>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={onDrop}
              accept={{
                'application/pdf': ['.pdf'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'image/*': ['.png', '.jpg', '.jpeg']
              }}
              maxSize={10485760} // 10MB
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <section>
                  <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop files here, or click <span style={{background:"#232f3e", color:"white"}}> &nbsp; here&nbsp; </span> &nbsp;to select files
                    </p>
                    <p className="text-muted small">
                      Supported formats: PDF, DOCX, PNG, JPG (Max size: 10MB)
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {downloadableState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <p>{i.url}</p>
                  <button
                    type="button"
                    onClick={() => dispatch(delDownloadables({id:i.public_id, downloadables:downloadableState}))}
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
            {getProdId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
