import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBanners = async () => {
  const response = await axios.get(`${base_url}banner/`);
  return response.data;
};

const createBanner = async (banner) => {
  const response = await axios.post(`${base_url}banner/`,
    {
      title: banner.bannerData.title,
      description: banner.bannerData.description,
      link: banner.bannerData.link,
      images: banner.bannerImg,
    }, config);
  return response.data;
};

const deleteBanner = async (id) => {
  const response = await axios.delete(`${base_url}banner/${id}`, config);
  return response.data;
};

const getBanner = async (id) => {
  const response = await axios.get(`${base_url}banner/${id}`, config);
  return response.data;
};

const updateBanner = async (banner) => {
  const response = await axios.put(
    `${base_url}banner/${banner.id}`,
    {
      title: banner.bannerData.title,
      description: banner.bannerData.description,
      link: banner.bannerData.link,
      images: banner.bannerImg,
    },
    config
  );
  return response.data;
};

const bannerService = {
  getBanners,
  createBanner,
  deleteBanner,
  getBanner,
  updateBanner,
};

export default bannerService; 