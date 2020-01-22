import axios from 'axios';
const USER_URL = 'http://localhost:8008/user'

class UserDataService {

    addUser(user) {
        return axios.post(`${USER_URL}`, user)
    }

    checkUser(email, password) {
        return axios.get(`${USER_URL}/${email}/${password}`)
    }

    forgotPass(email) {
        return axios.get(`${USER_URL}/${email}`)
    }



}

export default new UserDataService();