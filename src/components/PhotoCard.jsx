import { useState } from 'react';

/**
 * PhotoCard component renders a single photo card with:
 * - Image thumbnail (with smooth load transition & fallback)
 * - Author name
 * - Heart icon toggle button for favourites
 */
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized thumbnail URL from Picsum CDN (600x450 for crisp 4:3 card aspect ratio)
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/600/450`;

  return (
    <article className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Photo Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {/* Skeleton placeholder while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}

        <img
          src={imageError ? photo.download_url : thumbnailUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            // If the sized thumbnail fails, fallback to download_url
            if (!imageError) {
              setImageError(true);
            }
          }}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Card Content & Footer */}
      <div className="p-3.5 flex items-center justify-between gap-2 border-t border-slate-100">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
            Author
          </p>
          <h3
            className="text-sm font-semibold text-slate-800 truncate"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40 ${
            isFavourite
              ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
              : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isFavourite ? 'scale-110' : 'scale-100 active:scale-90'}`}
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '0' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
