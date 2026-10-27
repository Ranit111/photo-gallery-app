export default function ErrorState({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white border border-rose-200 rounded-xl shadow-sm text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        Unable to Load Photos
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        {message || 'An unexpected error occurred while fetching photo data.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
