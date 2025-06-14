
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum MaritalStatus {
  NEVER_MARRIED = 'Never Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  AWAITING_DIVORCE = 'Awaiting Divorce',
}

export enum Diet {
  VEGETARIAN = 'Vegetarian',
  NON_VEGETARIAN = 'Non-Vegetarian',
  EGGETARIAN = 'Eggetarian',
  VEGAN = 'Vegan',
  JAIN = 'Jain',
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  religion: string;
  motherTongue: string;
  city: string;
  country: string;
  education: string;
  occupation: string;
  annualIncome?: string;
  maritalStatus: MaritalStatus;
  height: string;
  diet: Diet;
  aboutMe: string;
  hobbies: string;
  partnerExpectations: string;
  profilePictureUrl?: string; // Base64 string
  createdAt: number;
}

export type ProfileFormData = Omit<UserProfile, 'id' | 'createdAt'>;

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // Other types of grounding chunks can be added here if needed
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // Potentially other grounding metadata fields
}
