import axios from "axios";
import authHeader from "./auth-header";
import {API_BASE_URL} from "../constants/index";

const BASE_URL = API_BASE_URL + '/users';

class UserService {

    getAllUsers() {
        return axios.get(BASE_URL,{headers: authHeader() });
    }

    getUserById(id) {
        return axios.get(BASE_URL + '/' + id,{headers: authHeader()});
    }
    updateProfile(id,profile)  {
        return axios.put(BASE_URL + '/updateProfile/' + id,profile,{headers: authHeader()});
    }
    updateUser(id,dto){
        return axios.put(BASE_URL + '/' + id,dto,{headers:authHeader()});
    }
    changePassword(id,requestBody){
        return axios.put(BASE_URL + '/changePassword/' + id,requestBody,{headers: authHeader()});
    }
    searchUser(username){
        return axios.get(BASE_URL + '/search?username='+username,{headers: authHeader()});
    }

}
export default new UserService();