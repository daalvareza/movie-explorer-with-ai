import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Favorite {
    id: string;
    title: string;
    notes?: string;
}

interface FavoritesState {
    items: Favorite[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Favorite>) => {
            state.items.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(movie => movie.id !== action.payload);
        },
        updateFavorite: (state, action: PayloadAction<Favorite>) => {
            const index = state.items.findIndex(movie => movie.id === action.payload.id);
            if (index !== -1) state.items[index] = action.payload;
        }
    },
});

export const { addFavorite, removeFavorite, updateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;