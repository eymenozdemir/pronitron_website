import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getRefurbisheds = async () => {
  const response = await axios.get(`${base_url}refurbished/`);
  return response.data;
};

const getRefurbished = async (id) => {
  const response = await axios.get(`${base_url}refurbished/${id}`);
  return response.data;
};

const refurbishedService = {
  getRefurbisheds,
  getRefurbished,
};

export default refurbishedService;
