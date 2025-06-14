
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { getProfileById } from '../services/profileService';
import LoadingSpinner from '../components/LoadingSpinner';
import { DEFAULT_PROFILE_IMAGE, UserIcon, HeartIcon } from '../constants';

const ProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('created') === 'true') {
      setShowCreatedMessage(true);
      // Optional: remove query param from URL without navigation
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (!id) {
      setError("Profile ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProfile = await getProfileById(id);
        if (fetchedProfile) {
          setProfile(fetchedProfile);
        } else {
          setError('Profile not found.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-brand-text-light text-lg">Loading profile details...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="text-center py-10 text-red-600 bg-red-50 p-6 rounded-lg shadow">
        <UserIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
        <p>{error}</p>
        <Link to="/browse" className="mt-6 inline-block bg-brand-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-brand-primary-dark transition-colors">
          Browse Other Profiles
        </Link>
      </div>
    );
  }

  if (!profile) { // Should be covered by error state, but as a fallback
    return <div className="text-center py-10 text-brand-text-light">Profile data is unavailable.</div>;
  }

  const DetailItem: React.FC<{ label: string; value?: string | number | React.ReactNode }> = ({ label, value }) => (
    value ? (
      <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-brand-text-light">{label}</dt>
        <dd className="mt-1 text-sm text-brand-text sm:mt-0 sm:col-span-2">{value}</dd>
      </div>
    ) : null
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fadeIn max-w-4xl mx-auto">
      {showCreatedMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>Your profile has been created successfully. Welcome to MO BAHAGHAR!</p>
        </div>
      )}
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            className="h-64 w-full object-cover md:h-full md:min-h-[500px]" 
            src={profile.profilePictureUrl || DEFAULT_PROFILE_IMAGE} 
            alt={profile.fullName} 
          />
        </div>
        <div className="md:w-2/3 p-6 md:p-10">
          <header className="mb-6 border-b border-rose-200 pb-4">
            <h1 className="text-4xl font-bold text-brand-primary">{profile.fullName}</h1>
            <p className="mt-1 text-lg text-brand-text-light">{profile.age} years old &bull; {profile.occupation}</p>
            <p className="mt-1 text-sm text-gray-500">{profile.city}, {profile.country}</p>
          </header>

          <div className="space-y-3 divide-y divide-rose-100">
            <section>
              <h3 className="text-lg font-semibold text-brand-primary mb-2">About Me</h3>
              <p className="text-brand-text leading-relaxed whitespace-pre-wrap">{profile.aboutMe}</p>
            </section>
            
            <section className="pt-4">
              <h3 className="text-lg font-semibold text-brand-primary mb-2">Basic Information</h3>
              <dl className="divide-y divide-rose-100">
                <DetailItem label="Gender" value={profile.gender} />
                <DetailItem label="Marital Status" value={profile.maritalStatus} />
                <DetailItem label="Religion" value={profile.religion} />
                <DetailItem label="Mother Tongue" value={profile.motherTongue} />
              </dl>
            </section>

            <section className="pt-4">
              <h3 className="text-lg font-semibold text-brand-primary mb-2">Education & Career</h3>
              <dl className="divide-y divide-rose-100">
                <DetailItem label="Education" value={profile.education} />
                <DetailItem label="Occupation" value={profile.occupation} />
                {profile.annualIncome && <DetailItem label="Annual Income" value={profile.annualIncome} />}
              </dl>
            </section>

            <section className="pt-4">
              <h3 className="text-lg font-semibold text-brand-primary mb-2">Lifestyle</h3>
              <dl className="divide-y divide-rose-100">
                <DetailItem label="Height" value={profile.height} />
                <DetailItem label="Diet" value={profile.diet} />
                <DetailItem label="Hobbies" value={profile.hobbies} />
              </dl>
            </section>
            
            {profile.partnerExpectations && (
              <section className="pt-4">
                <h3 className="text-lg font-semibold text-brand-primary mb-2">Partner Expectations</h3>
                <p className="text-brand-text leading-relaxed whitespace-pre-wrap">{profile.partnerExpectations}</p>
              </section>
            )}
          </div>
          <div className="mt-10 text-center">
            <button 
                type="button"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform hover:scale-105"
                onClick={() => alert('Connect feature coming soon!')}
            >
                <HeartIcon className="w-5 h-5 mr-2 -ml-1" />
                Connect with {profile.fullName.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;