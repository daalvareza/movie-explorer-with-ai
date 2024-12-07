import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useQuery } from 'react-query';
import { getMovieDetails, getRecommendations } from '../services/movieService';
import { Movie } from '../store/types';

interface MovieDetailsModalProps {
  movieId: string | null;
  onClose: () => void;
  onAddToFavorites: (movieId: string) => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
    movieId,
    onClose,
    onAddToFavorites,
}) => {
    const { data: movieDetails, isLoading } = useQuery(
        ['movieDetails', movieId],
        () => getMovieDetails(movieId!),
        { enabled: !!movieId }
    );

    const { data: recommendations } = useQuery(
        ['recommendations', movieId],
        () => getRecommendations(movieId!),
        { enabled: !!movieId }
    );

    if (isLoading) return <Typography>Loading...</Typography>;
    if (!movieDetails) return null;

    return (
        <Modal open={!!movieId} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box display="flex" gap={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/placeholder.png'}
                            alt={movieDetails.Title}
                            sx={{ maxWidth: 400 }}
                        />
                    </Card>
                    <Box>
                        <Typography variant="h4">{movieDetails.Title}</Typography>
                        <Typography>Year: {movieDetails.Year}</Typography>
                        <Typography>Genre: {movieDetails.Genre}</Typography>
                        <Typography>Plot: {movieDetails.Plot}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onAddToFavorites(movieDetails.imdbID)}
                        >
                            Add to Favorites
                        </Button>
                </Box>
            </Box>

            {recommendations?.Search?.length > 0 && (
            <Box mt={4}>
                <Typography variant="h5" mt={4}>Recommended Movies</Typography>
                <Swiper 
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={5}
                    autoplay={{ delay: 1, disableOnInteraction: false }}
                    speed={3000}
                    loop={true}
                    grabCursor={true}
                    freeMode={true}
                >
                    {recommendations.Search.map((rec: Movie) => (
                        <SwiperSlide key={rec.imdbID}>
                            <Card sx={{ width: 200 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={rec.Poster !== 'N/A' ? rec.Poster : '/placeholder.png'}
                                    alt={rec.Title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1">{rec.Title}</Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            )}
            </Box>
        </Modal>
    );
};

export default MovieDetailsModal;
