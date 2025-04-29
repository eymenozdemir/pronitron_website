import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAUser } from "../features/auth/authSlice";
const ViewUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAUser(id));
  }, [dispatch, id]);

  const userState = useSelector((state) => state?.auth?.userName?.getaUser);
  //console.log("userState", userState);

  return (
    <div>
      <h3 className="mb-4 title">View User</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Name: {userState?.name}
          </h5>
          <p className="card-text">Email: {userState?.email}</p>
          <p className="card-text">Role: {userState?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser; 