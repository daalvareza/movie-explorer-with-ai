import React, { useState } from 'react';
import MovieSearchContainer from './containers/MovieSearchContainer';
import MovieDetailsContainer from './containers/MovieDetailsContainer';
import FavoritesContainer from './containers/FavoritesContainer';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  return (
    <div className="App">
      <MovieSearchContainer onSelect={(id) => setSelectedMovieId(id)}/>
      {selectedMovieId && <MovieDetailsContainer movieId={selectedMovieId} />}
      <FavoritesContainer />
    </div>
  );
}

export default App;
