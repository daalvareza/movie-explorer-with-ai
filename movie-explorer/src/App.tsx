import React, { useState } from 'react';
import MovieSearchContainer from './containers/MovieSearchContainer';
import FavoritesContainer from './containers/FavoritesContainer';
import { CssBaseline } from '@mui/material';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  return (
    <div className="App">
      <CssBaseline />
      <MovieSearchContainer />
    </div>
  );
}

export default App;
