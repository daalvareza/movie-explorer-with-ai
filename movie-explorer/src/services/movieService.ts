import axios from "axios";

const API_KEY = 'dcd30bef';
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (movieName: string, page: number = 1) => {
    const { data } = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${movieName}&page=${page}`);
    return data;
};

export const getMovieDetails = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}`);
    return data;
};

export const getRecommendations = async (movieId: string) => {
    // const { data } = await axios.get(`/recommendations/${movieId}`);
    const { data } = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=batman&page=1`);
    console.log(data);
    return data;
};
  