import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getNews = async () => {
  const response = await axios.get(`${base_url}news/`);
  return response.data;
};

const getNewsById = async (id) => {
  const response = await axios.get(`${base_url}news/${id}`);
  return response.data;
};

const newsService = {
  getNews,
  getNewsById,
};

export default newsService; 