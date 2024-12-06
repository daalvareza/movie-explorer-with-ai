import { Button, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

interface Favorite {
    id: string;
    title: string;
    notes?: string;
}

interface FavoriteListProps {
    favorites: Favorite[];
    onRemove: (id: string) => void;
    onUpdate: (favorite: Favorite) => void;
}

const FavoritesList: React.FC<FavoriteListProps> = ({ favorites, onRemove, onUpdate }) => {
    return (
        <List>
            {favorites.map((fav) => (
                <ListItem key={fav.id}>
                    <ListItemText primary={fav.title} secondary={fav.notes || 'No notes'} />
                    <Button onClick={() => onRemove(fav.id)}>Remove</Button>
                    <Button onClick={() => onUpdate({ ...fav, notes: 'Updated notes' })}>Update</Button>
                </ListItem>
            ))}
        </List>
    );
};

export default FavoritesList;