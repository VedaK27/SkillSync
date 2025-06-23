import axios from 'axios' ;
import BASE_URL from './config';

// const API_URL = 'http://10.0.2.2:5000/api/auth';
const API_URL = `${BASE_URL}/auth` ;

export const signup_post = async (userData) => {
    try {
        // const response = await axios.post(⁠ ${API_URL}/signup ⁠ , userData) ;
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data ;
    }catch(error) {
        return {error : error.response?.data?.message || "Signup Failed"} 
    }
};

export const login_post = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/login`, userData);
        const {token} = response.data ;
        await AsyncStorage.setItem('authToken' , token) ;
        return response.data ;
    }catch(error) {
        return {error : error.response?.data?.message || "Login failed"} ;
    }
};