import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "../constants/index";

const BASE_URL = API_BASE_URL + "/orders";
class OrderService {
  getAllOrders() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }
  getOrderById(id) {
    return axios.get(BASE_URL + "/" + id, { headers: authHeader() });
  }
  updateOrderStatus(id, orderRequest) {
    return axios.put(BASE_URL + "/changeStatus/" + id, orderRequest, {
      headers: authHeader(),
    });
  }
  createOrder(orderRequest) {
    return axios.post(BASE_URL, orderRequest, { headers: authHeader() });
  }
  getAllOrdersByUserId(id){
    return axios.get(BASE_URL + "/userOrder/" + id,{headers:authHeader()})
  }
}
export default new OrderService();
