import React, { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import FavoritesList from "../components/FavoritesList";
import { Favorite } from "../store/types";
import FavoriteForm from "../components/FavoriteForm";

const FavoritesContainer: React.FC = () => {
    const { favorites, removeFavorite, updateFavorite } = useFavorites();
    const [editingFavorite, setEditingFavorite] = useState<Favorite | null>(null);

    const handleEdit = (favorite: Favorite) => {
        setEditingFavorite(favorite);
    };

    const handleCancel = () => {
        setEditingFavorite(null);
    };

    const handleSubmit = (updatedFavorite: Favorite) => {
        updateFavorite(updatedFavorite);
        setEditingFavorite(null);
    }

    return (
        <>
            {editingFavorite ? (
                <FavoriteForm
                    id={editingFavorite.id}
                    currentTitle={editingFavorite.title}
                    currentNotes={editingFavorite.notes}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            ) : (
                <FavoritesList 
                    favorites={favorites}
                    onRemove={removeFavorite}
                    onUpdate={updateFavorite}
                />
            )}
        </>
    );
};

export default FavoritesContainer;