import axios from 'axios' ;
import { Platform } from 'react-native';
import BASE_URL from './config';

//import notifications from '../../../backend/models/notifications';
// const BASE_URL = "http://10.0.2.2:5001/api/notifications" ;

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/notifications' 
//     : 'http://10.0.2.2:5001/api/notifications';

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/notifications' 
//     : 'http://192.168.208.220:5001/api/notifications';

const API_URL = `${BASE_URL}/notifications` ;

export const fetchUserNotifications = async (userId) => {
    console.log("In notification api page") ;
    const res = await axios.get(`${API_URL}/${userId}`) ;
    return res.data ;
};

export const updateNotificationStatus = async (notificationId , status) => {
    console.log("In notification API :") ;
    console.log("Notification Id :" , notificationId) ;
    console.log("Status :" , status) ;
    const res = await axios.patch(`${API_URL}/${notificationId}`, { status });
    console.log("Completed response !") ;
    return res.data;
};

export const createNotification = async (notificationData) => {
    try {
      console.log("In notification api page") ;
      const response = await axios.post(`${API_URL}/create`, notificationData);
      return response.data;
    } catch (error) {
      console.log("Create notification error:", error?.message || error);
      // Safely return a fallback error message
      throw new Error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create notification"
      );
    }
  };
  