import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`);

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  getProductCategory,
};

export default pCategoryService;
