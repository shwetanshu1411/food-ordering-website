import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ------------------- USER APIs -------------------
export const registerUser = (data) => api.post("/auth/user/register", data);
export const loginUser = (data) => api.post("/auth/user/login", data);
export const logoutUser = () => api.get("/auth/user/logout");

// ------------------- FOOD PARTNER APIs -------------------
export const registerFoodPartner = (data) =>
  api.post("/auth/foodpartner/register", data);

export const loginFoodPartner = (data) =>
  api.post("/auth/foodpartner/login", data);

export const logoutFoodPartner = () => api.get("/auth/foodpartner/logout");

// ------------------- FOOD APIs -------------------
export const getFoodItems = () => api.get("/food");

// Get foods uploaded by a specific partner
export const getPartnerFoods = (partnerId) =>
  api.get(`/food/partner/${partnerId}`);

// Upload food (partner) using FormData
export const createFood = async (data) => {
  // If using ImageKit URL, send JSON
  if (data.imageUrl) {
    return api.post("/food/create", {
      name: data.name,
      price: data.price,
      description: data.description || "",
      imageUrl: data.imageUrl,
      foodPartnerId: data.foodPartnerId,
    });
  }

  // If uploading directly via file
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("price", data.price);
  formData.append("foodPartnerId", data.foodPartnerId);
  if (data.file) {
    formData.append("image", data.file);
  }

  return api.post("/food", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteFood = (id) => api.delete(`/food/${id}`);




// ------------------- FOOD PARTNER DETAILS -------------------
export const getFoodPartnerById = (id) => api.get(`/foodpartner/${id}`);
