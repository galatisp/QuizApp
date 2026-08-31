import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000/public/subjects/";

const getAllSubjects = () => {
  return axios.get<any>(API_URL);
}

const getCategorySubjects = (id: any) => {
  return axios.get<any>(API_URL + 'category/' + id);
}


const SubjectService = {
  getCategorySubjects,
  getAllSubjects,
};

export default SubjectService;