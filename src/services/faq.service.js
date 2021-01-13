import axios from "axios";
import authHeader from "./auth-header";
import {API_BASE_URL} from "../constants/index";

const BASE_URL = API_BASE_URL + '/faqs';
class FaqService{
    getAllFaq() {
        return axios.get(BASE_URL,{headers: authHeader() });
    }
    deleteFaq(id){
        return axios.delete(BASE_URL + '/' + id,{headers: authHeader()});
    }
    save(dto){
        return axios.post(BASE_URL,dto,{headers: authHeader()});
    }

}export default new FaqService();