
import { UserProfile, ProfileFormData } from '../types';
import { DEFAULT_PROFILE_IMAGE, RELIGION_OPTIONS, GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, DIET_OPTIONS } from '../constants';
import { Gender, MaritalStatus, Diet } from '../types';


const PROFILES_STORAGE_KEY = 'mobahaghar_profiles';

// Helper to get a random item from an array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


const generateSampleProfiles = (): UserProfile[] => {
  const sampleNames = [
    { name: "Priya Sharma", gender: Gender.FEMALE }, { name: "Rohan Verma", gender: Gender.MALE },
    { name: "Aisha Khan", gender: Gender.FEMALE }, { name: "Vikram Singh", gender: Gender.MALE },
    { name: "Sneha Reddy", gender: Gender.FEMALE }, { name: "Arjun Mehta", gender: Gender.MALE },
  ];
  const occupations = ["Software Engineer", "Doctor", "Teacher", "Architect", "Marketing Manager", "Accountant"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"]; // These can be diversified for Odisha later
  const countries = ["India"];
  const educations = ["MBA", "M.Tech", "MBBS", "PhD", "B.Com", "B.E."];
  const hobbiesList = [
    "reading books and watching movies", 
    "travelling and exploring new cultures", 
    "cooking and trying new recipes", 
    "hiking and outdoor activities",
    "listening to music and playing guitar",
    "painting and photography"
  ];
  const expectationsList = [
    "a kind, understanding, and ambitious partner to share life's journey with.",
    "someone who is family-oriented, has a good sense of humor, and enjoys simple pleasures.",
    "an educated and well-settled professional who values honesty and mutual respect.",
    "a compatible companion who is adventurous, open-minded, and supportive.",
    "a loving and caring individual to build a beautiful future together.",
    "a partner who appreciates art, culture, and intellectual conversations."
  ];


  return sampleNames.map((nameObj, index) => {
    const age = 25 + Math.floor(Math.random() * 10);
    const id = `sample-${Date.now()}-${index}`;
    return {
      id,
      fullName: nameObj.name,
      age: age,
      gender: nameObj.gender,
      religion: getRandomItem(RELIGION_OPTIONS),
      motherTongue: getRandomItem(["Hindi", "English", "Tamil", "Telugu", "Marathi", "Odia"]), // Added Odia
      city: getRandomItem(cities),
      country: getRandomItem(countries),
      education: getRandomItem(educations),
      occupation: getRandomItem(occupations),
      annualIncome: `${5 + Math.floor(Math.random() * 25)} LPA`,
      maritalStatus: getRandomItem(MARITAL_STATUS_OPTIONS).value as MaritalStatus,
      height: `5 ft ${Math.floor(Math.random() * 10) + 2} in`,
      diet: getRandomItem(DIET_OPTIONS).value as Diet,
      aboutMe: `I am a ${age}-year-old ${nameObj.gender.toLowerCase()} based in ${cities[index % cities.length]}. I am passionate about my career as a ${occupations[index % occupations.length]} and enjoy ${hobbiesList[index % hobbiesList.length]}. Looking for ${expectationsList[index % expectationsList.length]}`,
      hobbies: hobbiesList[index % hobbiesList.length].split(" and ")[0],
      partnerExpectations: expectationsList[index % expectationsList.length].substring(0, 50) + "...",
      profilePictureUrl: `https://picsum.photos/seed/${id}/400/400`,
      createdAt: Date.now() - (index * 1000 * 60 * 60 * 24), // Stagger creation times
    };
  });
};


const initializeProfiles = (): UserProfile[] => {
  const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
  if (storedProfiles) {
    try {
      const parsedProfiles = JSON.parse(storedProfiles);
      // Basic validation if parsedProfiles is an array
      if(Array.isArray(parsedProfiles)) return parsedProfiles;
    } catch (e) {
        console.error("Error parsing stored profiles, re-initializing.", e);
    }
  }
  const samples = generateSampleProfiles();
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(samples));
  return samples;
};


export const getProfiles = (): Promise<UserProfile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate API delay
      const profiles = initializeProfiles();
      resolve(profiles.sort((a, b) => b.createdAt - a.createdAt));
    }, 500);
  });
};

export const getProfileById = (id: string): Promise<UserProfile | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const profiles = initializeProfiles();
      resolve(profiles.find(p => p.id === id));
    }, 300);
  });
};

export const addProfile = (profileData: ProfileFormData): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!profileData.fullName || !profileData.age) {
        reject(new Error("Full name and age are required."));
        return;
      }
      const profiles = initializeProfiles();
      const newProfile: UserProfile = {
        ...profileData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        profilePictureUrl: profileData.profilePictureUrl || DEFAULT_PROFILE_IMAGE,
      };
      const updatedProfiles = [newProfile, ...profiles];
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
      resolve(newProfile);
    }, 700);
  });
};

// Update function could be added here if needed
// export const updateProfile = (id: string, updates: Partial<ProfileFormData>): Promise<UserProfile> => { ... }