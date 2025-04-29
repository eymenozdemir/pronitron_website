import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getRefurbisheds = async () => {
  const response = await axios.get(`${base_url}refurbished/`);
  return response.data;
};

const createRefurbished = async (refurbished) => {
  const response = await axios.post(`${base_url}refurbished/`,
    {
      title: refurbished.refData.title,
      itemID: refurbished.refData.itemID,
      category: refurbished.refData.category,
      condition: refurbished.refData.condition,
      availability: refurbished.refData.availability,
      manufacturer: refurbished.refData.manufacturer,
      requestQuote: refurbished.refData.requestQuote,
      shipping: refurbished.refData.shipping,
      description: refurbished.refData.description,
      video: refurbished.refData.video,
      images: refurbished.refImg,
      downloadables: refurbished.refDownloadables,
      systemIncludes: refurbished.refData.systemIncludes,
      specifications: refurbished.refData.specifications,
    }, config);
  return response.data;
};

const deleteRefurbished = async (id) => {
  const response = await axios.delete(`${base_url}refurbished/${id}`, config);
  return response.data;
};

const getRefurbished = async (id) => {
  const response = await axios.get(`${base_url}refurbished/${id}`, config);
  return response.data;
};

const updateRefurbished = async (refurbished) => {
  const response = await axios.put(
    `${base_url}refurbished/${refurbished.id}`,
    {
      title: refurbished.refData.title,
      itemID: refurbished.refData.itemID,
      category: refurbished.refData.category,
      condition: refurbished.refData.condition,
      availability: refurbished.refData.availability,
      manufacturer: refurbished.refData.manufacturer,
      requestQuote: refurbished.refData.requestQuote,
      shipping: refurbished.refData.shipping,
      description: refurbished.refData.description,
      video: refurbished.refData.video,
      images: refurbished.refImg,
      downloadables: refurbished.refDownloadables,
      systemIncludes: refurbished.refData.systemIncludes,
      specifications: refurbished.refData.specifications,
    },
    config
  );
  return response.data;
};

const refurbishedService = {
  getRefurbisheds,
  createRefurbished,
  deleteRefurbished,
  getRefurbished,
  updateRefurbished,
};

export default refurbishedService;
