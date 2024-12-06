import { useQuery } from "react-query";
import { searchMovies } from "../services/movieService";

export const useMovies = (query: string, page: number) => {
    return useQuery(['movies', query, page], () => searchMovies(query, page), {
        keepPreviousData: true,
    });
};