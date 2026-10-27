import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch 30 photos from Picsum API.
 * Returns:
 *  - photos: array of photo objects
 *  - loading: boolean indicating fetch status
 *  - error: null or error message string
 *  - refetch: function to retry fetching
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure smooth UX and visible loading state so spinner is clearly perceptible
      const [response] = await Promise.all([
        fetch(API_URL, { signal }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      // Don't treat intentional aborts as errors
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to fetch photos. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPhotos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPhotos]);

  return { photos, loading, error, refetch: () => fetchPhotos() };
}
