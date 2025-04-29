import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getNews = async () => {
  const response = await axios.get(`${base_url}news/`);
  return response.data;
};

const createNews = async (news) => {
  const response = await axios.post(`${base_url}news/`, 
    {
      title: news.newsData.title,
      description: news.newsData.description,
      longDescription: news.newsData.longDescription,
      date: news.newsData.date,
      category: news.newsData.category,
      images: news.newsImg,
    },
    config);
  return response.data;
};

const deleteNews = async (id) => {
  const response = await axios.delete(`${base_url}news/${id}`, config);
  return response.data;
};

const getNewsById = async (id) => {
  const response = await axios.get(`${base_url}news/${id}`, config);
  return response.data;
};

const updateNews = async (news) => {
  const response = await axios.put(
    `${base_url}news/${news.id}`,
    {
      title: news.newsData.title,
      description: news.newsData.description,
      longDescription: news.newsData.longDescription,
      date: news.newsData.date,
      category: news.newsData.category,
      images: news.newsImg,
    },
    config
  );
  return response.data;
};

const newsService = {
  getNews,
  createNews,
  deleteNews,
  getNewsById,
  updateNews,
};

export default newsService; 