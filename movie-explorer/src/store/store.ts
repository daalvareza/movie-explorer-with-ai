import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import movieReducer from "./moviesSlice";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
