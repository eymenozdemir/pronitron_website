import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getBanners = async () => {
  const response = await axios.get(`${base_url}banner/`);
  return response.data;
};

const getBanner = async (id) => {
  const response = await axios.get(`${base_url}banner/${id}`);
  return response.data;
};


const bannerService = {
  getBanners,
  getBanner,
};

export default bannerService; 