
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { ProfileFormData } from '../types';
import { addProfile } from '../services/profileService';
import { HeartIcon } from '../constants';


const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ProfileFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newProfile = await addProfile(formData);
      // alert('Profile created successfully!'); // Or use a nicer notification system
      navigate(`/profile/${newProfile.id}?created=true`);
    } catch (err) {
      console.error("Profile creation failed:", err);
      setError(err instanceof Error ? err.message : 'Failed to create profile. Please try again.');
      setIsSubmitting(false);
    }
    // No setIsSubmitting(false) here if navigation occurs, component unmounts.
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <header className="mb-8 text-center">
         <HeartIcon className="w-16 h-16 text-brand-primary mx-auto mb-3" />
        <h1 className="text-4xl font-bold text-brand-primary">Create Your Profile</h1>
        <p className="mt-2 text-lg text-brand-text-light">
          Share your details to connect with potential life partners.
        </p>
      </header>
      
      {error && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <ProfileForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateProfilePage;
