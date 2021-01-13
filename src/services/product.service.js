import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "../constants/index";

const BASE_URL = API_BASE_URL + "/products";
class ProductService {
  getAllProduct() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }
  loadAllProducts() {
    return axios.get(BASE_URL + "/home", { headers: authHeader() });
  }
  getProductById(id) {
    return axios.get(BASE_URL + "/" + id, { headers: authHeader() });
  }
  updateProduct(id, productRequest) {
    return axios.put(BASE_URL + "/" + id, productRequest, {
      headers: authHeader(),
    });
  }
  createProduct(productRequest) {
    return axios.post(BASE_URL, productRequest, { headers: authHeader() });
  }
}
export default new ProductService();
