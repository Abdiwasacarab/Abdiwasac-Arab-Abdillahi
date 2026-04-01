export enum EducationLevel {
  NoFormal = 0,
  Primary = 1,
  Secondary = 2,
  Diploma = 3,
  University = 4,
  Postgraduate = 5
}

export enum EmploymentStatus {
  Employed = 0,
  SelfEmployed = 1,
  Unemployed = 2
}

export enum IncomeCategory {
  Low = 0,
  Middle = 1,
  High = 2
}

export interface IndividualProfile {
  name: string;
  gender: 0 | 1; // 0: Male, 1: Female
  age: number;
  ageAtMarriage: number;
  education: EducationLevel;
  employment: EmploymentStatus;
  income: IncomeCategory;
  clanName: string;
  autonomy: number; // 1-5
  parentalInfluence: number; // 1-5
  clanApproval: number; // 1-5
}

export interface SyntheticCoupleProfile {
  avgAge: number;
  minAgeAtMarriage: number;
  minEducation: EducationLevel;
  maxEmploymentVulnerability: EmploymentStatus;
  maxIncomeCapacity: IncomeCategory;
  sameClan: 0 | 1;
  minAutonomy: number;
  maxParentalInfluence: number;
  maxClanApproval: number;
  genderMix: 0 | 1; // Simplified for the model
}

export interface CompatibilityResult {
  score: number;
  category: 'Very High' | 'Good' | 'Moderate' | 'Low';
  interpretation: string;
  strengths: string[];
  concerns: string[];
}
