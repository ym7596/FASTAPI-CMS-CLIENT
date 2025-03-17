import axios from 'axios';

const API_BASE_URL = 'your_api_url';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        console.error('Error:', error);
        return Promise.reject(error);
    }
);

export const ProtocolManager = {
    async getData(endpoint) {
        try{
            const response = await axiosInstance.get(endpoint);
            return response;
        } 
        catch(error){
            throw error;
        }
    },

    async postData(endpoint, data) {
        try{
            const response = await axiosInstance.post(endpoint, data);
            return response;
        }
        catch(error){
            throw error;
        }
    },

    async putData(endpoint, data){
        try{
            const response = await axiosInstance.put(endpoint, data);
            return response;
        }
        catch(error){
            throw error;
        }
    },

    async deleteData(endpoint){
        try{
            const response = await axiosInstance.delete(endpoint);
            return response;
        }
        catch(error){
            throw error;
        }
    }
};

export const API = {
    categories: {
        getAll: () => ProtocolManager.getData('/categories'),
        create: (data) => ProtocolManager.postData('/categories', data),
        delete: (id) => ProtocolManager.deleteData(`/categories/${id}`),
    },

    subcategories: {
        create: (data) => ProtocolManager.postData('/subcategories', data),
        delete: (id) => ProtocolManager.deleteData(`/subcategories/${id}`),
    },

    items:{
        getAll: () => ProtocolManager.getData('/items'),
        create: (data) => ProtocolManager.postData('/items', data),
        delete: (id) => ProtocolManager.deleteData(`/items/${id}`),
    }
}