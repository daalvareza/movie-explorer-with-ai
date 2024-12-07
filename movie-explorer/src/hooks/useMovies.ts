import { useQuery } from "react-query";
import { searchMovies } from "../services/movieService";

export const useMovies = (movieName: string, page: number) => {
    return useQuery(['movies', movieName, page], () => searchMovies(movieName, page), {
        enabled: !!movieName,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    });
};
