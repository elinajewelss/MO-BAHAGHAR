
import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfile } from '../types';
import { getProfiles } from '../services/profileService';
import { UserIcon } from '../constants';

const BrowseProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProfiles = await getProfiles();
        setProfiles(fetchedProfiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profiles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-brand-text-light text-lg">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 bg-red-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
        <p>{error}</p>
        <p className="mt-2">Please try refreshing the page or check back later.</p>
      </div>
    );
  }
  
  return (
    <div className="animate-fadeIn">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-3">Discover Your Partner on MO BAHAGHAR</h1>
        <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
          Browse through profiles of individuals seeking meaningful connections. Your journey to finding 'the one' starts here.
        </p>
      </header>

      {profiles.length === 0 ? (
        <div className="text-center py-12 bg-white p-8 rounded-xl shadow-lg">
          <UserIcon className="w-16 h-16 text-brand-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-brand-primary mb-2">No Profiles Yet</h2>
          <p className="text-brand-text-light">Be the first to create a profile and start your search!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {profiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseProfilesPage;