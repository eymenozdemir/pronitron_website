import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine, RiDashboard2Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaShieldAlt, FaBox, FaBoxes, FaAlgolia } from "react-icons/fa";
import { MdAssignmentAdd, MdPersonAddAlt1 } from "react-icons/md";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import routes from "routes";
const { Header, Sider, Content } = Layout;


/*
<div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

          </div>
*/

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  //const stockState = useSelector((state) => state?.product?.products?.filter((p) => p?.stockTreshold >= (p?.stockAtlanta + p?.toAtlanta) || p?.stockTreshold >= (p?.stockNashville + p?.toNashville) || p?.stockTreshold >= (p?.stockSavannah + p?.toSavannah)));
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : "";
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout  /* onContextMenu={(e) => e.p?reventDefault()} */>
      <Sider trigger={null} style={{ background: "transparent" }} collapsible collapsed={collapsed}>
           <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Pronitron"
              routes={() => routes()}
              //routes={() => routes(stockState)}
      
            />
        {/* <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">SN</span>
            <span className="lg-logo">Stone Nature</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RiDashboard2Line className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Status of P.Orders",
            },
            {
              key: "add-order",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Purchase Order",
            },
            {
              key: "vendors",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Vendors",
            },
            {
              key: "sales",
              icon: <FaClipboardList className="fs-4" />,
              label: "Sales",
            },
            {
              key: "list-customer",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "admin-actions",
              icon: <FaShieldAlt className="fs-4" />,
              label: "Admin Actions",
              children: [
                {
                  key: "list-product",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "product",
                  icon: <MdAssignmentAdd className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "add-user",
                  icon: <MdPersonAddAlt1 className="fs-4" />,
                  label: "Add User ",
                },
                {
                  key: "list-employee",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Employee List",
                },
              ],
            },
            {
              key: "inventory",
              icon: <FaBox className="fs-4" />,
              label: "Inventory",
              children: [
                {
                  key: "savannah",
                  icon: <FaBox className="fs-4" />,
                  label: "Savannah",
                },
                {
                  key: "nashville",
                  icon: <FaBox className="fs-4" />,
                  label: "Nashville",
                },
                {
                  key: "atlanta",
                  icon: <FaBox className="fs-4" />,
                  label: "Atlanta",
                },
              ],
            },
            {
              key: "stock-alert",
              icon: <FaAlgolia className="fs-4" />,
              label: <div className="justify-content-between align-items-center d-flex"> Stock Alert  <span className="bg-danger badge rounded-circle p-2 mb-2" style={{ fontSize: "14px" }}>{stockState.length}</span> </div>,
            },
          ]}
        /> */}
      </Sider>

      {/* <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Stone Nature"
              routes={routes}
      
            /> */}
   
      <Layout className="site-layout ps-3">
        {/* <Header
          className="d-flex justify-content-between ps-5 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
         {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )} 
        </Header> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
