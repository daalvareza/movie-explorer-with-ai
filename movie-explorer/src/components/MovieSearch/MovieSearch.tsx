import React from "react";
import { Pagination, Box } from "@mui/material";
import { Movie } from "../../store/types";
import { MoviesContainer, MovieItem, MovieCard, MovieCardContent, MoviePoster, MovieTitle } from "./MovieSearch.styled";

interface MovieSearchProps {
    movies: Movie[];
    onSelect: (id: string) => void;
    totalResults: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ 
    movies,
    onSelect,
    totalResults,
    onPageChange,
    currentPage 
}) => {
    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <MoviesContainer container >
                {movies.map((movie) => (
                    <MovieItem key={movie.imdbID}>
                        <MovieCard onClick={() => onSelect(movie.imdbID)}>
                            <MoviePoster
                                image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                            />
                            <MovieCardContent>
                                <MovieTitle variant="h6" align="center">
                                    {movie.Title}
                                </MovieTitle>
                            </MovieCardContent>
                        </MovieCard>
                    </MovieItem>
                ))}
            </MoviesContainer>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination 
                    count={Math.ceil(totalResults / 10)}
                    page={currentPage}
                    onChange={(_, page) => onPageChange(page)}
                    color="secondary"
                />
            </Box>
        </Box>
    );
};

export default MovieSearch;