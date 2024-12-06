import React from "react";
import { useQuery } from "react-query";
import { getMovieDetails } from "../services/movieService";
import MovieDetails from "../components/MovieDetails";

interface MovieDetailsContainerProps {
    movieId: string;
}

const MovieDetailsContainer: React.FC<MovieDetailsContainerProps> = ({ movieId }) => {
    const { data, isLoading, error } = useQuery(['movieDetails', movieId], () => getMovieDetails(movieId));

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading movie details.</p>

    return <MovieDetails movie={data} />;
};

export default MovieDetailsContainer;