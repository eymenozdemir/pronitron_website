import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getSolutions = async () => {
  const response = await axios.get(`${base_url}solutions/`);
  return response.data;
};

const getSolutionById = async (id) => {
  const response = await axios.get(`${base_url}solutions/${id}`);
  return response.data;
};

const solutionsService = {
  getSolutions,
  getSolutionById,
};

export default solutionsService; 