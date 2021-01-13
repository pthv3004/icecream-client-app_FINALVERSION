import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "../constants/index";

const BASE_URL = API_BASE_URL + "/feedbacks";
class FeedbackService {
  getAllFeedback() {
    return axios.get(BASE_URL, { headers: authHeader() });
  }
  disableFeedback(id) {
    return axios.put(BASE_URL + "/" + id, null, { headers: authHeader() });
  }
  save(dto) {
    return axios.post(BASE_URL, dto, { headers: authHeader() });
  }
  getFeedbackByProductId(id) {
    return axios.get(BASE_URL + "/product/" + id, { headers: authHeader() });
  }
}
export default new FeedbackService();
