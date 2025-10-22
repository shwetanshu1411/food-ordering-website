import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const registerUser = (data) => api.post("/auth/user/register", data);
export const loginUser = (data) => api.post("/auth/user/login", data);

export const registerFoodPartner = (data) => api.post("/auth/foodpartner/register", data);
export const loginFoodPartner = (data) => api.post("/auth/foodpartner/login", data);

export const getFoodItems = () => api.get("/food");
export const createFood = (formData) => api.post("/food", formData);

export const getFoodPartnerById = (id) => api.get(`/food-partner/${id}`);

export const logoutUser = () => api.get("/auth/user/logout");
export const logoutFoodPartner = () => api.get("/auth/foodpartner/logout");
