import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Productlist from "./pages/Productlist";
import Addcat from "./pages/Addcat";
import Addproduct from "./pages/Addproduct";
import Adduser from "./pages/Adduser";
import { PrivateRoutes } from "./components/PrivateRoutes";

// Import new components
import Userlist from "./pages/Userlist";
import ViewUser from "./pages/ViewUser";
import Bannerlist from "./pages/Bannerlist";
import Addbanner from "./pages/Addbanner";
import ViewBanner from "./pages/ViewBanner";
import Newslist from "./pages/Newslist";
import Addnews from "./pages/Addnews";
import ViewNews from "./pages/ViewNews";
import Solutionslist from "./pages/Solutionslist";
import Addsolutions from "./pages/Addsolutions";
import ViewSolutions from "./pages/ViewSolutions";
import ViewProduct from "./pages/ViewProduct";
import ViewRefurbished from "./pages/ViewRefurbished";
import Refurbishedlist from "./pages/Refurbishedlist";
import Addrefurbished from "./pages/Addrefurbished"; 

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
            <Route path="privacy-policy" element={<privacyPolicy />} />
            <Route path="user-agreement" element={<userAgreement />} />
            <Route path="list-customer" element={<PrivateRoutes><Customers /></PrivateRoutes>} />
            <Route path="add-user" element={<PrivateRoutes><Adduser /></PrivateRoutes>} />
            <Route path="add-user/:id" element={<PrivateRoutes><Adduser /></PrivateRoutes>} />
            <Route path="list-category" element={<PrivateRoutes><Categorylist /></PrivateRoutes>} />
            <Route path="category" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="category/:id" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="products" element={<PrivateRoutes><Productlist /></PrivateRoutes>} />
            <Route path="add-product" element={<PrivateRoutes><Addproduct /></PrivateRoutes>} />
            <Route path="add-product/:id" element={<PrivateRoutes><Addproduct /></PrivateRoutes>} />
            <Route path="products/:id" element={<PrivateRoutes><ViewProduct /></PrivateRoutes>} />
            {/* New Routes */}
            <Route path="users" element={<PrivateRoutes><Userlist /></PrivateRoutes>} />
            <Route path="users/:id" element={<PrivateRoutes><ViewUser /></PrivateRoutes>} />
            <Route path="banner" element={<PrivateRoutes><Bannerlist /></PrivateRoutes>} />
            <Route path="add-banner" element={<PrivateRoutes><Addbanner /></PrivateRoutes>} />
            <Route path="add-banner/:id" element={<PrivateRoutes><Addbanner /></PrivateRoutes>} />
            <Route path="banner/:id" element={<PrivateRoutes><ViewBanner /></PrivateRoutes>} />
            <Route path="news" element={<PrivateRoutes><Newslist /></PrivateRoutes>} />
            <Route path="add-news" element={<PrivateRoutes><Addnews /></PrivateRoutes>} />
            <Route path="add-news/:id" element={<PrivateRoutes><Addnews /></PrivateRoutes>} />
            <Route path="news/:id" element={<PrivateRoutes><ViewNews /></PrivateRoutes>} />
            <Route path="solutions" element={<PrivateRoutes><Solutionslist /></PrivateRoutes>} />
            <Route path="add-solutions" element={<PrivateRoutes><Addsolutions /></PrivateRoutes>} />
            <Route path="add-solutions/:id" element={<PrivateRoutes><Addsolutions /></PrivateRoutes>} />
            <Route path="solutions/:id" element={<PrivateRoutes><ViewSolutions /></PrivateRoutes>} />
            <Route path="categories" element={<PrivateRoutes><Categorylist /></PrivateRoutes>} />
            <Route path="add-categories" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="add-categories/:id" element={<PrivateRoutes><Addcat /></PrivateRoutes>} />
            <Route path="refurbisheds" element={<PrivateRoutes><Refurbishedlist /></PrivateRoutes>} />
            <Route path="add-refurbished" element={<PrivateRoutes><Addrefurbished /></PrivateRoutes>} />
            <Route path="add-refurbished/:id" element={<PrivateRoutes><Addrefurbished /></PrivateRoutes>} />
            <Route path="refurbished/:id" element={<PrivateRoutes><ViewRefurbished /></PrivateRoutes>} />
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
