import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProductSaleView = async () => {
  const response = await axios.get(`${base_url}product/product-sale-view`);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`,
    {
      title: product.prodData.title,
      itemID: product.prodData.itemID,
      category: product.prodData.category,
      condition: product.prodData.condition,
      availability: product.prodData.availability,
      manufacturer: product.prodData.manufacturer,
      requestQuote: product.prodData.requestQuote,
      shipping: product.prodData.shipping,
      description: product.prodData.description,
      video: product.prodData.video,
      images: product.prodImg,
      downloadables: product.prodData.downloadables,
      systemIncludes: product.prodData.systemIncludes,
      specifications: product.prodData.specifications,
    }, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.prodData.title,
      itemID: product.prodData.itemID,
      category: product.prodData.category,
      condition: product.prodData.condition,
      availability: product.prodData.availability,
      manufacturer: product.prodData.manufacturer,
      requestQuote: product.prodData.requestQuote,
      shipping: product.prodData.shipping,
      description: product.prodData.description,
      video: product.prodData.video,
      images: product.prodImg,
      downloadables: product.prodData.downloadables,
      systemIncludes: product.prodData.systemIncludes,
      specifications: product.prodData.specifications,
    },
    config
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  getProductSaleView,
  updateProduct,
};

export default productService;
