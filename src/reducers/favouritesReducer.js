export const STORAGE_KEY = 'photo_gallery_favourites';

/**
 * Lazy initializer function to retrieve stored favourites from localStorage.
 * Runs only once during initial render.
 */
export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading favourites from localStorage:', error);
    return [];
  }
}

/**
 * Action type constants for favourites reducer.
 */
export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

/**
 * Reducer function to handle favourite state transitions.
 * @param {Array<string>} state - Array of favourited photo IDs
 * @param {Object} action - Action object containing type and payload
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      // If exists, remove it; otherwise, append it
      if (isAlreadyFavourite) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }

    default:
      return state;
  }
}
