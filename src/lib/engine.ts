import { 
  IndividualProfile, 
  SyntheticCoupleProfile, 
  CompatibilityResult, 
  EducationLevel, 
  EmploymentStatus, 
  IncomeCategory 
} from '../types';

// Weights from Table 17 (Gradient Boosting Importance)
const WEIGHTS = {
  autonomy: 0.190,
  clanApproval: 0.178,
  parentalInfluence: 0.164,
  ageAtMarriage: 0.139,
  income: 0.095,
  education: 0.079,
  employment: 0.062,
  age: 0.046,
  clanType: 0.030,
  gender: 0.020,
};

export function createSyntheticProfile(a: IndividualProfile, b: IndividualProfile): SyntheticCoupleProfile {
  return {
    avgAge: (a.age + b.age) / 2,
    minAgeAtMarriage: Math.min(a.ageAtMarriage, b.ageAtMarriage),
    minEducation: Math.min(a.education, b.education),
    maxEmploymentVulnerability: Math.max(a.employment, b.employment) as EmploymentStatus,
    maxIncomeCapacity: Math.max(a.income, b.income) as IncomeCategory,
    sameClan: a.clanName.toLowerCase() === b.clanName.toLowerCase() ? 1 : 0,
    minAutonomy: Math.min(a.autonomy, b.autonomy),
    maxParentalInfluence: Math.max(a.parentalInfluence, b.parentalInfluence),
    maxClanApproval: Math.max(a.clanApproval, b.clanApproval),
    genderMix: a.gender !== b.gender ? 1 : 0,
  };
}

export function calculateCompatibility(profile: SyntheticCoupleProfile, a: IndividualProfile, b: IndividualProfile): CompatibilityResult {
  let score = 0;

  // 1. Autonomy (Higher is better for stability)
  // Scale 1-5 to 0-1
  const autonomyScore = (profile.minAutonomy - 1) / 4;
  score += autonomyScore * WEIGHTS.autonomy;

  // 2. Clan Approval (Lower requirement is better for stability in this model)
  // Thesis: "high approval requirements may indicate marriages contracted for clan interests rather than couple compatibility"
  const clanApprovalScore = 1 - ((profile.maxClanApproval - 1) / 4);
  score += clanApprovalScore * WEIGHTS.clanApproval;

  // 3. Parental Influence (Lower is better for stability)
  const parentalInfluenceScore = 1 - ((profile.maxParentalInfluence - 1) / 4);
  score += parentalInfluenceScore * WEIGHTS.parentalInfluence;

  // 4. Age at Marriage (Older is better)
  // Normalize: 18-40 range
  const ageAtMarriageScore = Math.min(Math.max((profile.minAgeAtMarriage - 18) / 12, 0), 1);
  score += ageAtMarriageScore * WEIGHTS.ageAtMarriage;

  // 5. Income (Higher is better)
  const incomeScore = profile.maxIncomeCapacity / 2;
  score += incomeScore * WEIGHTS.income;

  // 6. Education (Higher is better)
  const educationScore = profile.minEducation / 5;
  score += educationScore * WEIGHTS.education;

  // 7. Employment (Employed is better)
  // 0: Employed, 1: Self, 2: Unemployed -> Map to 1, 0.5, 0
  const employmentScore = profile.maxEmploymentVulnerability === 0 ? 1 : (profile.maxEmploymentVulnerability === 1 ? 0.5 : 0);
  score += employmentScore * WEIGHTS.employment;

  // 8. Age (Older couples slightly more stable)
  const ageScore = Math.min(profile.avgAge / 50, 1);
  score += ageScore * WEIGHTS.age;

  // 9. Clan Type (Same clan slightly better)
  score += profile.sameClan * WEIGHTS.clanType;

  // 10. Gender Mix (Different genders expected in this context)
  score += profile.genderMix * WEIGHTS.gender;

  // Final score normalized to 0-100
  const finalScore = Math.round(score * 100);

  // Determine Category
  let category: CompatibilityResult['category'] = 'Low';
  let interpretation = '';
  if (finalScore >= 85) {
    category = 'Very High';
    interpretation = 'Strong alignment on most key factors.';
  } else if (finalScore >= 70) {
    category = 'Good';
    interpretation = 'Good alignment; few concerns identified.';
  } else if (finalScore >= 50) {
    category = 'Moderate';
    interpretation = 'Mixed indicators; some risk factors present.';
  } else {
    category = 'Low';
    interpretation = 'Multiple risk factors; high predicted risk.';
  }

  // Identify Strengths and Concerns
  const strengths: string[] = [];
  const concerns: string[] = [];

  if (profile.sameClan) strengths.push('Same clan membership');
  else concerns.push('Different clans (may require more navigation)');

  if (profile.minAutonomy >= 4) strengths.push('High autonomy in spouse selection');
  if (profile.maxClanApproval >= 4) concerns.push('High clan approval requirement');
  if (profile.maxParentalInfluence >= 4) concerns.push('High parental influence');

  if (Math.abs(a.age - b.age) < 5) strengths.push('Small age gap (< 5 years)');
  if (Math.abs(a.age - b.age) > 10) concerns.push('Large age gap (> 10 years)');

  if (profile.minAgeAtMarriage >= 25) strengths.push('Mature age at marriage');
  if (profile.minAgeAtMarriage < 20) concerns.push('Young age at marriage (potential vulnerability)');

  if (profile.minEducation >= EducationLevel.University) strengths.push('High educational alignment');
  if (Math.abs(a.education - b.education) >= 2) concerns.push('Significant education gap');

  if (a.employment === EmploymentStatus.Employed && b.employment === EmploymentStatus.Employed) {
    strengths.push('Both partners formally employed');
  }
  if (profile.maxEmploymentVulnerability === EmploymentStatus.Unemployed) {
    concerns.push('Economic vulnerability (unemployment reported)');
  }

  return {
    score: finalScore,
    category,
    interpretation,
    strengths,
    concerns
  };
}
