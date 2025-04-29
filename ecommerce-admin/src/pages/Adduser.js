import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetState, getAUser, updateAUser } from "../features/auth/authSlice";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().email("Email should be valid").required("Email is Required"),
  password: yup.string().required("Password is Required"),
  role: yup.string().required("Role is Required"),
});

const Adduser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getUserId = location.pathname.split("/")[3];

  const userState = useSelector((state) => state?.auth);
  const { isSuccess, isError, isLoading, createdUser, updatedUser, userName } = userState;

  useEffect(() => {
    if (getUserId !== undefined) {
      dispatch(getAUser(getUserId));
    } else {
      dispatch(resetState());
    }
  }, [getUserId]);

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success("User Added Successfully!");
      navigate("/admin/users");
    }
    if (isSuccess && updatedUser) {
      toast.success("User Updated Successfully!");
      dispatch(resetState());
      navigate("/admin/users");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userName?.getaUser?.name || "",
      email: userName?.getaUser?.email || "",
      password: userName?.getaUser?.password || "",
      role: userName?.getaUser?.role || "Admin",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getUserId !== undefined) {
        const data = { id: getUserId, userData: values };
        dispatch(updateAUser(data));
        formik.resetForm();
        dispatch(resetState());
      } else {
        dispatch(createUser(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getUserId !== undefined ? "Edit" : "Add"} User</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter User Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <CustomInput
            type="email"
            label="Enter User Email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <CustomInput
            type="password"
            label="Enter User Password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="mb-3">
            <select
              name="role"
              onChange={formik.handleChange("role")}
              onBlur={formik.handleBlur("role")}
              value={formik.values.role}
              className="form-control"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getUserId !== undefined ? "Edit" : "Add"} User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adduser; 