import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface MovieDetailsProps {
    movie: {
        Title: string;
        Year: string;
        Genre: string;
        Plot: string;
    };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{movie.Title}</Typography>
                <Typography>Year: {movie.Year}</Typography>
                <Typography>Genre: {movie.Genre}</Typography>
                <Typography>Plot: {movie.Plot}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieDetails;