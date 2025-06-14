
import React, { useState, useCallback } from 'react';
import { ProfileFormData, Gender, MaritalStatus, Diet } from '../types';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, DIET_OPTIONS, RELIGION_OPTIONS, SparklesIcon, ArrowPathIcon } from '../constants';
import { generateBioSuggestion } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface ProfileFormProps {
  onSubmit: (formData: ProfileFormData) => void;
  initialData?: ProfileFormData;
  isSubmitting?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData || {
    fullName: '',
    age: 0,
    gender: Gender.FEMALE,
    religion: RELIGION_OPTIONS[0],
    motherTongue: '',
    city: '',
    country: '',
    education: '',
    occupation: '',
    annualIncome: '',
    maritalStatus: MaritalStatus.NEVER_MARRIED,
    height: '',
    diet: Diet.VEGETARIAN,
    aboutMe: '',
    hobbies: '',
    partnerExpectations: '',
    profilePictureUrl: '',
  });
  const [bioLoading, setBioLoading] = useState(false);
  const [bioError, setBioError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.profilePictureUrl || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value, 10) || 0 : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, profilePictureUrl: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateBio = useCallback(async () => {
    setBioLoading(true);
    setBioError(null);
    try {
      const { fullName, age, occupation, hobbies, partnerExpectations, gender, religion, city } = formData;
      const promptData = {
        name: fullName,
        age: age.toString(),
        occupation,
        hobbies,
        partnerExpectations,
        gender,
        religion,
        city,
      };
      const suggestedBio = await generateBioSuggestion(promptData);
      setFormData(prev => ({ ...prev, aboutMe: suggestedBio }));
    } catch (error) {
      console.error("Bio generation failed:", error);
      setBioError(error instanceof Error ? error.message : "Failed to generate bio. Please try again.");
    } finally {
      setBioLoading(false);
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const labelClass = "block text-sm font-medium text-brand-text-light";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="age" className={labelClass}>Age</label>
          <input type="number" name="age" id="age" value={formData.age || ''} onChange={handleChange} className={inputClass} required min="18" />
        </div>
        <div>
          <label htmlFor="gender" className={labelClass}>Gender</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
            {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="religion" className={labelClass}>Religion</label>
          <select name="religion" id="religion" value={formData.religion} onChange={handleChange} className={inputClass} required>
            {RELIGION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="motherTongue" className={labelClass}>Mother Tongue</label>
          <input type="text" name="motherTongue" id="motherTongue" value={formData.motherTongue} onChange={handleChange} className={inputClass} required />
        </div>
         <div>
          <label htmlFor="maritalStatus" className={labelClass}>Marital Status</label>
          <select name="maritalStatus" id="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={inputClass} required>
            {MARITAL_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />
      <h2 className="text-xl font-semibold text-brand-primary mb-4">Location & Profession</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className={labelClass}>City</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>Country</label>
          <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="education" className={labelClass}>Highest Education</label>
          <input type="text" name="education" id="education" value={formData.education} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="occupation" className={labelClass}>Occupation</label>
          <input type="text" name="occupation" id="occupation" value={formData.occupation} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="annualIncome" className={labelClass}>Annual Income (Optional)</label>
          <input type="text" name="annualIncome" id="annualIncome" value={formData.annualIncome || ''} onChange={handleChange} className={inputClass} placeholder="e.g., 10 LPA or $70,000" />
        </div>
      </div>
      
      <hr className="my-6 border-slate-200" />
      <h2 className="text-xl font-semibold text-brand-primary mb-4">Lifestyle & Appearance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="height" className={labelClass}>Height</label>
          <input type="text" name="height" id="height" value={formData.height} onChange={handleChange} className={inputClass} required placeholder="e.g., 5 ft 8 in or 173 cm" />
        </div>
        <div>
          <label htmlFor="diet" className={labelClass}>Dietary Habits</label>
          <select name="diet" id="diet" value={formData.diet} onChange={handleChange} className={inputClass} required>
            {DIET_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />
      <h2 className="text-xl font-semibold text-brand-primary mb-4">About Yourself & Expectations</h2>
      <div>
        <label htmlFor="hobbies" className={labelClass}>Hobbies & Interests (for Bio generation)</label>
        <input type="text" name="hobbies" id="hobbies" value={formData.hobbies} onChange={handleChange} className={inputClass} placeholder="e.g., Reading, Hiking, Cooking" />
      </div>
      <div>
        <label htmlFor="partnerExpectations" className={labelClass}>Briefly describe your partner expectations (for Bio generation)</label>
        <textarea name="partnerExpectations" id="partnerExpectations" value={formData.partnerExpectations} onChange={handleChange} rows={2} className={inputClass} placeholder="e.g., Kind, ambitious, loves travel"></textarea>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="aboutMe" className={labelClass}>About Me</label>
          <button 
            type="button" 
            onClick={handleGenerateBio} 
            disabled={bioLoading}
            className="text-sm text-brand-primary hover:text-brand-primary-dark font-medium flex items-center disabled:opacity-50"
          >
            {bioLoading ? <ArrowPathIcon className="w-4 h-4 mr-1 animate-spin" /> : <SparklesIcon className="w-4 h-4 mr-1" />}
            {bioLoading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>
        <textarea name="aboutMe" id="aboutMe" value={formData.aboutMe} onChange={handleChange} rows={5} className={inputClass} required placeholder="Tell us something about yourself..."></textarea>
        {bioError && <p className="text-sm text-red-600 mt-1">{bioError}</p>}
      </div>

      <hr className="my-6 border-slate-200" />
      <h2 className="text-xl font-semibold text-brand-primary mb-4">Profile Picture</h2>
      <div>
        <label htmlFor="profilePictureUrl" className={labelClass}>Upload Photo</label>
        <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleImageChange} accept="image/*" className={`${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-brand-primary hover:file:bg-rose-100`} />
        {imagePreview && <img src={imagePreview} alt="Profile Preview" className="mt-4 rounded-lg w-40 h-40 object-cover shadow-md" />}
      </div>
      
      <div className="pt-5">
        <button 
          type="submit" 
          disabled={isSubmitting || bioLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60"
        >
          {isSubmitting ? <LoadingSpinner size="sm" /> : (initialData ? 'Update Profile' : 'Create Profile')}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
