import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000/public/categories/";

const getAllCategories = () => {
  return axios.get<any>(API_URL);
}

const getCategory = (id: any) => {
  return axios.get<any>(API_URL + id);
}


const CategoryService = {
  getCategory,
  getAllCategories,
};

export default CategoryService;