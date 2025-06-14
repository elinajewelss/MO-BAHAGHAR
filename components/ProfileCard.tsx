
import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { DEFAULT_PROFILE_IMAGE, EyeIcon } from '../constants';

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="h-64 w-full overflow-hidden">
        <img 
          src={profile.profilePictureUrl || DEFAULT_PROFILE_IMAGE} 
          alt={profile.fullName} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-brand-primary mb-1">{profile.fullName}</h3>
        <p className="text-brand-text-light text-sm mb-1">{profile.age} years old</p>
        <p className="text-brand-text-light text-sm mb-3 truncate" title={`${profile.occupation} in ${profile.city}, ${profile.country}`}>
          {profile.occupation} &bull; {profile.city}, {profile.country}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {profile.aboutMe.substring(0, 80)}{profile.aboutMe.length > 80 ? '...' : ''}
        </p>
        <Link 
          to={`/profile/${profile.id}`} 
          className="mt-auto w-full bg-brand-primary text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-brand-primary-dark transition-colors duration-150 ease-in-out flex items-center justify-center"
        >
          <EyeIcon className="w-5 h-5 mr-2" />
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
