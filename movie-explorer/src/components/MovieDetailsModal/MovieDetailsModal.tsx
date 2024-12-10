import React, { useState } from 'react';
import { Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getRecommendations } from '../../services/movieService';
import { Movie } from '../../store/types';
import {
    AddToFavoriesButton,
    DetailsContainer, 
    InfoContainer, 
    ModalContent, 
    PosterCard, 
    RecommendationCard, 
    RecommendationImage, 
    RecommendedSection, 
    Separator, 
    StyledModal 
} from './MovieDetailsModal.styled';
import theme from '../../theme';
import { useDispatch } from 'react-redux';
import { setSelectedMovieId } from '../../store/moviesSlice';
import FavoritesFormModal from '../FavoritesFormModal/FavoritesFormModal';

interface MovieDetailsModalProps {
  movieId: string | null;
  onClose: () => void;
  notes?: string;
  toUpdate?: boolean;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
    movieId,
    onClose,
    notes,
    toUpdate = false,
}) => {
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false);

    let { data: movieDetails, isLoading } = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => getMovieDetails(movieId!),
        enabled: !!movieId,
    });

    const { data: recommendations } = useQuery({
        queryKey: ['recommendations', movieId],
        queryFn: () => getRecommendations(movieId!),
        enabled: !!movieId,
    });

    if (!movieDetails) return null;
    if (notes) {
        movieDetails = {
            ...movieDetails,
            Notes: notes,
        };
    }

    return (
        <>
        <StyledModal open={!!movieId} onClose={onClose}>
            <ModalContent>
                <DetailsContainer>
                    <PosterCard>
                        <img
                            src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.png"}
                            alt={movieDetails.Title}
                            style={{ maxHeight: "20rem", borderRadius: "4px"}}
                        />
                    </PosterCard>
                    <InfoContainer>
                        <Typography variant="h4" sx={{ paddingBottom: theme.spacing(2)}}>{movieDetails.Title}</Typography>
                        <Typography><b>Year:</b> {movieDetails.Year}</Typography>
                        <Typography><b>Genre:</b> {movieDetails.Genre}</Typography>
                        <Typography><b>Plot:</b> {movieDetails.Plot}</Typography>
                        {notes && (<Typography><b>Notes:</b> {notes}</Typography>)}
                        <AddToFavoriesButton
                            variant="contained"
                            color="secondary"
                            onClick={() => setIsFormOpen(true)}
                        >
                            {toUpdate ? "Update Favorite" : "Add to Favorites"}
                        </AddToFavoriesButton>
                    </InfoContainer>
                </DetailsContainer>

                <Separator />

                {recommendations?.Search?.length > 0 && (
                <RecommendedSection>
                    <Typography variant="h5" sx={{ paddingBottom: theme.spacing(2)}}>Recommended Movies</Typography>
                    <Swiper 
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={5}
                        autoplay={{ delay: 1, disableOnInteraction: false }}
                        speed={3000}
                        loop={true}
                        grabCursor={true}
                        freeMode={true}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 3, spaceBetween: 15 },
                            1024: { slidesPerView: 5, spaceBetween: 20 },
                        }}
                    >
                        {recommendations.Search.map((rec: Movie) => (
                            <SwiperSlide key={rec.imdbID}>
                                <RecommendationCard onClick={() => dispatch(setSelectedMovieId(rec.imdbID))}>
                                    <RecommendationImage
                                        src={rec.Poster !== "N/A" ? rec.Poster : "/placeholder.png"}
                                        alt={rec.Title}
                                        style={{ maxHeight: "15rem", borderRadius: "4px"}}
                                    />
                                    <Typography variant="subtitle1" align="center">{rec.Title}</Typography>
                                </RecommendationCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </RecommendedSection>
                )}
            </ModalContent>
        </StyledModal>
        <FavoritesFormModal 
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            movie={movieDetails}
            toUpdate={toUpdate}
        />
        </>
    );
};

export default MovieDetailsModal;
