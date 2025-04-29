import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getSolutions = async () => {
  const response = await axios.get(`${base_url}solutions/`);
  return response.data;
};

const createSolution = async (solution) => {
  const response = await axios.post(`${base_url}solutions/`, 
    {
      title: solution.solutionData.title,
      description: solution.solutionData.description,
      longDescription: solution.solutionData.longDescription,
      images: solution.solutionsImg,
    }, config);
  return response.data;
};

const deleteSolution = async (id) => {
  const response = await axios.delete(`${base_url}solutions/${id}`, config);
  return response.data;
};

const getSolutionById = async (id) => {
  const response = await axios.get(`${base_url}solutions/${id}`, config);
  return response.data;
};

const updateSolution = async (solution) => {
  const response = await axios.put(
    `${base_url}solutions/${solution.id}`,
    {
      title: solution.solutionData.title,
      description: solution.solutionData.description,
      longDescription: solution.solutionData.longDescription,
      images: solution.solutionsImg,
    },
    config
  );
  return response.data;
};

const solutionsService = {
  getSolutions,
  createSolution,
  deleteSolution,
  getSolutionById,
  updateSolution,
};

export default solutionsService; 