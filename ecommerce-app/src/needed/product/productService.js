import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProductSaleView = async () => {
  const response = await axios.get(`${base_url}product/product-sale-view`);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
  getProductSaleView,
};

export default productService;
