import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Attach token from localStorage (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// User authentication
export const registerUser = (data) => api.post("/auth/user/register", data);
export const loginUser = (data) => api.post("/auth/user/login", data);
export const logoutUser = () => api.get("/auth/user/logout");

// Food partner authentication
export const registerFoodPartner = (data) => api.post("/auth/foodpartner/register", data);
export const loginFoodPartner = (data) => api.post("/auth/foodpartner/login", data);
export const logoutFoodPartner = () => api.get("/auth/foodpartner/logout");

// Food endpoints
export const uploadFood = (data) => api.post("/food", data);
export const getFoodItems = () => api.get("/food");
export const createFood = (formData) => api.post("/food", formData);

export const getFoodPartnerById = (id) => api.get(`/food-partner/${id}`);
export const getPartnerFoods = (partnerId) => api.get(`/food/partner/${partnerId}`);

