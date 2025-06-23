import axios from "axios";
import { Platform } from 'react-native';
import BASE_URL from "./config";

// const API_URL = "http://10.0.2.2:5001/api/projects"; // Emulator only


// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/projects' 
//     : 'http://10.0.2.2:5001/api/projects';

// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/projects' 
//     : 'http://192.168.0.101:5001/api/projects';


// const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001/api/projects' 
//     : 'http://192.168.208.220:5001/api/projects';

const API_URL = `${BASE_URL}/projects` ;


export const addProject = async (userId, projectData) => {
  console.log("API URL:", `${API_URL}/add-project/${userId}`);
  console.log("Project Data:", projectData);
  try {
    const response = await axios.post(`${API_URL}/add-project/${userId}`, projectData);
    return response.data;
  } catch (error) {
    console.log("Add Project Error:", error.response ? error.response.data : error.message);
    return { error: error.response?.data?.message || "Add Project Failed" };
  }
};

export const fetchProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching projects : ", error);
        return [];
    }
};

export const fetchPublicProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/public`);
        return response.data;
    } catch (error) {
        console.log("Error fetching projects : ", error);
        return [];
    }
};

export const fetchUserProjects = async (userId) => {
  try {
    console.log("Fetching projects for user:", userId);
    const response = await axios.get(`${API_URL}/my-projects/${userId}`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error.response?.data || error.message);
    return [];
  }
};

export const fetchUserPublicProjects = async (userId) => {
  try {
    console.log("Fetching projects for user:", userId);
    const response = await axios.get(`${API_URL}/my-public-projects/${userId}`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error.response?.data || error.message);
    return [];
  }
}

export const fetchProjectMembers = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/${projectId}/members`);
    return response.data.members;
  } catch (error) {
    console.log("Error fetching project members:", error.response?.data || error.message);
    return [];
  }
};


export const sendInvite = async (projectId , userToInvite , token) => {
  try {
    console.log("In project_Api for sending invites !") ;
    const res = await axios.post(`${API_URL}/invite` , {projectId , userIdToInvite:userToInvite} , {
      headers : {
        Authorization : `Bearer ${token}` ,
      },
    }
  );
  }catch(error){
    console.log("Error in sending invite :" , error.response?.data || error.message) ;
    throw error ;
  }
};

export const apply = async (projectId, userId) => {
  try {
    console.log(`${userId} Applying For project: ${projectId}`);

    const response = await axios.post(`${API_URL}/apply`, { projectId, userId });
    
    console.log("✅ Apply response:", response.data);
    return response;
  } catch (error) {
    console.log("❌ Error in applying the project:", error);

    // More detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error status:", error.response.status);
      console.log("Error data:", error.response.data);
      
      let errorMessage = "Failed to apply for the project";
      
      if (error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage = error.response.data.message || 
                         error.response.data.error || 
                         JSON.stringify(error.response.data);
        } else {
          errorMessage = error.response.data;
        }
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error setting up request:", error.message);
      throw new Error(error.message);
    }
  }
};

export const acceptInvite = async (projectId, userId, notificationId) => {
  try {
    console.log(`User ${userId} accepting invitation for project: ${projectId}`);
    const response = await axios.post(`${API_URL}/accept-invite`, { 
      projectId, 
      userId,
      notificationId 
    });
    return response.data;
  } catch (error) {
    console.log("❌ Error in accepting the invitation:", error);
    let errorMessage = "Failed to accept project invitation";
    
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'object') {
        errorMessage = error.response.data.message || 
                       error.response.data.error || 
                       JSON.stringify(error.response.data);
      } else {
        errorMessage = error.response.data;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

export const acceptApplication = async (projectId, otherId, notificationId) => {
  try {
    console.log(`Accepting application for project: ${projectId} from user: ${otherId}`);
    const response = await axios.post(`${API_URL}/accept-application`, { 
      projectId, 
      otherId,
      notificationId 
    });
    return response.data;
  } catch (error) {
    console.log("❌ Error in accepting the invitation:", error);
    let errorMessage = "Failed to accept project invitation";
    
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'object') {
        errorMessage = error.response.data.message || 
                       error.response.data.error || 
                       JSON.stringify(error.response.data);
      } else {
        errorMessage = error.response.data;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};