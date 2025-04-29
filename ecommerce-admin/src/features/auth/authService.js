import axios from 'axios';
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


export const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/admin-login`, userData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const loginQuickbooks = async () => {
  try {
    const response = await axios.post(`${base_url}user/quickbooks-login`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const loginQuickbooksTn = async () => {
  try {
    const response = await axios.post(`${base_url}user/quickbooks-login-tn`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getCompanyInfo = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-company-info`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getCompanyInfoGetto = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-company-info-getter`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getCompanyInfoTn = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-company-info-tn`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getCompanyInfoGettoTn = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-company-info-getter-tn`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await axios.get(`${base_url}user/is-logged-in`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const isLoggedInTn = async () => {
  try {
    const response = await axios.get(`${base_url}user/is-logged-in-tn`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/orders`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getSalesFromDb = async () => {
  try {
    const response = await axios.get(`${base_url}user/sales-db`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getSales = async () => {
  try {
    const response = await axios.get(`${base_url}user/sales`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const createOrder = async (orderDetail) => {
  try {
    const response = await axios.post(`${base_url}user/orders`, orderDetail, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const updateOrder = async (order) => {
  try {
    const response = await axios.put(`${base_url}user/orders/${order.id}`, order, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${base_url}user/orders/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getOrder = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/orders/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${base_url}user/create-user`, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const updateUser = async (user) => {
  try {
      const response = await axios.put(`${base_url}user/${user.id}`, user.userData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${base_url}user/all-users`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${base_url}user/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};



export default {
  login,
  loginQuickbooks,
  loginQuickbooksTn,
  getCompanyInfo,
  getCompanyInfoGetto,
  getCompanyInfoTn,
  getCompanyInfoGettoTn,
  isLoggedIn,
  isLoggedInTn,
  getOrders,
  getSalesFromDb,
  getSales,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser
}; 