
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BrowseProfilesPage from './pages/BrowseProfilesPage';
import CreateProfilePage from './pages/CreateProfilePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import { APP_TITLE, HeartIcon } from './constants'; // Added HeartIcon import

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 text-brand-text">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<BrowseProfilesPage />} />
          <Route path="/create" element={<CreateProfilePage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
          <Route path="*" element={
            <div className="text-center py-10">
              <h1 className="text-3xl font-bold text-brand-primary">404 - Page Not Found</h1>
              <p className="mt-4 text-brand-text-light">Oops! The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>
      <footer className="bg-white/80 backdrop-blur-sm shadow-inner py-6 text-center text-brand-text-light">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved.</p>
        <p className="text-xs mt-1">Designed with <HeartIcon className="inline w-4 h-4 text-brand-primary" /> for finding meaningful connections.</p>
      </footer>
    </div>
  );
};

export default App;
