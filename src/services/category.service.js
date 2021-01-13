import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "../constants/index";

const BASE_URL = API_BASE_URL + "/catalogs";
class CategoryService {
  getAllCatalogue() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }
  getCatalogueById(id) {
    return axios.get(BASE_URL + "/"+ id, { headers: authHeader() });
  }
}
export default new CategoryService();
