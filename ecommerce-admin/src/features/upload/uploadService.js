import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/images`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );
  return response.data;
};

const uploadDownloadables = async (formData) => {
  try {
    console.log('Sending FormData to server:', formData);
    
    const response = await axios.post(
      `${base_url}upload/downloadables`, 
      formData,
      {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Upload progress:', percentCompleted);
        },
      }
    );
    
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload service error:', error);
    throw error;
  }
};

const deleteDownloadables = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-downloadables/${id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
  uploadDownloadables,
  deleteDownloadables,
};

export default uploadService;
