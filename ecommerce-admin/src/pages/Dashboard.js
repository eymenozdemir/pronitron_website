import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { getOrders } from "../features/auth/authSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getAllNews } from "../features/news/newsSlice";
import { getAllSolutions } from "../features/solutions/solutionsSlice";
import { getAllBanners } from "../features/banner/bannerSlice";

// Material UI Components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import logo from "assets/images/pronitron_logo.png";

// Icons
import { FaBox, FaNewspaper, FaLightbulb, FaShoppingCart, FaImages } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

// Cards
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getProducts()),
        dispatch(getOrders()),
        dispatch(getCategories()),
        dispatch(getAllNews()),
        dispatch(getAllSolutions()),
        dispatch(getAllBanners())
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Get data from Redux store
  const products = useSelector((state) => state.product?.products) || [];
  const orders = useSelector((state) => state.auth?.orders) || [];
  const categories = useSelector((state) => state.pCategory?.pCategories) || [];
  const news = useSelector((state) => state.news?.news) || [];
  const solutions = useSelector((state) => state.solutions?.solutions) || [];
  const banners = useSelector((state) => state.banner?.banners) || [];

  // Calculate statistics
  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalNews = news?.length || 0;
  const totalSolutions = solutions?.length || 0;
  const totalBanners = banners?.length || 0;

  // Prepare product table data
  const productData = Array.isArray(products) ? products.map((product) => ({
    title: product?.title || '',
    itemID: product?.itemID || '',
    category: product?.category || '',
    condition: product?.condition || '',
    availability: product?.availability || '',
    manufacturer: product?.manufacturer || '',
    requestQuote: product?.requestQuote || '',
    shipping: product?.shipping || '',
    description: product?.description || '',
    video: product?.video || ''
  })) : [];

  // Prepare banner table data
  const bannerData = Array.isArray(banners) ? banners.map((banner) => ({
    title: banner?.title || '',
    description: banner?.description || '',
    category: banner?.category || '',
    date: banner?.date || ''
  })) : [];

  // Prepare news table data
  const newsData = Array.isArray(news) ? news.map((item) => ({
    title: item?.title || '',
    description: item?.description || '',
    longDescription: item?.longDescription || '',
    category: item?.category || '',
    date: item?.date || ''
  })) : [];

  // Prepare product table columns
  const productColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "Item ID", accessor: "itemID" },
    { Header: "Category", accessor: "category" },
    { Header: "Condition", accessor: "condition" },
    { Header: "Availability", accessor: "availability" },
    { Header: "Manufacturer", accessor: "manufacturer" },
    { Header: "Request Quote", accessor: "requestQuote" },
    { Header: "Shipping", accessor: "shipping" },
    { Header: "Description", accessor: "description" },
    { Header: "Video", accessor: "video" }
  ];

  // Prepare banner table columns
  const bannerColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "Description", accessor: "description" },
    { Header: "Category", accessor: "category" },
    { Header: "Date", accessor: "date" }
  ];

  // Prepare news table columns
  const newsColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "Description", accessor: "description" },
    { Header: "Long Description", accessor: "longDescription" },
    { Header: "Category", accessor: "category" },
    { Header: "Date", accessor: "date" }
  ];

  if (isLoading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <MDTypography variant="h4">Loading...</MDTypography>
      </MDBox>
    );
  }

  return (
          <MDBox py={3}>
      {/* Logo Section */}
      <MDBox mb={4} display="flex" justifyContent="center">
        <img src={logo} style={{ marginBottom: "2rem" }} alt="Logo" width="320px" />
      </MDBox>

            <Grid container spacing={3}>
        {/* Statistics Cards */}
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
              icon={<FaBox />}
              title="Total Products"
              count={totalProducts}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
              icon={<FaImages />}
              title="Total Banners"
              count={totalBanners}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
              icon={<BiCategory />}
              title="Categories"
              count={totalCategories}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
              icon={<FaNewspaper />}
              title="News & Solutions"
              count={totalNews + totalSolutions}
                    />
                  </MDBox>
                </Grid>

        {/* Products Table */}
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
              py={3}
            px={2}
            variant="gradient"
              bgColor="dark"
            borderRadius="lg"
              coloredShadow="dark"
          >
            <MDTypography variant="h6" color="white">
                Products
            </MDTypography>
          </MDBox>
            <MDBox pt={4}>
            <DataTable
                table={{ columns: productColumns, rows: productData }}
                isSorted={false}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
      </Grid>

        {/* Banners Table */}
      <Grid item xs={12}>
          <MDBox mt={4}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
                py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
                  Banners
            </MDTypography>
          </MDBox>
              <MDBox pt={4}>
            <DataTable
                  table={{ columns: bannerColumns, rows: bannerData }}
                  isSorted={false}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
          </MDBox>
      </Grid>

        {/* News Table */}
      <Grid item xs={12}>
          <MDBox mt={4}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
                py={3}
            px={2}
            variant="gradient"
                bgColor="success"
            borderRadius="lg"
                coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
                  News
            </MDTypography>
          </MDBox>
              <MDBox pt={4}>
            <DataTable
                  table={{ columns: newsColumns, rows: newsData }}
                  isSorted={false}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Dashboard;
