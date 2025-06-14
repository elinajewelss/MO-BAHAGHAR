
import React from 'react';

export const APP_TITLE = "MO BAHAGHAR";

export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: 'Never Married', label: 'Never Married' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Widowed', label: 'Widowed' },
  { value: 'Awaiting Divorce', label: 'Awaiting Divorce' },
];

export const DIET_OPTIONS = [
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
  { value: 'Eggetarian', label: 'Eggetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Jain', label: 'Jain' },
];

export const RELIGION_OPTIONS = [
  "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi", "Jewish", "Spiritual - Not Religious", "No Religion", "Other"
];

export const DEFAULT_PROFILE_IMAGE = "https://picsum.photos/seed/defaultuser/400/400";

// --- SVG Icons ---
// Using Heroicons (MIT License) style for consistency

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.218c-.017.01-.033.018-.05.026l-.007.003-.022.012-.007.002-.007.002-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L9 4.061l.53.53a.75.75 0 0 1-1.06 1.06l-.53-.531-.53.53a.75.75 0 0 1-1.06-1.06l.53-.53-.53-.53a.75.75 0 0 1 1.06-1.06l.53.53.53-.53a.75.75 0 0 1 1.06 0ZM16.03 9.97a.75.75 0 0 1 0 1.06l-.53.53.53.53a.75.75 0 1 1-1.06 1.06l-.53-.53-.53.53a.75.75 0 1 1-1.06-1.06l.53-.53-.53-.53a.75.75 0 0 1 1.06-1.06l.53.53.53-.53a.75.75 0 0 1 1.06 0ZM4.5 15.75A.75.75 0 0 1 5.25 15h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm15 .75a.75.75 0 0 0-.75-.75h-.75a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 .75-.75ZM2.25 12a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0-.75.75ZM12 3.75A.75.75 0 0 1 12.75 3h.01a.75.75 0 0 1 0 1.5H12.75a.75.75 0 0 1-.75-.75ZM10.5 18.75a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0-.75.75Z" clipRule="evenodd" />
    <path d="M12 6.75A5.25 5.25 0 0 0 6.75 12a5.25 5.25 0 0 0 5.25 5.25A5.25 5.25 0 0 0 17.25 12A5.25 5.25 0 0 0 12 6.75Zm0 8.25a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
  </svg>
);

export const ArrowPathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
  </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);