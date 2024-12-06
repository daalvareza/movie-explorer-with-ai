import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieSearch from "../components/MovieSearch";

interface MovieSearchContainerProps {
    onSelect: (id: string) => void;
}

const MovieSearchContainer: React.FC<MovieSearchContainerProps> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useMovies(query, page);

    const handleSearch = (searchQuery: string, searchPage: number) => {
        setQuery(searchQuery);
        setPage(searchPage);
    };

    return (
        <MovieSearch 
            onSearch={handleSearch}
            movies={data?.Search || []}
            onSelect={onSelect}
            totalResults={data?.totalResults || 0}
        />
    );
};

export default MovieSearchContainer;