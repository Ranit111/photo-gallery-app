import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  getInitialFavourites,
  FAVOURITES_ACTIONS,
  STORAGE_KEY,
} from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorState from './ErrorState';

/**
 * Gallery component manages:
 * - Data fetching via custom hook useFetchPhotos (Requirement 6)
 * - Favourites state via useReducer + localStorage persistence (Requirement 5)
 * - Real-time author search with useCallback & useMemo (Requirements 4 & 7)
 * - Responsive 4/2/1 column photo grid (Requirement 3)
 */
export default function Gallery() {
  // Requirement 6: Use custom hook to fetch photos
  const { photos, loading, error, refetch } = useFetchPhotos();

  // Requirement 5: Manage favourites with useReducer (NOT useState) with lazy localStorage initialization
  const [favourites, dispatch] = useReducer(favouritesReducer, null, getInitialFavourites);

  // Requirement 5: Persist favourites to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to persist favourites to localStorage:', err);
    }
  }, [favourites]);

  // Search filter query state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 7: useCallback on the search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Memoized helper to clear search query
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Memoized handler to toggle favourite status via reducer dispatch
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, []);

  // Requirement 7: useMemo to compute filtered photos list in real-time
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Filter Header (Requirement 4) */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        totalResults={photos.length}
        filteredCount={filteredPhotos.length}
      />

      {/* Loading State (Requirement 2) */}
      {loading && <LoadingSpinner />}

      {/* Error State (Requirement 2) */}
      {!loading && error && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Empty Search Result State */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="text-center py-16 px-4 bg-white border border-slate-200/80 rounded-xl max-w-md mx-auto">
          <svg
            className="w-10 h-10 mx-auto text-slate-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h4 className="text-sm font-semibold text-slate-800">
            No matching photos found
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            No author matches &ldquo;{searchTerm}&rdquo;. Try another name.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="mt-4 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Requirement 3: Responsive Grid:
          - Desktop (lg:): 4 columns
          - Tablet (md:): 2 columns
          - Mobile (default): 1 column
      */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
