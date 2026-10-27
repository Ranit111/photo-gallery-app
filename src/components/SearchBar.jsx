export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  totalResults,
  filteredCount,
}) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          id="author-search"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Filter photos by author name..."
          aria-label="Filter photos by author name"
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
        />

        {/* Clear Button (appears when user has typed) */}
        {searchTerm && (
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear search text"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Meta feedback line */}
      <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-500">
        <span>
          {searchTerm.trim() ? (
            <>
              Showing <strong className="text-slate-700">{filteredCount}</strong> of{' '}
              {totalResults} photos matching &ldquo;{searchTerm}&rdquo;
            </>
          ) : (
            `Showing all ${totalResults} photos`
          )}
        </span>
      </div>
    </div>
  );
}
