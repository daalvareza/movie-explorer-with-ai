import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface FavoriteFormProps {
    id: string;
    currentTitle: string;
    currentNotes?: string;
    onSubmit: (updatedFavorite: { id: string; title: string; notes?: string }) => void;
    onCancel: () => void;
}

const FavoriteForm: React.FC<FavoriteFormProps> = ({ id, currentTitle, currentNotes, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(currentTitle);
    const [notes, setNotes] = useState(currentNotes || '');

    const handleSubmit = () => {
        onSubmit({ id, title, notes });
    };

    return (
        <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField 
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={4}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FavoriteForm;