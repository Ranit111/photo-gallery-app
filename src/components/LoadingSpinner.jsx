export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-800 animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600">
        Fetching photos from Picsum...
      </p>
      <p className="text-xs text-slate-400 mt-1">
        Please wait while the gallery loads
      </p>
    </div>
  );
}
