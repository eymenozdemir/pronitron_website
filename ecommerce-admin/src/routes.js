/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// import Dashboard from "./pages/Dashboard";
import { RiDashboard2Line } from "react-icons/ri";
import { PrivateRoutes } from "./components/PrivateRoutes"; 

import {
  AiOutlineUser,
} from "react-icons/ai";
import { FaClipboardList, FaBox, FaRegFlag, FaRegNewspaper } from "react-icons/fa";
import { MdOutlineHomeRepairService, MdMenu } from "react-icons/md";
// @mui icons
import Icon from "@mui/material/Icon";


const routes = (stockState) => {

  return [
    {
      type: "collapse",
      key: "",
      route: "",
      icon: <RiDashboard2Line className="fs-4" />,
      name: "Dashboard",
    },
    {
      type: "collapse",
      key: "users",
      route: "users",
      icon: <FaClipboardList className="fs-4" />,
      name: "User List",
    },
    {
      type: "collapse",
      key: "add-user",
      route: "add-user",
      icon: <AiOutlineUser className="fs-4" />,
      name: "Add User",
    },
    {
      type: "collapse",
      key: "products",
      route: "products",
      icon: <FaClipboardList className="fs-4" />,
      name: "Product List",
    },
    {
      type: "collapse",
      key: "add-product",
      route: "add-product",
      icon: <FaBox className="fs-4" />,
      name: "Add Product",
    },
    {
      type: "collapse",
      key: "refurbisheds",
      route: "refurbisheds",
      icon: <FaClipboardList className="fs-4" />,
      name: "Refurbished List",
    },
    {
      type: "collapse",
      key: "add-refurbished",
      route: "add-refurbished",
      icon: <FaBox className="fs-4" />,
      name: "Add Refurbished",
    },
    {
      type: "collapse",
      key: "banner",
      route: "banner",
      icon: <FaClipboardList className="fs-4" />,
      name: "Banner List",
    },
    {
      type: "collapse",
      key: "add-banner",
      route: "add-banner",
      icon: <FaRegFlag className="fs-4" />,
      name: "Add Banner",
    },
    {
      type: "collapse",
      key: "news",
      route: "news",
      icon: <FaClipboardList className="fs-4" />,
      name: "News List",
    },
    {
      type: "collapse",
      key: "add-news",
      route: "add-news",
      icon: <FaRegNewspaper className="fs-4" />,
      name: "Add News",
    },
    {
      type: "collapse",
      key: "solutions",
      route: "solutions",
      icon: <FaClipboardList className="fs-4" />,
      name: "Solutions List",
    },
    {
      type: "collapse",
      key: "add-solutions",
      route: "add-solutions",
      icon: <MdOutlineHomeRepairService className="fs-4" />,
      name: "Add Solutions",
    },
    {
      type: "collapse",
      key: "categories",
      route: "categories",
      icon: <FaClipboardList className="fs-4" />,
      name: "Categories List",
    },
    {
      type: "collapse",
      key: "add-categories",
      route: "add-categories",
      icon: <MdMenu className="fs-4" />,
      name: "Add Categories",
    },
  ];
}

// const routes = [
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     icon: <RiDashboard2Line className="fs-4" />,
//     route: "/admin",
//     component: <PrivateRoutes><Dashboard /></PrivateRoutes>
//   },
//   {
//     type: "collapse",
//     name: "Dashboard2",
//     key: "dashboard2",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/dashboard",
//     component: <Dashboard />,
//   },
//   {
//     type: "collapse",
//     name: "Tables",
//     key: "tables",
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: "/tables",
//     component: <Tables />,
//   },
//   {
//     type: "collapse",
//     name: "Billing",
//     key: "billing",
//     icon: <Icon fontSize="small">receipt_long</Icon>,
//     route: "/billing",
//     component: <Billing />,
//   },
//   {
//     type: "collapse",
//     name: "RTL",
//     key: "rtl",
//     icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//     route: "/rtl",
//     component: <RTL />,
//   },
//   {
//     type: "collapse",
//     name: "Notifications",
//     key: "notifications",
//     icon: <Icon fontSize="small">notifications</Icon>,
//     route: "/notifications",
//     component: <Notifications />,
//   },
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     icon: <Icon fontSize="small">person</Icon>,
//     route: "/profile",
//     component: <Profile />,
//   },
//   {
//     type: "collapse",
//     name: "Sign In",
//     key: "sign-in",
//     icon: <Icon fontSize="small">login</Icon>,
//     route: "/authentication/sign-in",
//     component: <SignIn />,
//   },
//   {
//     type: "collapse",
//     name: "Sign Up",
//     key: "sign-up",
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: "/authentication/sign-up",
//     component: <SignUp />,
//   },
// ];

export default routes;
