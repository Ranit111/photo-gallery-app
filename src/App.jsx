import Gallery from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight">
              PG
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900 leading-tight">
                Photo Gallery
              </h1>
              <p className="text-xs text-slate-500">
                Curated Photography Collection
              </p>
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500 hidden sm:block">
            React &bull; Vite &bull; Tailwind CSS
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Gallery />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>Photo Gallery App &bull; Built with React + Vite + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
