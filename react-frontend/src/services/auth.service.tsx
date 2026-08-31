import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (username: any, email: any, password: any) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username: any, password: any) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = (fallback = null) => {
  //return JSON.parse(localStorage.getItem("user")??'');
  if (localStorage.getItem("user")) {
    const userName = localStorage.getItem("user");
    if (typeof userName !== 'string' || userName.trim() === '') return fallback;
    try {
      return JSON.parse(userName);
    } catch (e) {

      console.error('Invalid JSON data in localStorage');
    }
    return fallback;
  }
  else {
    console.log('No data found in localStorage');
  }
} ;

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;