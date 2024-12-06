export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Genre?: string;
    Plot?: string;
}

export interface Favorite {
    id: string;
    title: string;
    notes?: string;
}