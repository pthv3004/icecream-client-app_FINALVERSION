import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { API_BASE_URL } from "../constants/index";

const API_BASE = API_BASE_URL + "/auth";
class AuthService {
  async login(loginRequest) {
    const response = await axios.post(API_BASE + "/signIn", loginRequest);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }
  register(signupRequest) {
    return axios.post(API_BASE + "/signup", signupRequest);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
