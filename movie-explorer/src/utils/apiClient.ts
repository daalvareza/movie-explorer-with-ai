import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://www.omdbapi.com',
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error: ', error);
        return Promise.reject(error);
    }
);

export default apiClient;