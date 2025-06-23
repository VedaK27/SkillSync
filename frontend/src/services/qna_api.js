import axios from "axios";
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "./config";


// const API_URL = "http://10.0.2.2:5001/api/qna";


// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/qna' 
//     : 'http://10.0.2.2:5001/api/qna';

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/qna' 
//     : 'http://192.168.0.101:5001/api/qna';

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/qna' 
//     : 'http://192.168.208.220:5001/api/qna';

const API_URL = `${BASE_URL}/qna` ;

// Signup API
export const postQuestion = async (questionData) => {
    try {
        const response = await axios.post(`${API_URL}/question`, questionData);
        // const response = await axios.post(`${API_URL}/question`, {questionData});
        //export const postQuestion = async (userId,questionData) => {
        return response.data;
    } catch (error) {
        console.log("Add question Error:", error.response ? error.response.data : error.message);
        return { error: error.response?.data?.message || "Add question Failed" };
    }
};


export const postAnswer = async (questionId, answerData) => {
  try {
    // Log the complete request being made
   
    const response = await axios.post(
      `${API_URL}/question/${questionId}/answer`,
      answerData
    );
    
    console.log("Success Response:", response.data);
    return response.data;
  } catch (error) {
    // More detailed error logging
    console.log("Error Status:", error.response?.status);
    console.log("Error Data:", error.response?.data);
    console.log("Error Message:", error.message);
    
    // Return more specific error information
    return { 
      error: error.response?.data?.message || 
             error.response?.data || 
             error.message || 
             "Add answer Failed" 
    };
  }
};


// In your API service file
// export const postQuestion = async (questionData) => {
//     try {
//       // Include authentication token in headers
//       const response = await axios.post(`${API_URL}/question`, questionData, {
//         headers: {
//           'Authorization': `Bearer ${await getAuthToken()}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.log("Add question Error:", error.response ? error.response.data : error.message);
//       return { error: error.response?.data?.message || "Add question Failed" };
//     }
//   };

// import axios from 'axios';

//const BASE_URL = "http://10.0.2.2:5001/api/qna";  // Change this to your backend URL

export const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/viewQuestion`);
      return response.data; 
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error("Error fetching questions - Status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error fetching questions - No response received");
      } else {
        // Something happened in setting up the request
        console.error("Error fetching questions:", error.message);
      }
      return []; // Return empty array on any error
    }
  };

  
export const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`${API_URL}/viewAnswers/${questionId}`);
      return response.data;
    } catch (error) {
      // Error handling
      if (error.response) {
        console.error("Error fetching question - Status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        console.error("Error fetching question - No response received");
      } else {
        console.error("Error fetching question:", error.message);
      }
      return null;
    }
};