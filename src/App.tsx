import React from 'react';
import { Palette } from 'lucide-react';
import { ImageConverter } from './components/ImageConverter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Palette className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Color Page Creator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Transform your photos into stunning coloring pages with our
            <span className="gradient-text font-semibold"> AI-powered </span>
            converter. Create, customize, and unleash your creativity!
          </p>
        </header>

        <main>
          <ImageConverter />
        </main>

        <footer className="mt-24 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Color Page Creator. Made with 💜 for
            artists everywhere.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
