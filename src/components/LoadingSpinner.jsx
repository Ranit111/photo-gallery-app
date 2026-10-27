export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 px-4 text-center">
      <div className="relative w-14 h-14">
        {/* Outer glowing ring */}
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin"></div>
      </div>
      <p className="mt-5 text-base font-semibold text-slate-800">
        Loading Photos...
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Fetching curated collection from Picsum API
      </p>
    </div>
  );
}
