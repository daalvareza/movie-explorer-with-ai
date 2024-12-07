import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieSearch from "../components/MovieSearch/MovieSearch";
import MovieDetailsModal from "../components/MovieDetailsModal";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setPage, setSelectedMovieId } from "../store/moviesSlice";

const MovieSearchContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { query, page, selectedMovieId } = useSelector((state: RootState) => state.movies);
    const { data, isLoading } = useMovies(query, page);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    return (
        <>
        <Header />
        {!isLoading && data?.Search && (
            <MovieSearch
                movies={data.Search}
                onSelect={(id) => dispatch(setSelectedMovieId(id))}
                totalResults={data.totalResults}
                onPageChange={handlePageChange}
                currentPage={page}
            />
        )}
        {selectedMovieId && (
            <MovieDetailsModal 
                movieId={selectedMovieId}
                onClose={() => dispatch(setSelectedMovieId(null))}
                onAddToFavorites={(id) => console.log(`Added ${id} to favorites`)}
            />
        )}
        </>
    );
};

export default MovieSearchContainer;