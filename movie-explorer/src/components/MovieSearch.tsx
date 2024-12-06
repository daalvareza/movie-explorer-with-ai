import React, { useState } from "react";
import { TextField, Button, List, ListItem, Pagination } from "@mui/material";

interface MovieSearchProps {
    onSearch: (query: string, page: number) => void;
    movies: any[];
    onSelect: (id: string) => void;
    totalResults: number;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch, movies, onSelect, totalResults }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = () => {
        onSearch(query, 1);
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onSearch(query, value);
    };

    return (
        <>
            <TextField value={query} onChange={(e) => setQuery(e.target.value)} label="Search Movies" />
            <Button onClick={handleSearch}>Search</Button>
            <List>
                {movies.map((movie) => (
                    <ListItem key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
                        {movie.Title} ({movie.Year})
                    </ListItem>
                ))}
            </List>
            <Pagination
                count={Math.ceil(totalResults / 10)}
                page={page}
                onChange={handlePageChange}
            />
        </>
    );
};

export default MovieSearch;