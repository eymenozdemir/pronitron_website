import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import ViewOrder from "./pages/ViewOrder";
import ViewSale from "./pages/ViewSale";
import Addorder from "./pages/Addorder";
import Addsale from "./pages/Addsale";
import Adduser from "./pages/Adduser";
import Containeroptimization from "./pages/Containeroptimization";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import Savannah from "./pages/Savannah";
import Nashville from "./pages/Nashville";
import Atlanta from "./pages/Atlanta";
import Sales from "./pages/Sales";
import Stockalert from "./pages/Stockalert";
import Vendors from "./pages/Vendors";
import userAgreement from "./pages/userAgreement";
import privacyPolicy from "./pages/privacyPolicy";
import { PrivateRoutes } from "./components/PrivateRoutes";


import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { useState, useEffect, useMemo } from "react";

// react-router components
// import {   useLocation } from "react-router-dom";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  return (

    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
            <Route path="dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
            <Route path="orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
            <Route path="add-order" element={<PrivateRoutes><Addorder /></PrivateRoutes>} />
            <Route path="orders/:id" element={<PrivateRoutes><ViewOrder /></PrivateRoutes>} />
            <Route path="sales/:id" element={<PrivateRoutes><ViewSale /></PrivateRoutes>} />
            <Route path="vendors" element={<PrivateRoutes><Vendors /></PrivateRoutes>} />
            <Route path="sales" element={<PrivateRoutes><Sales /></PrivateRoutes>} />
            <Route path="privacy-policy" element={<privacyPolicy />} />
            <Route path="user-agreement" element={<userAgreement />} />
            <Route path="add-sale" element={<PrivateRoutes><Addsale /></PrivateRoutes>} />
            <Route path="list-customer" element={<PrivateRoutes><Customers /></PrivateRoutes>} />
            <Route path="add-user" element={<PrivateRoutes><Adduser /></PrivateRoutes>} />
            <Route path="add-user/:id" element={<PrivateRoutes><Adduser /></PrivateRoutes>} />
            <Route path="list-employee" element={<PrivateRoutes><Employees /></PrivateRoutes>} />
            <Route path="list-category" element={<PrivateRoutes><Categorylist /></PrivateRoutes>} />
            <Route path="category" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="category/:id" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="stock-alert" element={<PrivateRoutes><Stockalert /></PrivateRoutes>} />
            <Route path="inventory" element={<PrivateRoutes><Inventory /></PrivateRoutes>} />
            <Route path="savannah" element={<PrivateRoutes><Savannah /></PrivateRoutes>} />
            <Route path="nashville" element={<PrivateRoutes><Nashville /></PrivateRoutes>} />
            <Route path="atlanta" element={<PrivateRoutes><Atlanta /></PrivateRoutes>} />
            <Route path="list-product" element={<PrivateRoutes><Productlist /></PrivateRoutes>} />
            <Route path="product" element={<PrivateRoutes><Addproduct /></PrivateRoutes>} />
            <Route path="product/:id" element={<PrivateRoutes><Addproduct /></PrivateRoutes>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}



// function App() {
//   const [controller, dispatch] = useMaterialUIController();
//   const {
//     miniSidenav,
//     direction,
//     layout,
//     openConfigurator,
//     sidenavColor,
//     transparentSidenav,
//     whiteSidenav,
//     darkMode,
//   } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   // const { pathname } = useLocation();

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       // stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   // useEffect(() => {
//   //   document.documentElement.scrollTop = 0;
//   //   document.scrollingElement.scrollTop = 0;
//   // }, [pathname]);

//   const getRoutes = (allRoutes) =>
//     allRoutes.map((route) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }

//       if (route.route) {
//         return <Route exact path={route.route} element={route.component} key={route.key} />;
//       }

//       return null;
//     });

//   const configsButton = (
//     <MDBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.25rem"
//       height="3.25rem"
//       bgColor="white"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="dark"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="small" color="inherit">
//         settings
//       </Icon>
//     </MDBox>
//   );

//   return (
//     <ThemeProvider theme={darkMode ? themeDark : theme}>
//       <CssBaseline />
//       <Router>
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//               color={sidenavColor}
//               brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
//               brandName="Stone Nature"
//               routes={routes}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />
//             {/*<Configurator /> */}
//             {configsButton}
//           </>
//         )}
//         {/* {layout === "vr" && <Configurator />} */}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }


export default App;
